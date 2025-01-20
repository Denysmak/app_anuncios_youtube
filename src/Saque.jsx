import styles from './Saque.module.css';
import Banco from './Banco';
import paypal from './assets/paypal.jpeg';
import monzo from './assets/monzo.jpeg';
import payoneer from './assets/payoneer.jpeg';
import ebanx from './assets/ebanx.jpeg';

function Saque({ email }) {
  if (!email) {
    throw new Error('Email is required to use this component.');
  }

  // Função para gerar uma chave única no localStorage baseada no email
  const getStorageKey = (key) => `${email}_${key}`;

  // Obtendo o saldo salvo baseado no email
  const saldoSalvo = localStorage.getItem(getStorageKey('saldoAtual')) || 0;

  return (
    <div className={styles.pai}>
      <div className={styles.container}>
        <h3>Su saldo</h3>
        <h1 className={styles.saldo}>R$ {parseFloat(saldoSalvo).toFixed(2)}</h1>
        <p>Investigaciones completadas: 0/8. Completa 8 más para poder retirar.</p>
      </div>
      <div className={`${styles.container} ${styles.bancos}`}>
        <Banco src={paypal} />
        <Banco src={payoneer} />
        <Banco src={ebanx} />
        <Banco src={monzo} />
      </div>
    </div>
  );
}

export default Saque;
