import styles from './Pergunta.module.css';

function Pergunta({ pergunta, texto, isActive, onClick, links }) {
  return (
    <div className={styles.container}>
      <h4 onClick={onClick}>{pergunta}</h4>
      {isActive && (
        <>
          <p className={isActive ? styles.active : styles.inactive}>{texto}</p>
          {links && (
            <div className={styles.linksContainer}>
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={styles.button}
                  target="_self"
                  rel="noopener noreferrer"
                >
                  {link.texto}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pergunta;
