import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import YoutubeLogo from './YoutubeLogo';
import user from './assets/user.svg';
import sack from './assets/sack-dolar.svg';
import pessoas from './assets/userGroup.svg';

function Header({ email }) {
  const [pagoHoje, setPagoHoje] = useState(16500); // Valor inicial padrão
  const [pessoasCount, setPessoasCount] = useState(734); // Valor inicial padrão

  useEffect(() => {
    // Função para carregar os dados do usuário atual
    const loadUserData = () => {
      const usersData = JSON.parse(localStorage.getItem('usersData')) || {}; // Recupera os dados de todos os usuários
      if (usersData[email]) {
        setPagoHoje(usersData[email].pagoHoje);
        setPessoasCount(usersData[email].pessoasCount);
      } else {
        // Se o email for novo, usar os valores padrão
        setPagoHoje(16500);
        setPessoasCount(734);
      }
    };

    loadUserData(); // Carregar dados ao montar o componente

    // Intervalo para incrementar "pagoHoje" mais rapidamente
    const pagoHojeInterval = setInterval(() => {
      setPagoHoje((prev) => {
        const newPagoHoje = prev + 150;
        updateUserData(email, { pagoHoje: newPagoHoje, pessoasCount }); // Atualizar localStorage
        return newPagoHoje;
      });
    }, 10000); // Incrementa a cada 5 segundos

    // Intervalo para incrementar "pessoasCount" mais lentamente
    const pessoasCountInterval = setInterval(() => {
      setPessoasCount((prev) => {
        const newPessoasCount = prev + 1;
        updateUserData(email, { pagoHoje, pessoasCount: newPessoasCount }); // Atualizar localStorage
        return newPessoasCount;
      });
    }, 7000); // Incrementa a cada 7 segundos

    // Limpar intervalos ao desmontar o componente
    return () => {
      clearInterval(pagoHojeInterval);
      clearInterval(pessoasCountInterval);
    };
  }, [email]); // Apenas dependência do email agora, sem o pessoasCount

  // Função para atualizar os dados do usuário no localStorage
  const updateUserData = (userEmail, newData) => {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {}; // Recupera os dados existentes
    usersData[userEmail] = { ...usersData[userEmail], ...newData }; // Atualiza ou cria os dados do email
    localStorage.setItem('usersData', JSON.stringify(usersData)); // Salva de volta no localStorage
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.logoValor}>
        <YoutubeLogo
          tamanhoImagem="70px"
          tamanhoSpan="1.5rem"
          tamanhoLetra="1.3rem"
          marginDireita="-28px"
        />
        <div className={styles.containerValor}>
          <p>R$100.00</p>
        </div>
      </div>
      <div className={styles.informacoes}>
        <div className={styles.userContainer}>
          <img src={user} alt="User" />
          <p>{email}</p>
        </div>
        <div className={styles.pagoHoje}>
          <img src={sack} alt="Sack" />
          <p>
            Pago hoy: <span id="pagoHoje">R$ {pagoHoje.toFixed(2)}</span>
          </p>
        </div>
        <div className={styles.pessoas}>
          <img src={pessoas} alt="Pessoas" />
          <p>
            Personas: <span id="pessoas">{pessoasCount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
