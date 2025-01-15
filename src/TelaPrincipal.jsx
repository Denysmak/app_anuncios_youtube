import { useEffect, useState } from 'react';

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
      <h1>Bem-vindo ao Dashboard</h1>
      <p>Seu e-mail registrado é: {email}</p>
      {/* Adicione funcionalidades adicionais aqui */}
    </div>
  );
}

export default TelaPrincipal;
