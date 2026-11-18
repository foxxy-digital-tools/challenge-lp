import React, { useState } from 'react';
import { X, TrendingUp, Target, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CHALLENGE_CONFIG } from '../config';
import { cn } from '../lib/utils';

export type GoalType = 'audience' | 'clients' | '';

interface FormState {
  name: string;
  whatsapp: string;
  instagram: string;
  goal: GoalType;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    whatsapp: '',
    instagram: '',
    goal: 'audience'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 300);
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
        <div className="p-5 sm:p-6 border-b border-[#E5E4DE] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4F636] text-[#09090B] flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              CR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-bold text-[#EA580C] uppercase tracking-wider">
                  {CHALLENGE_CONFIG.cohortLabel}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#D4F636] text-[#09090B] font-bold">
                  {CHALLENGE_CONFIG.priceINR}
                </span>
              </div>
              <h3 className="font-extrabold text-[16px] text-[#09090B] tracking-tight">
                Reserve Your Challenge Seat
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#09090B] hover:bg-white border border-transparent hover:border-[#E5E4DE] transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1.5">
                  Your Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase">
                    WhatsApp Number (For Cohort Access)
                  </label>
                  <span className="font-mono text-[9px] text-[#059669] font-semibold">DAILY MISSIONS SENT HERE</span>
                </div>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.whatsapp}
                  onChange={e => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA]"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1.5">
                  Instagram Handle (For Account Audit)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] text-[14px] font-mono">@</span>
                  <input
                    required
                    type="text"
                    placeholder="yourhandle"
                    value={form.instagram}
                    onChange={e => setForm({ ...form, instagram: e.target.value })}
                    className="w-full pl-8 pr-3.5 py-2.5 text-[14px] text-[#09090B] border border-[#E5E4DE] rounded-xl bg-white outline-none focus:border-[#09090B] focus:ring-2 focus:ring-[#09090B]/10 transition-all placeholder:text-[#A1A1AA]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#52525B] font-bold tracking-[0.05em] uppercase mb-1.5">
                  Select Your Primary Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, goal: 'audience' })}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all cursor-pointer',
                      form.goal === 'audience'
                        ? 'border-[#09090B] bg-[#09090B] text-white shadow-xs'
                        : 'border-[#E5E4DE] bg-[#FAF9F6] text-[#52525B] hover:border-[#09090B]/30'
                    )}
                  >
                    <div className="font-bold text-[12px] flex items-center gap-1.5">
                      <TrendingUp size={13} className={form.goal === 'audience' ? 'text-[#D4F636]' : 'text-[#71717A]'} />
                      Audience Growth
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-tight">
                      Reach, followers & views
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, goal: 'clients' })}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all cursor-pointer',
                      form.goal === 'clients'
                        ? 'border-[#09090B] bg-[#09090B] text-white shadow-xs'
                        : 'border-[#E5E4DE] bg-[#FAF9F6] text-[#52525B] hover:border-[#09090B]/30'
                    )}
                  >
                    <div className="font-bold text-[12px] flex items-center gap-1.5">
                      <Target size={13} className={form.goal === 'clients' ? 'text-[#D4F636]' : 'text-[#71717A]'} />
                      Client Inquiries
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-tight">
                      DMs, leads & clients
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-tactile w-full py-3.5 text-[14px] font-bold flex items-center justify-center gap-2 group shadow-card cursor-pointer"
                >
                  <span>Confirm & Join Cohort 01 — {CHALLENGE_CONFIG.priceINR}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D4F636]" />
                </button>
                <div className="flex items-center justify-center gap-2 pt-2.5 font-mono text-[9.5px] text-[#71717A]">
                  <span className="flex items-center gap-1 font-semibold text-[#065F46]">
                    <ShieldCheck size={12} className="text-[#059669]" />
                    <span>256-Bit SSL Encrypted</span>
                  </span>
                  <span>•</span>
                  <span>Zero Spam</span>
                  <span>•</span>
                  <span>Instant Onboarding</span>
                </div>
                <p className="text-center font-mono text-[9px] text-[#A1A1AA] mt-1.5">
                  Instant WhatsApp invitation link sent upon verification • {CHALLENGE_CONFIG.gstLabel}
                </p>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-[#059669]" />
              </div>
              <h3 className="text-[20px] font-black tracking-tight text-[#09090B] mb-2">
                Seat Reserved, {form.name.split(' ')[0]}!
              </h3>
              <p className="text-[13px] text-[#52525B] leading-[1.65] mb-5 max-w-[380px] mx-auto">
                Welcome to Cohort 01. We've recorded your Instagram handle (@{form.instagram}) for the baseline diagnostic. Check your WhatsApp ({form.whatsapp}) for your onboarding pass.
              </p>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E4DE] inline-block font-mono text-[10px] text-[#09090B] font-bold">
                PASS ID: CR-ACADEMY-C01-8492 • 21-DAY ACCESS GRANTED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
