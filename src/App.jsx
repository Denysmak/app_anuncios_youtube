import { useState } from 'react'
import youtubeLogo from './assets/logoYoutube.png'
import './telaLogin.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container">
     <div className="containerForm">
      <div className="containerLogo">
        <img id='logoYoutube' src={youtubeLogo} alt="logotipo de YouTube" />
        <h2><span className='letrasMaiores'>Y</span>OU<span className='letrasMaiores'>T</span>UBE</h2>
      </div>
      <div className="texto">
      <h2>Bienvenido(a) a YoutubeOpina</h2>
      <p>Ingresa tu correo electrónico para continuar</p>
      </div>
      <form action="">
        <input type="email" name="email" id="email" placeholder='Tu correo electrónico'/>
        <button type="submit">Entrar</button>
      </form>
     </div>
     <div className="containerTermos">
      <p>2024 Youtube LLC</p>
      <p className='segundoParagrafo'>Términos y Política de Privacidad</p>
     </div>
     </div>
    </>
  )
}

export default App
