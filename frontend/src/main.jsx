import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 🔥 ESTO ARREGLA LOS DESPLEGABLES

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)