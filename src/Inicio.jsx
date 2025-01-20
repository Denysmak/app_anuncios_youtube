import styles from './Inicio.module.css'
import Numero from './Numero'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import AvaliaVideo from './AvaliaVideo';


function Inicio() {
    return <div className={styles.container}>
        <div className={styles.containerTexto}>
        <h1>Avalie Videos</h1>
        <p>Dê sua opinião sobre os artistas abaixo e ganhe recompensas</p>
        </div>
        <div className={styles.containerNumeros}>
            <Numero icone={faDollarSign} texto={'Saldo atual'} valor={'R$ 100.00'} corIcone={'rgb(16, 185, 115)'} corBackground={'rgba(16, 185, 115, 0.3)'}/>
            <Numero icone={faCalendar} texto={'Pesquisas Hoje'} valor={'R$ 100.00'} corIcone={'rgb(0 92 139)'} corBackground={'rgba(0, 92,139, 0.3)'}/>
            <Numero icone={faCheck} texto={'Pesquisas Restantes'} valor={'R$ 100.00'} corIcone={'rgb(157 ,84 ,187)'} corBackground={'rgba(157 ,84 ,187, 0.3)'}/>
            <Numero icone={faChartSimple} texto={'Potencial Diário Restante'} valor={'R$ 100.00'} corIcone={'rgb(240, 199 ,85)'} corBackground={'rgba(240, 199 ,85, 0.3)'}/>
        </div>
        <AvaliaVideo />

      </div>;
  }
  
  export default Inicio;