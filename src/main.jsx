import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import './index.css'
import AuthContextProvider from './services/authContext/AuthContextProvider.jsx'
import ThemeContextProvider from './services/themeContext/ThemeContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
