import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ChallengeLandingPage from './ChallengeLandingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChallengeLandingPage />
  </StrictMode>,
)

