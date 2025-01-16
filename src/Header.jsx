import styles from './Header.module.css'
import YoutubeLogo from './YoutubeLogo';
import user from './assets/user.svg'
import sack from './assets/sack-dolar.svg'
import pessoas from './assets/userGroup.svg'


function Header({email}) {
  return (
    <div className={styles.containerForm}>
      <div className={styles.logoValor}>
        <YoutubeLogo tamanhoImagem={'70px'} tamanhoSpan={'1.5rem'} tamanhoLetra={'1.3rem'} marginDireita={'-28px'}/>  
        <div className={styles.containerValor}>
          <p>R$100.00</p>
        </div>
        </div>
        <div className={styles.informacoes}>
          <div className={styles.userContainer}>
          <img src={user}/>
          <p>{email}</p>
          </div>
          <div className={styles.pagoHoje}>
            <img src={sack} alt="" />
            <p>R$ 100.000</p>
          </div>
          <div className={styles.pessoas}>
            <img src={pessoas} alt="" />
            <p>852</p>
          </div>


      </div>
      
      
    </div>
  );
}

export default Header;
