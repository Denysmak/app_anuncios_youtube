
import youtubeLogo from './assets/logoYoutube.png'
import styles from './YoutubeLogo.module.css'


function YoutubeLogo({tamanhoImagem, tamanhoLetra, tamanhoSpan, marginDireita}) {
  return (
    <>
    <a href="https://www.youtube.com/" style={{textDecoration:0}}>
      <div className={styles.containerLogo}>
        <img className={styles.logoYoutube} style={{height:tamanhoImagem, marginRight:marginDireita}} id='logoYoutube' src={youtubeLogo} alt="logotipo de YouTube" />
        <h2 style={{fontSize:tamanhoLetra}}><span className='letrasMaiores' style={{fontSize:tamanhoSpan}}>Y</span>OU<span className='letrasMaiores' style={{fontSize:tamanhoSpan}}>T</span>UBE</h2>
      </div>
      </a>
    </>
  )
}

export default YoutubeLogo
