import React, { useState, useEffect } from "react";
import styles from './AvaliaVideo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = ({onRate}) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayedVideos, setDisplayedVideos] = useState([]); // Armazena vídeos já exibidos
  const [nextPageToken, setNextPageToken] = useState(""); // Token para buscar mais vídeos (YouTube)
  const [apiKeyIndex, setApiKeyIndex] = useState(0); // Índice da chave de API atual (YouTube)
  const [notification, setNotification] = useState(""); // Para controlar a notificação
  const [useVimeo, setUseVimeo] = useState(false); // Alternar para Vimeo se YouTube falhar

  // Suas 4 chaves de API (YouTube)
  const API_KEYS = [
    "AIzaSyBMVY0qRG0iw-k1nkeR9qwOjyfL_T4hFdQ",
    "AIzaSyBN135OWqpHPnDPI7zvu7YtKMdfuuhF1vM",
    "AIzaSyDD2jTfwsVFYf8badlYFmQmPCu7hDoSj_4",
    "AIzaSyDOusWgJmIrxOlEqrhx8Ar5dDXUH6C8MdA"
  ];

  const EMERGENCY_VIDEOS = [
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

  const currentApiKey = API_KEYS[apiKeyIndex];

  const VIMEO_ACCESS_TOKEN = "0dfc00064b5fd780ea62e558d9179770";

  const fetchYouTubeVideos = async (pageToken = "") => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&relevanceLanguage=es&pageToken=${pageToken}&key=${currentApiKey}`
      );
      const data = await response.json();
      const videoLinks = data.items
        .filter((item) => item.snippet.liveBroadcastContent !== "live") // Exclui lives
        .map((item) => `https://www.youtube.com/embed/${item.id.videoId}`)
        .filter((link) => !displayedVideos.includes(link));

      setVideos((prevVideos) => [...prevVideos, ...videoLinks]);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Erro ao buscar vídeos no YouTube:", error);
      if (apiKeyIndex === API_KEYS.length - 1) {
        console.warn("Mudando para Vimeo...");
        setUseVimeo(true);
        fetchVimeoVideos();
      } else {
        setApiKeyIndex((prevIndex) => (prevIndex + 1) % API_KEYS.length);
      }
    }
  };

  const fetchVimeoVideos = async () => {
    try {
      const response = await fetch(
        `https://api.vimeo.com/videos?query=espanol&per_page=50`,
        {
          headers: {
            Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`
          }
        }
      );
      const data = await response.json();
      const videoLinks = data.data
        .map((item) => item.link.replace("vimeo.com", "player.vimeo.com/video"))
        .filter((link) => !displayedVideos.includes(link));

      const shuffledVideos = videoLinks.sort(() => Math.random() - 0.5);

      if (shuffledVideos.length > 0) {
        setVideos(shuffledVideos);
      } else {
        console.warn("Nenhum vídeo encontrado no Vimeo. Usando vídeos de emergência...");
        setVideos(EMERGENCY_VIDEOS);
      }
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

  const handleRating = (rating) => {
    console.log(`Você deu um ${rating} para o vídeo: ${videos[currentVideoIndex]}`);
    setNotification(`Você deu um ${rating} para o vídeo!`);
  
    // Recupera o valor atual do LocalStorage ou inicializa com 0
    const currentValue = parseInt(localStorage.getItem('avaliacaoValor') || '0', 10);
  
    // Atualiza o valor no LocalStorage
    const newValue = currentValue + 2;
    localStorage.setItem('avaliacaoValor', newValue);
  
    // Opcional: Chama o callback do componente pai (se necessário)
    if (typeof onRate === "function") {
      onRate(2); // Valor fixo de R$ 2,00
    }
  
    setTimeout(() => setNotification(""), 3000);
    goToNextVideo();
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
      console.log("Carregando mais vídeos do YouTube...");
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
          <div>
            <button onClick={() => handleRating("like")}>👍 Like</button>
            <button onClick={() => handleRating("dislike")}>👎 Dislike</button>
            <button onClick={skipVideo}>⏭ Pular Vídeo</button>
          </div>
        </div>
      ) : (
        <p>Cargando videos...</p>
      )}

      {notification && (
        <div className={styles.containerNotification}>
          <div className={styles.notification}>
            <div className={styles.containerCor}>
              <div className={styles.checkContainer}>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </div>
            <h2>¡Felicidades!</h2>
            <p>¡Has completado una encuesta y ganaste!</p>
            <h2 id={styles.valor}>R$ 2.00</h2>
            <p>¡Continúa evaluando más artistas para aumentar tus ganancias!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
