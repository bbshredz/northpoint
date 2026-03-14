import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply northpoint theme before first paint
;(function () {
  const t = localStorage.getItem('np-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
