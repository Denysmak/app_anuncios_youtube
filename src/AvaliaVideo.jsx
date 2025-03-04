import React, { useState, useEffect } from "react";
import styles from './AvaliaVideo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import coinSound from './assets/coin.mp3';
const VideoPlayer = ({ onRate, email, numeroAvaliacoes }) => {


  
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [apiKeyIndex, setApiKeyIndex] = useState(0);
  const [notification, setNotification] = useState("");
  const [useVimeo, setUseVimeo] = useState(false);

  const API_KEYS = [
    "AIzaSyBMVY0qRG0iw-k1nkeR9qwOjyfL_T4hFdQ",
    "AIzaSyBN135OWqpHPnDPI7zvu7YtKMdfuuhF1vM",
    "AIzaSyDD2jTfwsVFYf8badlYFmQmPCu7hDoSj_4",
    "AIzaSyDOusWgJmIrxOlEqrhx8Ar5dDXUH6C8MdA"
  ];
  const currentApiKey = API_KEYS[apiKeyIndex];
  const VIMEO_ACCESS_TOKEN = "0dfc00064b5fd780ea62e558d9179770";
  const EMERGENCY_VIDEOS = [
    "https://www.youtube.com/embed/JuYeHPFR3f0", // Shakira - Waka Waka
    "https://www.youtube.com/embed/Rht7rBHuXW8", // Enrique Iglesias - Bailando
    "https://www.youtube.com/embed/1G4isv_Fylg", // Luis Fonsi - Despacito
    "https://www.youtube.com/embed/vtNJMAyeP0s", // CNCO - Reggaetón Lento
    "https://www.youtube.com/embed/kJQP7kiw5Fk", // Sebastián Yatra - Traicionera
    "https://www.youtube.com/embed/mR5UdYH11OM", // Aventura - Obsesión
    "https://www.youtube.com/embed/YP-nfrfPSNA", // Alejandro Sanz - Amiga Mía
    "https://www.youtube.com/embed/z3wAjJXbYzA", // Natalia Lafourcade - Hasta La Raíz
    "https://www.youtube.com/embed/Pw-0pbY9JeU", // Maluma - Felices Los 4
    "https://www.youtube.com/embed/Zz2Ivl7_7O0", // Marc Anthony - Vivir Mi Vida
    "https://www.youtube.com/embed/l-gQLqv9f4o", // J Balvin - Mi Gente
    "https://www.youtube.com/embed/Ou_v0gZJty8", // Rosalía - Malamente
    "https://www.youtube.com/embed/NdYWuo9OFAw", // Daddy Yankee - Dura
    "https://www.youtube.com/embed/x9I9LXjjp3U", // Becky G - Sin Pijama
    "https://www.youtube.com/embed/9AX2ph6qVzo", // Jesse & Joy - Corre
    "https://www.youtube.com/embed/XAukq5jEc1I", // Karol G - Tusa
    "https://www.youtube.com/embed/Gz2GVlQkn4Q", // Ricky Martin - La Mordidita
    "https://www.youtube.com/embed/SUFdDZuWl24", // Pablo Alborán - Solamente Tú
    "https://www.youtube.com/embed/6O3YXXrjI6k", // Reik - Me Niego
    "https://www.youtube.com/embed/szDj3B-ZIkA", // Lola Indigo - Mujer Bruja
    "https://www.youtube.com/embed/1r6ZFSJdaYs", // Melendi - Lágrimas Desordenadas
    "https://www.youtube.com/embed/TL_8ErsuXPY", // Juanes - La Camisa Negra
    "https://www.youtube.com/embed/eHegmfDuvT8", // Maná - Rayando el Sol
    "https://www.youtube.com/embed/QlxnmfD97gU", // Gente de Zona - La Gozadera
    "https://www.youtube.com/embed/tULyXnpJlrY", // Nicky Jam - El Perdón
    "https://www.youtube.com/embed/_UR-l3QI2nE", // Morat - Cómo Te Atreves
    "https://www.youtube.com/embed/2vjPBrBU-TM", // Shakira - Chantaje
    "https://www.youtube.com/embed/lrXWzTEqqlU", // Prince Royce - Darte un Beso
    "https://www.youtube.com/embed/56q5YjvoMmE", // Camila - Aléjate de Mí
    "https://www.youtube.com/embed/3Yaaqz6fE_c"  ,// Sin Bandera - Entra En Mi Vida
    "https://www.youtube.com/embed/JuYeHPFR3f0",
    "https://www.youtube.com/embed/Rht7rBHuXW8",
    "https://www.youtube.com/embed/1G4isv_Fylg",
    "https://www.youtube.com/embed/vtNJMAyeP0s",
    "https://www.youtube.com/embed/kJQP7kiw5Fk",
    "https://www.youtube.com/embed/mR5UdYH11OM",
    "https://www.youtube.com/embed/YP-nfrfPSNA",
    "https://www.youtube.com/embed/z3wAjJXbYzA",
    "https://www.youtube.com/embed/Pw-0pbY9JeU",
    "https://www.youtube.com/embed/Zz2Ivl7_7O0",
    "https://www.youtube.com/embed/l-gQLqv9f4o",
    "https://www.youtube.com/embed/Ou_v0gZJty8",
    "https://www.youtube.com/embed/NdYWuo9OFAw",
    "https://www.youtube.com/embed/x9I9LXjjp3U",
    "https://www.youtube.com/embed/9AX2ph6qVzo",
    "https://www.youtube.com/embed/XAukq5jEc1I",
    "https://www.youtube.com/embed/Gz2GVlQkn4Q",
    "https://www.youtube.com/embed/SUFdDZuWl24",
    "https://www.youtube.com/embed/6O3YXXrjI6k",
    "https://www.youtube.com/embed/szDj3B-ZIkA",
    "https://www.youtube.com/embed/1r6ZFSJdaYs",
    "https://www.youtube.com/embed/TL_8ErsuXPY",
    "https://www.youtube.com/embed/eHegmfDuvT8",
    "https://www.youtube.com/embed/QlxnmfD97gU",
    "https://www.youtube.com/embed/tULyXnpJlrY",
    "https://www.youtube.com/embed/_UR-l3QI2nE",
    "https://www.youtube.com/embed/2vjPBrBU-TM",
    "https://www.youtube.com/embed/lrXWzTEqqlU",
    "https://www.youtube.com/embed/56q5YjvoMmE",
    "https://www.youtube.com/embed/3Yaaqz6fE_c"
  ];
  // Carregar dados do usuário baseado no email
  const loadUserData = () => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    return usersData[email] || { avaliacaoValor: 0 }; // Dados padrão para novo usuário
  };
  
  const playMoneySound = () => {
    const audio = new Audio(coinSound); // Caminho para o arquivo de áudio
    audio.play().catch((error) => {
        console.error("Erro ao reproduzir o som:", error);
    });
};
  // Salvar dados do usuário no localStorage
  const saveUserData = (newData) => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    usersData[email] = { ...usersData[email], ...newData };
    localStorage.setItem("usersData", JSON.stringify(usersData));
  };

  const [userData, setUserData] = useState(loadUserData);


  const fetchYouTubeVideos = async (pageToken = "") => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&relevanceLanguage=es&pageToken=${pageToken}&key=${currentApiKey}`
      );
      const data = await response.json();
      const videoLinks = data.items
        .filter((item) => item.snippet.liveBroadcastContent !== "live")
        .map((item) => `https://www.youtube.com/embed/${item.id.videoId}`)
        .filter((link) => !displayedVideos.includes(link));

      setVideos((prevVideos) => [...prevVideos, ...videoLinks]);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Erro ao buscar vídeos no YouTube:", error);
      if (apiKeyIndex === API_KEYS.length - 1) {
        setUseVimeo(true);
        fetchVimeoVideos();
      } else {
        setApiKeyIndex((prevIndex) => (prevIndex + 1) % API_KEYS.length);
      }
    }
  };

  const fetchVimeoVideos = async () => {
    try {
      const response = await fetch(`https://api.vimeo.com/videos?query=espanol&per_page=50`, {
        headers: { Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}` },
      });
      const data = await response.json();
      const videoLinks = data.data
        .map((item) => item.link.replace("vimeo.com", "player.vimeo.com/video"))
        .filter((link) => !displayedVideos.includes(link));
      setVideos(videoLinks.length > 0 ? videoLinks : EMERGENCY_VIDEOS);
    } catch (error) {
      console.error("Erro ao buscar vídeos no Vimeo:", error);
      setVideos(EMERGENCY_VIDEOS);
    }
  };

  useEffect(() => {
    if (useVimeo) {
      fetchVimeoVideos();
    } else {
      fetchYouTubeVideos();
    }
  }, [apiKeyIndex, useVimeo]);

  useEffect(() => {
    // Clicar no botão de "Próximo Vídeo" automaticamente após carregar a página
    if (videos.length > 0) {
      goToNextVideo();
    }
  }, [videos]);

  

  const handleRating = (rating) => {

    if ((userData.avaliacaoValor || 0) >= 20) { // 20 porque 10 avaliações x R$2,00
      alert("Ya has alcanzado el límite de 10 evaluaciones.");
      return;
    }
    
    playMoneySound()
    // Faz o scroll para o topo da página
    window.scrollTo({ top: 0, behavior: "smooth" });
  
    document.body.style.overflow = "hidden";

   
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000);

    setNotification(`¡Has dado un ${rating} al video!`);
    const newAvaliacaoValor = (userData.avaliacaoValor || 0) + 2;
  
    // Atualiza o estado e salva no localStorage
    const updatedData = { ...userData, avaliacaoValor: newAvaliacaoValor };
    setUserData(updatedData);
    saveUserData(updatedData);
  
    if (typeof onRate === "function") {
      onRate(1); // Valor fixo de R$ 2,00
    }
  
    
    goToNextVideo();
    // Fechar a notificação após 3 segundos
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleVideoError = () => {
    console.warn("Vídeo indisponível. Pulando para o próximo...");
    goToNextVideo();
  };

  const goToNextVideo = () => {
    setDisplayedVideos((prev) => [...prev, videos[currentVideoIndex]]);
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else if (!useVimeo && nextPageToken) {
      fetchYouTubeVideos(nextPageToken);
    } else {
      alert("No hay más videos disponibles en este momento.");
    }
  };

  const skipVideo = () => {
    goToNextVideo();
  };

  return (
    <div className={styles.container}>
      {videos.length > 0 ? (
        <div className={styles.containerVideo}>
          <iframe
            className={styles.video}
            width="560"
            height="315"
            src={videos[currentVideoIndex]}
            title="Vídeo em Espanhol"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onError={handleVideoError}
          ></iframe>
          <div className={styles.containerBotoes}> 
            <button onClick={() => handleRating("like")}>👍 Like</button>
            <button onClick={() => handleRating("dislike")}>👎 Dislike</button>
            <button onClick={skipVideo}>⏭ Pular Vídeo</button>
          </div>
        </div>
      ) : (
        <p>Cargando videos...</p>
      )}
      {numeroAvaliacoes < 10 && notification && (
    <div className={styles.containerNotification}>
        <div className={styles.notification}>
            <div className={styles.containerCor}>
                <div className={styles.checkContainer}>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            </div>
            <h2>¡Felicidades!</h2>
            <p>¡Has completado una encuesta y ganaste!</p>
            <h2 id={styles.valor}>$ 1.00</h2>
            <p>¡Continúa evaluando más artistas para aumentar tus ganancias!</p>
            {/* Botão de fechar */}
       
        </div>
    </div>
)}
    </div>
  );
};

export default VideoPlayer;
