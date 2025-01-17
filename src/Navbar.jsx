import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onNavigate, defaultPage }) {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Inicializa o índice ativo com base na página padrão
    switch (defaultPage) {
      case 'Saque':
        setActiveIndex(0);
        break;
      case 'Inicio':
        setActiveIndex(1);
        break;
      case 'Ajuda':
        setActiveIndex(2);
        break;
      default:
        setActiveIndex(null);
    }
  }, [defaultPage]);

  const handleClick = (index, page) => {
    setActiveIndex(index);
    onNavigate(page); // Notifica o componente pai sobre a página selecionada
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => handleClick(0, 'Saque')}
        className={activeIndex === 0 ? styles.active : styles.inactive}
      >
        <FontAwesomeIcon icon={faMoneyBill} className={styles.icone} />
        <p>Saque</p>
      </div>
      <div
        onClick={() => handleClick(1, 'Inicio')}
        className={activeIndex === 1 ? styles.active : styles.inactive}
      >
        <FontAwesomeIcon icon={faHouse} className={styles.icone} />
        <p>Inicio</p>
      </div>
      <div
        onClick={() => handleClick(2, 'Ajuda')}
        className={activeIndex === 2 ? styles.active : styles.inactive}
      >
        <FontAwesomeIcon icon={faQuestion} className={styles.icone} />
        <p>Ajuda</p>
      </div>
    </div>
  );
}

export default Navbar;
