import React, { useState } from 'react';
import styles from './Banco.module.css';
import SaqueNotification from './SaqueNotification';

function Banco({ src, alt }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleBancoClick = () => {
    setMostrarFormulario(!mostrarFormulario); // Alterna o estado para mostrar/esconder o formulário
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado!'); // Simula o envio
    setMostrarFormulario(false); // Fecha o formulário após o envio
  };

  return (
    <div className={styles.classePai} onClick={handleBancoClick}>
      <div className={styles.containerImagem}>
        <img className={styles.logo} src={src} alt={alt} />
      </div>
      {mostrarFormulario && (
        <div className={styles.containerFormulario}><div className={styles.formulario}>
          <form className={styles.form} onClick={(e) => e.stopPropagation()} onSubmit={handleFormSubmit}>
            <h3>¿Cuál es tu correo electrónico?</h3>
            <input type="email" name="email" id="email" placeholder="Ingrese su email" required />
            <button type="submit">Enviar</button>
          </form>
        </div></div>
      )}
    </div>
  );
}

export default Banco;
