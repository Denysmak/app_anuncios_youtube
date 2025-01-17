import { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Saque from './Saque';
import Inicio from './Inicio';
import Ajuda from './Ajuda';

function TelaPrincipal() {
  const [email, setEmail] = useState('');
  const [activePage, setActivePage] = useState('Page1'); // Página inicial

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail'); // Recupera o e-mail salvo
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'Page1':
        return <Saque />;
      case 'Page2':
        return <Inicio />;
      case 'Page3':
        return <Ajuda />;
      default:
        return <h2>Página não encontrada</h2>;
    }
  };

  return (
    <div>
      <Header email={email} />
      <div className="content" style={{ marginTop: '100px' }}>
        {renderPage()}
      </div>
      <Navbar onNavigate={setActivePage} />
    </div>
  );
}

export default TelaPrincipal;
