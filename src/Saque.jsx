import styles from './Saque.module.css';
import Banco from './Banco';
import paypal from './assets/paypal.jpeg';
import monzo from './assets/monzo.jpeg';
import payoneer from './assets/payoneer.jpeg';
import ebanx from './assets/ebanx.jpeg';
import React, { useState, useEffect } from 'react';

function Saque({ email }) {
  if (!email) {
    throw new Error('Email is required to use this component.');
  }

  // Função para gerar uma chave única no localStorage baseada no email
  const getStorageKey = (key) => `${email}_${key}`;

  // Estado para o saldo e inicialização
  const [saldo, setSaldo] = useState(0);
  const [ativo, setAtivo] = useState(null); // Estado para rastrear o banco ativo
  const [valor, setValor] = useState(''); // Estado para o valor inserido no formulário

  // Carregar saldo inicial do localStorage baseado no email
  useEffect(() => {
    const saldoSalvo = parseFloat(localStorage.getItem(getStorageKey('saldoAtual'))) || 0;
    setSaldo(saldoSalvo);
  }, [email]);

  const handleBancoClick = (id) => {
    setAtivo(id); // Define o banco clicado como ativo
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const valorNumerico = parseFloat(valor);

    // Validar o valor antes de prosseguir
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert('Por favor, insira um valor válido.');
      return;
    }

    if (valorNumerico > saldo) {
      alert('Saldo insuficiente.');
      return;
    }

    // Subtrair o valor do saldo atual e atualizar no estado e no localStorage
    const novoSaldo = saldo - valorNumerico;
    setSaldo(novoSaldo); // Atualiza o estado React
    localStorage.setItem(getStorageKey('saldoAtual'), novoSaldo); // Atualiza o localStorage

    alert('Saque realizado com sucesso!');

    setAtivo(null); // Fecha o formulário após enviar
    setValor(''); // Limpa o campo de valor
  };

  return (
    <div className={styles.pai}>
      <div className={styles.container}>
        <h3>Seu saldo</h3>
        <h1 className={styles.saldo}>R$ {saldo.toFixed(2)}</h1> {/* Sempre reflete o estado atualizado */}
      </div>
      <div className={`${styles.container} ${styles.bancos}`}>
        <Banco src={paypal} onClick={() => handleBancoClick('paypal')} saldo={saldo} email={email}/>
        <Banco src={payoneer} onClick={() => handleBancoClick('payoneer')} saldo={saldo} email={email}/>
        <Banco src={ebanx} onClick={() => handleBancoClick('ebanx')} saldo={saldo} email={email}/>
        <Banco src={monzo} onClick={() => handleBancoClick('monzo')} saldo={saldo} email={email}/>
      </div>
      {ativo && (
        <div className={styles.containerNotification}>
          <form onSubmit={handleFormSubmit}>
            <h3>¿Cuál es tu correo electrónico?</h3>
            <input type="email" value={email} readOnly />
            <h3>Valor</h3>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Saque;
