import styles from './Pergunta.module.css';

function Pergunta({ pergunta, texto, isActive, onClick }) {
  return (
    <div className={styles.container}>
      <h4 onClick={onClick}>{pergunta}?</h4>
      <p className={isActive ? styles.active : styles.inactive}>{texto}</p>
    </div>
  );
}

export default Pergunta;
