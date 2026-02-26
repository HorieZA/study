import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@stlyes/index.css'
import App from './pages/App.jsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <App />
    </CookiesProvider>
  </StrictMode>,
)