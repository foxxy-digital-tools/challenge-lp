import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Target, ArrowRight, ShieldCheck, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { CHALLENGE_CONFIG } from '../config';
import { cn } from '../lib/utils';
import { trackMetaEvent, cacheUserData, generateEventId, getExternalId, getFbpValue, getFbcValue, normalizePhone, normalizeEmail } from '../lib/metaPixel';
import { loadRazorpayScript, type RazorpayOptions } from '../lib/razorpay';
import { api } from '../lib/api';

export type GoalType = 'audience' | 'clients' | '';

interface FormState {
  name: string;
  whatsapp: string;
  email: string;
  instagram: string;
  goal: GoalType;
}

interface PaymentSuccessData {
  paymentId: string;
  orderId: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    whatsapp: '',
    email: '',
    instagram: '',
    goal: 'audience',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<PaymentSuccessData | null>(null);

  // 📊 Fire InitiateCheckout on modal open (Browser Pixel)
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      const icEventId = generateEventId('ic');
      trackMetaEvent(
        'InitiateCheckout',
        {
          content_name: '21-Day Instagram Pattern & Growth Challenge — Cohort 01',
          content_type: 'product',
          value: 999,
          currency: 'INR',
        },
        {},
        icEventId,
        { skipServerCapi: true }
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const extId = getExternalId();
    const cleanPhone = normalizePhone(form.whatsapp);
    const buyerEmail = form.email ? normalizeEmail(form.email) : `${cleanPhone}@challenge.coachravikant.com`;

    // Cache customer identity in 1st-party cookies & localStorage
    cacheUserData({
      name: form.name,
      phone: form.whatsapp,
      email: buyerEmail,
      external_id: extId,
    });

    // 1. 📊 Fire Lead (Browser Pixel + Server CAPI) with Deduplication
    const leadEventId = generateEventId('lead');
    trackMetaEvent(
      'Lead',
      {
        content_name: '21-Day Instagram Pattern & Growth Challenge — Cohort 01',
        content_category: 'Challenge Cohort',
        content_type: 'product',
        value: 999,
        currency: 'INR',
        goal: form.goal,
        instagram: form.instagram,
      },
      {
        name: form.name,
        phone: form.whatsapp,
        email: buyerEmail,
        external_id: extId,
      },
      leadEventId
    );

    // 2. Load Razorpay Checkout SDK
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setErrorMessage('Unable to load Razorpay payment gateway. Please check your internet connection.');
      setIsSubmitting(false);
      return;
    }

    // 3. Request Server-Signed Order from Dedicated Challenge Controller
    try {
      const orderResponse = await api.post<{
        status: string;
        order_id: string;
        amount: number;
        currency: string;
        key_id: string;
        booking_id: number;
        message?: string;
      }>('/api/challenge/razorpay/create-order', {
        name: form.name,
        phone: form.whatsapp,
        email: buyerEmail,
        instagram: form.instagram,
        goal: form.goal,
        cohort: 'Cohort 01',
        fbp: getFbpValue(),
        fbc: getFbcValue(),
        external_id: extId,
        meta_event_id: leadEventId,
      });

      if (!orderResponse || orderResponse.status !== 'success') {
        throw new Error(orderResponse?.message || 'Failed to initialize payment order.');
      }

      // 4. Launch Razorpay Checkout Modal
      const options: RazorpayOptions = {
        key: orderResponse.key_id,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Coach Ravikant Academy',
        description: '21-Day Instagram Challenge — Cohort 01 Pass (₹999)',
        order_id: orderResponse.order_id,
        prefill: {
          name: form.name,
          contact: form.whatsapp,
          email: form.email || undefined,
        },
        notes: {
          product: '21-Day Instagram Pattern & Growth Challenge',
          cohort: 'Cohort 01',
          instagram: form.instagram,
        },
        theme: {
          color: '#09090B',
        },
        handler: async (response) => {
          try {
            // 5. Verify payment signature with backend
            const verifyResponse = await api.post<{
              status: string;
              message: string;
              payment_id: string;
              order_id: string;
            }>('/api/challenge/razorpay/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse && verifyResponse.status === 'success') {
              // 6. Trigger Browser Purchase Event (Deduplicated with authoritative Server CAPI)
              trackMetaEvent(
                'Purchase',
                {
                  content_name: '21-Day Instagram Pattern & Growth Challenge — Cohort 01',
                  content_type: 'product',
                  value: 999,
                  currency: 'INR',
                },
                {
                  name: form.name,
                  phone: form.whatsapp,
                  email: buyerEmail,
                  external_id: extId,
                },
                response.razorpay_payment_id,
                { skipServerCapi: true }
              );

              setPaymentSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });
            } else {
              setErrorMessage('Payment signature verification failed. Please contact support.');
            }
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Payment verification failed.';
            setErrorMessage(message);
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      };

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK is not available.');
      }

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (failRes) => {
        const desc = failRes.error?.description || 'Payment was unsuccessful or cancelled.';
        setErrorMessage(desc);
        setIsSubmitting(false);

        // Notify backend of payment failure
        api.post('/api/challenge/razorpay/payment-failed', {
          razorpay_order_id: orderResponse.order_id,
        }).catch(() => {});
      });

      rzp.open();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error creating payment order.';
      setErrorMessage(message);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setErrorMessage(null);
      setPaymentSuccess(null);
      setIsSubmitting(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#09090B]/50 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Centered Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl border border-[#E5E4DE] shadow-modal overflow-hidden my-auto z-10">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#E5E4DE] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              CR
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-[8.5px] sm:text-[9px] font-bold text-[#EA580C] uppercase tracking-wider">
                  {CHALLENGE_CONFIG.cohortLabel}
                </span>
                <span className="font-mono text-[8.5px] sm:text-[9px] px-1.5 py-0.2 rounded bg-[#D4F636] text-[#09090B] font-bold">
                  {CHALLENGE_CONFIG.priceINR}
                </span>
              </div>
              <h3 className="font-extrabold text-[15px] sm:text-[16px] text-[#09090B] tracking-tight">
                {paymentSuccess ? 'Seat Confirmed & Enrolled' : 'Reserve Your Challenge Seat'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#09090B] hover:bg-white border border-transparent hover:border-[#E5E4DE] transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6">
          {!paymentSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block font-mono text-[9.5px] sm:text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1 sm:mb-1.5">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  disabled={isSubmitting}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-[16px] sm:text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA] disabled:opacity-50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                  <label className="font-mono text-[9.5px] sm:text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase">
                    WhatsApp Number
                  </label>
                  <span className="font-mono text-[8.5px] sm:text-[9px] text-[#059669] font-semibold">DAILY MISSIONS SENT HERE</span>
                </div>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-[16px] sm:text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA] disabled:opacity-50"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 sm:mb-1.5">
                  <label className="font-mono text-[9.5px] sm:text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase">
                    Email Address <span className="text-[#A1A1AA] font-normal lowercase">(optional)</span>
                  </label>
                  <span className="font-mono text-[8.5px] sm:text-[9px] text-[#71717A]">FOR TAX INVOICE & RECEIPT</span>
                </div>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  disabled={isSubmitting}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-[16px] sm:text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-mono text-[9.5px] sm:text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1 sm:mb-1.5">
                  Instagram Handle (For Account Audit)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] text-[14px] font-mono">@</span>
                  <input
                    required
                    type="text"
                    placeholder="yourhandle"
                    disabled={isSubmitting}
                    value={form.instagram}
                    onChange={e => setForm({ ...form, instagram: e.target.value })}
                    className="w-full pl-8 pr-3.5 py-2.5 min-h-[44px] text-[16px] sm:text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA] disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9.5px] sm:text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1 sm:mb-1.5">
                  Select Your Primary Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setForm({ ...form, goal: 'audience' })}
                    className={cn(
                      'p-2.5 sm:p-3 min-h-[48px] rounded-xl border text-left transition-all cursor-pointer disabled:opacity-50',
                      form.goal === 'audience'
                        ? 'border-[#09090B] bg-[#09090B] text-white shadow-xs'
                        : 'border-[#E5E4DE] bg-[#FAF9F6] text-[#52525B] hover:border-[#09090B]/30'
                    )}
                  >
                    <div className="font-bold text-[11.5px] sm:text-[12px] flex items-center gap-1.5">
                      <TrendingUp size={13} className={form.goal === 'audience' ? 'text-[#D4F636]' : 'text-[#71717A]'} />
                      Audience Growth
                    </div>
                    <div className="text-[9.5px] sm:text-[10px] opacity-80 mt-0.5 leading-tight">
                      Reach, followers & views
                    </div>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setForm({ ...form, goal: 'clients' })}
                    className={cn(
                      'p-2.5 sm:p-3 min-h-[48px] rounded-xl border text-left transition-all cursor-pointer disabled:opacity-50',
                      form.goal === 'clients'
                        ? 'border-[#09090B] bg-[#09090B] text-white shadow-xs'
                        : 'border-[#E5E4DE] bg-[#FAF9F6] text-[#52525B] hover:border-[#09090B]/30'
                    )}
                  >
                    <div className="font-bold text-[11.5px] sm:text-[12px] flex items-center gap-1.5">
                      <Target size={13} className={form.goal === 'clients' ? 'text-[#D4F636]' : 'text-[#71717A]'} />
                      Client Inquiries
                    </div>
                    <div className="text-[9.5px] sm:text-[10px] opacity-80 mt-0.5 leading-tight">
                      DMs, leads & clients
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-1.5 sm:pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tactile w-full min-h-[48px] py-3.5 text-[14px] font-bold flex items-center justify-center gap-2 group shadow-card cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-[#D4F636]" />
                      <span>Securing Order & Launching Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Pay {CHALLENGE_CONFIG.priceINR}</span>
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D4F636]" />
                    </>
                  )}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2.5 font-mono text-[9px] sm:text-[9.5px] text-[#71717A]">
                  <span className="flex items-center gap-1 font-semibold text-[#065F46]">
                    <ShieldCheck size={12} className="text-[#059669]" />
                    <span>256-Bit SSL Encrypted Razorpay</span>
                  </span>
                  <span>•</span>
                  <span>UPI / Cards / NetBanking</span>
                  <span>•</span>
                  <span>Instant Onboarding</span>
                </div>
                <p className="text-center font-mono text-[8.5px] sm:text-[9px] text-[#A1A1AA] mt-1.5">
                  Instant WhatsApp onboarding pass issued upon payment • {CHALLENGE_CONFIG.gstLabel}
                </p>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-[#059669]" />
              </div>
              <h3 className="text-[20px] font-black tracking-tight text-[#09090B] mb-2">
                Seat Confirmed, {form.name.split(' ')[0]}!
              </h3>
              <p className="text-[13px] text-[#52525B] leading-[1.65] mb-4 max-w-[380px] mx-auto">
                Payment verified. We've enrolled your Instagram handle (<span className="font-semibold text-[#09090B]">@{form.instagram}</span>) for the baseline diagnostic audit. Check your WhatsApp (<span className="font-semibold text-[#09090B]">{form.whatsapp}</span>) for your onboarding pass.
              </p>
              <div className="space-y-1.5 mb-6">
                <div className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E4DE] inline-block font-mono text-[10px] text-[#09090B] font-bold">
                  PAYMENT ID: {paymentSuccess.paymentId}
                </div>
                <div>
                  <span className="font-mono text-[9.5px] text-[#059669] font-bold block">
                    STATUS: PAID • 21-DAY COHORT 01 ACCESS GRANTED
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="btn-tactile px-6 py-2.5 text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
