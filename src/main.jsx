import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TelaLogin from './TelaLogin.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaPrincipal from './TelaPrincipal.jsx';
import './index.css'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/appyt'>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/telaPrincipal" element={<TelaPrincipal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
