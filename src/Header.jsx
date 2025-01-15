import styles from './Header.module.css'
import YoutubeLogo from './YoutubeLogo';
import user from './assets/user.svg'

function Header({email}) {
  return (
    <div className={styles.containerForm}>
      <div className={styles.logoValor}>
        <YoutubeLogo tamanhoImagem={'70px'} tamanhoSpan={'1.5rem'} tamanhoLetra={'1.3rem'} marginDireita={'-28px'}/>  
        <div className={styles.containerValor}>
          <p>R$100.00</p>
        </div>
        </div>
        
        <div className={styles.userContainer}>
        <img src={user}/>
        <p>{email}</p>
      </div>
      
      
    </div>
  );
}

export default Header;
