import styles from './Inicio.module.css';
import Numero from './Numero';
import { faDollarSign, faCalendar, faCheck, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import AvaliaVideo from './AvaliaVideo';
import { useState, useEffect } from 'react';

function Inicio({ email }) {
  if (!email) {
    throw new Error('Email is required to use this component.');
  }

  // Função para gerar uma chave única no localStorage baseada no email
  const getStorageKey = (key) => `${email}_${key}`;

  // Estado do saldo atual
  const [saldoAtual, setSaldoAtual] = useState(() => {
    const saldoSalvo = localStorage.getItem(getStorageKey('saldoAtual'));
    return saldoSalvo ? parseFloat(saldoSalvo) : 0.0;
  });

  // Estado para o número de avaliações
  const [numeroAvaliacoes, setNumeroAvaliacoes] = useState(() => {
    const avaliacoesData = JSON.parse(localStorage.getItem(getStorageKey('avaliacoesDiarias'))) || { date: '', count: 0 };
    const hoje = new Date().toISOString().split('T')[0];
    return avaliacoesData.date === hoje ? avaliacoesData.count : 0;
  });

  const [avaliacoesRestantes, setAvaliacoesRestantes] = useState(() => 10 - numeroAvaliacoes);

  // Atualizar saldo no localStorage
  useEffect(() => {
    localStorage.setItem(getStorageKey('saldoAtual'), saldoAtual.toFixed(2));
  }, [saldoAtual]);

  // Atualizar avaliações diárias no localStorage
  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0];
    localStorage.setItem(getStorageKey('avaliacoesDiarias'), JSON.stringify({ date: hoje, count: numeroAvaliacoes }));
  }, [numeroAvaliacoes]);

  // Função chamada ao avaliar um vídeo
  const handleAvaliaVideo = (valor) => {
    if (avaliacoesRestantes > 0) {
      setSaldoAtual((prevSaldo) => prevSaldo + valor);
      setNumeroAvaliacoes((prevCount) => prevCount + 1);
      setAvaliacoesRestantes((prev) => prev - 1);
    } else {
      alert('Você atingiu o limite de 10 avaliações para hoje.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerTexto}>
        <h1>Evaluar videos</h1>
        <p>Da tu opinión sobre los artistas a continuación y gana recompensas.</p>
      </div>
      <div className={styles.containerNumeros}>
        <Numero
          icone={faDollarSign}
          texto={'Saldo actual'}
          valor={`R$ ${saldoAtual.toFixed(2)}`}
          corIcone={'rgb(16, 185, 115)'}
          corBackground={'rgba(16, 185, 115, 0.3)'}
        />
        <Numero
          icone={faCalendar}
          texto={'Evaluaciones hoy'}
          valor={numeroAvaliacoes.toString()}
          corIcone={'rgb(0 92 139)'}
          corBackground={'rgba(0, 92,139, 0.3)'}
        />
        <Numero
          icone={faCheck}
          texto={'Evaluaciones restantes'}
          valor={avaliacoesRestantes.toString()}
          corIcone={'rgb(157 ,84 ,187)'}
          corBackground={'rgba(157 ,84 ,187, 0.3)'}
        />
        <Numero
          icone={faChartSimple}
          texto={'Potencial diario restante'}
          valor={`R$ ${(10 - numeroAvaliacoes) * 2}.00`}
          corIcone={'rgb(240, 199 ,85)'}
          corBackground={'rgba(240, 199 ,85, 0.3)'}
        />
      </div>
      <AvaliaVideo onRate={handleAvaliaVideo} />
    </div>
  );
}

export default Inicio;
