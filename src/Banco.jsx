import React, { useState } from 'react';
import styles from './Banco.module.css';

function Banco({ src, alt, saldo }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const [valor, setValor] = useState(''); // Estado para armazenar o valor do input



  const valorsaldo = localStorage.getItem("saldoAtual");



  const handleBancoClick = () => {
    setMostrarFormulario(!mostrarFormulario); // Alterna o estado para mostrar/esconder o formulário
  };

  const handleValorChange = (e) => {
    setValor(e.target.value); // Atualiza o estado com o valor do input
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validação: o valor deve ser menor que o saldo
    if (Number(valor) > saldo) {
      alert('O valor deve ser menor ou igual ao saldo disponível.');
      return;
    }

    alert('Formulário enviado!'); // Simula o envio
    setMostrarFormulario(false); // Fecha o formulário após o envio

    // Exibe a notificação após o envio
    setMostrarNotificacao(true);

    // Remove a notificação automaticamente após 3 segundos
    setTimeout(() => {
      setMostrarNotificacao(false);
    }, 3000);
  };

  return (
    <div className={styles.classePai} onClick={handleBancoClick}>
      <div className={styles.containerImagem}>
        <img className={styles.logo} src={src} alt={alt} />
      </div>
      {mostrarFormulario && (
        <div className={styles.containerFormulario}>
          <div className={styles.formulario}>
            <form
              className={styles.form}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleFormSubmit}
            >
              <h3>¿Cuál es tu correo electrónico?</h3>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese su email"
                required
              />
              <h3>Valor</h3>
              
              <input
                type="number"
                value={valor}
                onChange={handleValorChange}
                placeholder={`Máximo: ${saldo}`}
                required
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
      {mostrarNotificacao && (
        <div className={styles.notificacao}>
          <div className={styles.containerTexto}>
          <h2>¡Gracias por comprar!</h2>
          <p>¡Le agradecemos su confianza y lo felicitamos por tomar la decisión correcta! ¡Ahora solo espera y en un momento te enviaremos un correo electrónico con toda tu información de acceso!
          </p></div>
        </div>
      )}
    </div>
  );
}

export default Banco;
