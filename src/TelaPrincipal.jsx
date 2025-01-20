import { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Saque from './Saque';
import Inicio from './Inicio';
import Ajuda from './Ajuda';
import styles from './TelaPrincipal.module.css'

function TelaPrincipal() {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('Inicio'); // Página inicial definida como "Inicio"

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail'); // Recupera o e-mail salvo
    if (savedEmail) {
      setEmail(savedEmail); // Atualiza o estado com o e-mail salvo no localStorage
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'Saque':
        return <Saque  email={email}/>;
      case 'Inicio':
        if (email) {
          return <Inicio email={email} />;
        } else {
          return <h2>Por favor, faça login para acessar esta página.</h2>;
        }
      case 'Ajuda':
        return <Ajuda />;
      default:
        return <h2>Página não encontrada</h2>;
    }
  };

  return (
    <div className={styles.container}>
      <Header email={email} />
      <div className={styles.content} style={{ marginTop: '100px' }}>
        {renderPage()}
      </div>
      <Navbar onNavigate={setActivePage} defaultPage="Inicio" />
    </div>
  );
}

export default TelaPrincipal;
