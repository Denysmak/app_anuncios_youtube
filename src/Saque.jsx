import styles from './Saque.module.css'
import Banco from './Banco'
import paypal from './assets/paypal.jpeg'
import monzo from './assets/monzo.jpeg'
import payoneer from './assets/payoneer.jpeg'
import ebanx from './assets/ebanx.jpeg'
function Saque() {
  const saldoSalvo = localStorage.getItem('saldoAtual');
    return <div className={styles.pai}>
      <div className={styles.container}>
        <h3>Su saldo</h3>
        <h1 className={styles.saldo}>R$ {saldoSalvo}</h1>
        <p>Investigaciones completadas: 0/8. Completa 8 más para poder retirar.</p>
      </div>
      <div className={`${styles.container} ${styles.bancos}`}>
        <Banco src={paypal}/>
        <Banco src={payoneer}/>
        <Banco src={ebanx}/>
        <Banco src={monzo}/>
       
      </div>
    </div>;
  }
  
  export default Saque;