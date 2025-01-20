import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import YoutubeLogo from './YoutubeLogo';
import user from './assets/user.svg';
import sack from './assets/sack-dolar.svg';
import pessoas from './assets/userGroup.svg';

function Header({ email }) {
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [pagoHoje, setPagoHoje] = useState(16500); // Valor inicial padrão
  const [pessoasCount, setPessoasCount] = useState(734); // Valor inicial padrão
  const [saldoAtual, setSaldoAtual] = useState(0.0); // Valor inicial do saldo

  // Função para gerar uma chave única no localStorage baseada no email
  const getStorageKey = (key) => `${email}_${key}`;

  useEffect(() => {
    if (!email) return;

    const storedPagoHoje = parseFloat(localStorage.getItem(getStorageKey('pagoHoje'))) || 16500;
    const storedPessoasCount = parseInt(localStorage.getItem(getStorageKey('pessoasCount')), 10) || 734;
    const storedSaldoAtual = parseFloat(localStorage.getItem(getStorageKey('saldoAtual'))) || 0.0;

    setPagoHoje(storedPagoHoje);
    setPessoasCount(storedPessoasCount);
    setSaldoAtual(storedSaldoAtual);
    setLoading(false); // Finaliza o carregamento após os dados serem definidos
  }, [email]);

  useEffect(() => {
    if (!email || loading) return;

    const interval = setInterval(() => {
      const saldo = parseFloat(localStorage.getItem(getStorageKey('saldoAtual'))) || 0.0;
      setSaldoAtual(saldo);
    }, 1000); // Atualiza o saldo a cada segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [email, loading]);

  useEffect(() => {
    if (!email || loading) return;

    const pagoHojeInterval = setInterval(() => {
      setPagoHoje((prev) => {
        const newPagoHoje = prev + 150;
        localStorage.setItem(getStorageKey('pagoHoje'), newPagoHoje.toString());
        return newPagoHoje;
      });
    }, 10000); // Incrementa a cada 10 segundos

    const pessoasCountInterval = setInterval(() => {
      setPessoasCount((prev) => {
        const newPessoasCount = prev + 1;
        localStorage.setItem(getStorageKey('pessoasCount'), newPessoasCount.toString());
        return newPessoasCount;
      });
    }, 7000); // Incrementa a cada 7 segundos

    return () => {
      clearInterval(pagoHojeInterval);
      clearInterval(pessoasCountInterval);
    };
  }, [email, loading]);

  if (loading) {
    return <div>Carregando...</div>; // Placeholder enquanto os dados são carregados
  }

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
