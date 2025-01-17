import { useState } from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index, page) => {
    setActiveIndex(index);
    onNavigate(page); // Notifica o componente pai sobre a página selecionada
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => handleClick(0, 'Page1')}
        className={activeIndex === 0 ? styles.active : styles.inactive}
      >
        <FontAwesomeIcon icon={faMoneyBill} className={styles.icone} />
        <p>Retiro</p>
      </div>
      <div
        onClick={() => handleClick(1, 'Page2')}
        className={activeIndex === 1 ? styles.active : styles.inactive}
      >
        <FontAwesomeIcon icon={faHouse} className={styles.icone} />
        <p>Inicio</p>
      </div>
      <div
        onClick={() => handleClick(2, 'Page3')}
        className={activeIndex === 2 ? styles.active : styles.inactive}
      >
        <FontAwesomeIcon icon={faQuestion} className={styles.icone} />
        <p>Ayuda</p>
      </div>
    </div>
  );
}

export default Navbar;
