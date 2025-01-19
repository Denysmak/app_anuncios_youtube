import styles from './Banco.module.css'
function Banco({src, alt}) {
    return <div className={styles.classePai}>
     <div className={styles.containerImagem}>
        <img className={styles.logo} src={src} alt={alt} />
     </div>
    </div>;
  }
  
  export default Banco;