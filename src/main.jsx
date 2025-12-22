import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google' // 1. Add this import
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap your App with the Provider and paste your Client ID below */}
<GoogleOAuthProvider clientId="610018784372-7u1a4j6d4qovau1mo0o228idin0o3bkb.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)