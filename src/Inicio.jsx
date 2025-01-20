import styles from './Inicio.module.css';
import Numero from './Numero';
import { faDollarSign, faCalendar, faCheck, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import AvaliaVideo from './AvaliaVideo';
import { useState, useEffect } from 'react';

function Inicio() {
  // Inicializa o estado com o valor salvo no LocalStorage ou com 100.00 se não existir
  const [saldoAtual, setSaldoAtual] = useState(() => {
    const saldoSalvo = localStorage.getItem('saldoAtual');
    return saldoSalvo ? parseFloat(saldoSalvo) : 100.00; // Parse para garantir que é número
  });

  // Salvar saldo no LocalStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('saldoAtual', saldoAtual.toFixed(2));
  }, [saldoAtual]);

  const handleAvaliaVideo = (valor) => {
    setSaldoAtual((prevSaldo) => prevSaldo + valor); // Atualiza o saldo ao receber o valor de AvaliaVideo
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
          texto={'Investigaciones hoy'}
          valor={'R$ 100.00'}
          corIcone={'rgb(0 92 139)'}
          corBackground={'rgba(0, 92,139, 0.3)'}
        />
        <Numero
          icone={faCheck}
          texto={'Investigaciones restantes'}
          valor={'R$ 100.00'}
          corIcone={'rgb(157 ,84 ,187)'}
          corBackground={'rgba(157 ,84 ,187, 0.3)'}
        />
        <Numero
          icone={faChartSimple}
          texto={'Potencial diario restante'}
          valor={'R$ 100.00'}
          corIcone={'rgb(240, 199 ,85)'}
          corBackground={'rgba(240, 199 ,85, 0.3)'}
        />
      </div>
      <AvaliaVideo onRate={handleAvaliaVideo} />
    </div>
  );
}

export default Inicio;
