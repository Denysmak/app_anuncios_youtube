import styles from './Saque.module.css';
import Banco from './Banco';
import paypal from './assets/paypal.jpeg';
import monzo from './assets/monzo.jpeg';
import payoneer from './assets/payoneer.jpeg';
import ebanx from './assets/ebanx.jpeg';
import React, { useState } from 'react';

function Saque({ email }) {
  if (!email) {
    throw new Error('Email is required to use this component.');
  }

  // Função para gerar uma chave única no localStorage baseada no email
  const getStorageKey = (key) => `${email}_${key}`;

  // Obtendo o saldo salvo baseado no email
  const saldoSalvo = localStorage.getItem(getStorageKey('saldoAtual')) || 0;
  const [ativo, setAtivo] = useState(null); // Estado para rastrear o banco ativo

  const handleBancoClick = (id) => {
    setAtivo(id); // Define o banco clicado como ativo
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado!');
    setAtivo(null); // Fecha o formulário após enviar
  };

  return (
    <div className={styles.pai}>
      <div className={styles.container}>
        <h3>Su saldo</h3>
        <h1 className={styles.saldo}>R$ {parseFloat(saldoSalvo).toFixed(2)}</h1>
      </div>
      <div className={`${styles.container} ${styles.bancos}`}>
        <Banco src={paypal} onClick={() => handleBancoClick('paypal')} />
        <Banco src={payoneer} onClick={() => handleBancoClick('payoneer')} />
        <Banco src={ebanx} onClick={() => handleBancoClick('ebanx')} />
        <Banco src={monzo} onClick={() => handleBancoClick('monzo')} />
      </div>
      {ativo && (
        <div className={styles.containerNotification}>
          <form onSubmit={handleFormSubmit}>
            <h3>¿Cuál es tu correo electrónico?</h3>
            <input type="email" name="email" id="email" required />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Saque;
