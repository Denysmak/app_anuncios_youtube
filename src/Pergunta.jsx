import { useState } from 'react';
import styles from './Pergunta.module.css';

function Pergunta({ pergunta, texto }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive); // Alterna o estado entre true e false
  };

  return (
    <div className={styles.container}>
      <h4 onClick={handleClick}>{pergunta}?</h4>
      <p className={isActive ? styles.active : ''}>{texto}</p>
    </div>
  );
}

export default Pergunta;
