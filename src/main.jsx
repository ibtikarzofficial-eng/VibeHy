import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress known third-party warnings from Three.js that do not affect functionality
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('THREE.Clock')) return;
    if (args[0].includes('THREE.WebGLProgram')) return;
    if (args[0].includes('warning X4122')) return;
    if (args[0].includes('double precision')) return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
