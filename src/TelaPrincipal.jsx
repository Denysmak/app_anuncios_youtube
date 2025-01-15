import { useEffect, useState } from 'react';
import Header from './Header';


function TelaPrincipal() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail'); // Recupera o e-mail salvo
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <div>
      <Header email={email}/>
    </div>
  );
}

export default TelaPrincipal;
