import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaPrincipal from './TelaPrincipal.jsx';
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/telaPrincipal" element={<TelaPrincipal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
