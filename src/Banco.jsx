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
      alert('El valor debe ser menor o igual al saldo disponible.');
      return;
    }

     // Simula o envio
    setMostrarFormulario(false); // Fecha o formulário após o envio

    // Exibe a notificação após o envio
    setMostrarNotificacao(true);
        // Faz o scroll para o topo da página
        window.scrollTo({ top: 0, behavior: "smooth" });
  
        document.body.style.overflow = "hidden";
    
        // Reativar scroll após 5 segundos
        setTimeout(() => {
          document.body.style.overflow = "auto";
        }, 3000);
    // Remove a notificação automaticamente após 3 segundos
    setTimeout(() => {
      setMostrarNotificacao(false);
    }, 3000);
  };
  document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");

    emailInput.addEventListener("invalid", function (event) {
        event.preventDefault(); // Impede a mensagem padrão do navegador
        emailInput.setCustomValidity("Por favor, ingrese un correo electrónico válido.");
    });

    emailInput.addEventListener("input", function () {
      
        emailInput.setCustomValidity(""); // Limpa a mensagem personalizada ao corrigir o erro
    });
});
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
          <h2>Error al realizar el retiro</h2>
          <br/>
          <p><strong>Valor mínimo para retiro: US$3000</strong></p>
          <br/>
          <p>
            Por qué necesitas alcanzar la meta de US$3000? Porque muchas personas malintencionadas entran en la aplicación, retiran su saldo inicial y nunca vuelven a usar la aplicación, o utilizan programas para obtener ventajas y ganar dinero.
          </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banco;
