import { Link } from 'react-router-dom';
import styles from './Pergunta.module.css';

function Pergunta({ pergunta, texto, isActive, onClick, links }) {
  return (
    <div className={styles.container}>
      <h4 onClick={onClick}>{pergunta}</h4>
      {isActive && (
        <>
          <p className={styles.active}>{texto}</p>
          {links && (
            <div className={styles.linksContainer}>
              {links.map((link, index) => (
                link.url.startsWith('/') ? (
                  // Navegação interna com Link do React Router
                  <Link
                    key={index}
                    to={link.url}
                    className={styles.button}
                  >
                    {link.texto}
                  </Link>
                ) : (
                  // Link externo
                  <a
                    key={index}
                    href={link.url}
                    className={styles.button}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    {link.texto}
                  </a>
                )
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pergunta;
