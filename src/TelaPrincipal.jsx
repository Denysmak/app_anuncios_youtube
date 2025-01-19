import { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Saque from './Saque';
import Inicio from './Inicio';
import Ajuda from './Ajuda';



function TelaPrincipal() {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('Inicio'); // Página inicial definida como "Inicio"

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail'); // Recupera o e-mail salvo
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'Saque':
        return <Saque />;
      case 'Inicio':
        return <Inicio />;
      case 'Ajuda':
        return <Ajuda />;
      default:
        return <h2>Página não encontrada</h2>;
    }
  };

  return (
    <div>
      <Header email={email} />
      <div className='content' style={{ marginTop: '100px' }}>
        {renderPage()}
      </div>
      <Navbar onNavigate={setActivePage} defaultPage="Inicio" />
    </div>
  );
}

export default TelaPrincipal;
