import styles from './Numero.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Numero({ icone, texto, valor, corIcone, corBackground }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.containerImg}
        style={{ backgroundColor: corBackground }} // Cor de fundo dinâmica
      >
        <FontAwesomeIcon
          icon={icone}
          className={styles.icone}
          style={{ color: corIcone }} // Cor do ícone dinâmica
        />
      </div>
      <div className={styles.containerTexto}>
        <p>{texto}</p>
        <h4>{valor}</h4>
      </div>
    </div>
  );
}

export default Numero;