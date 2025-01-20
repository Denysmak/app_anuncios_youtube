import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import YoutubeLogo from './YoutubeLogo';
import user from './assets/user.svg';
import sack from './assets/sack-dolar.svg';
import pessoas from './assets/userGroup.svg';

function Header({ email }) {
  const [pagoHoje, setPagoHoje] = useState(16500); // Valor inicial padrão
  const [pessoasCount, setPessoasCount] = useState(734); // Valor inicial padrão
  const [saldoAtual, setSaldoAtual] = useState(0.00); // Valor inicial do saldo

  // Função para carregar o saldo atual do localStorage
  const loadSaldoAtual = () => {
    const saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0.00;
    setSaldoAtual(saldo);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const saldo = parseFloat(localStorage.getItem('saldoAtual')) || 0.00;
      setSaldoAtual(saldo);
    }, 1000); // Verifica o saldo a cada segundo
  
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);
  
  useEffect(() => {
    // Carrega o saldo inicial
    loadSaldoAtual();

    // Função que atualiza o saldoAtual sempre que ele mudar no localStorage
    const handleStorageChange = (event) => {
      if (event.key === 'saldoAtual') {
        loadSaldoAtual(); // Atualiza o estado com o novo valor do saldo
      }
    };

    // Listener que reage a mudanças no localStorage
    window.addEventListener('storage', handleStorageChange);

    // Limpa o listener ao desmontar o componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Executa apenas uma vez ao montar o componente

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

    // Intervalo para incrementar "pagoHoy" mais rapidamente
    const pagoHojeInterval = setInterval(() => {
      setPagoHoje((prev) => {
        const newPagoHoje = prev + 150;
        updateUserData(email, { pagoHoje: newPagoHoje, pessoasCount }); // Atualizar localStorage
        return newPagoHoje;
      });
    }, 10000); // Incrementa a cada 10 segundos

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
  }, [email]);

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
          {/* Renderiza o saldoAtual */}
          <p id="saldoAtual">R$ {saldoAtual.toFixed(2)}</p>
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
            Pago hoy: <span id="pagoHoy">R$ {pagoHoje.toFixed(2)}</span>
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
