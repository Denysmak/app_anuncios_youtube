import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import youtubeLogo from './assets/logoYoutube.png'
import './TelaLogin.css';
import YoutubeLogo from './YoutubeLogo';


function TelaLogin() {
  const [email, setEmail] = useState('');//estado para armazenar o email do usuário
  const navigate = useNavigate();//função para redirecionar o usuário

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    if (email){
      localStorage.setItem('userEmail', email); //salva o e-mail no localstorage
      navigate('/telaPrincipal'); //Redireciona para outo componente
    } else {
      alert('Por favor, insira um e-mail válido.');
    }


  };



  return (
    <>
    <div className="container">
     <div className="containerForm">
      <YoutubeLogo/>
      <div className="texto">
      <h2>Bienvenido(a) a YoutubeOpina</h2>
      <p>Ingresa tu correo electrónico para continuar</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" placeholder='Tu correo electrónico' value={email} onChange={(e) => setEmail(e.target.value)}/>
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

export default TelaLogin
