import styles from './Saque.module.css'
import Banco from './Banco'
import paypal from './assets/paypal.jpeg'
import monzo from './assets/monzo.jpeg'
import payoneer from './assets/payoneer.jpeg'
import ebanx from './assets/ebanx.jpeg'
function Saque() {
    return <div className={styles.pai}>
      <div className={styles.container}>
        <h3>Seu Saldo</h3>
        <h1 className={styles.saldo}>R$ 100.00</h1>
        <p>Pesquisas completadas: 0/8 Complete mais 8 pesquisas para poder sacar</p>
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