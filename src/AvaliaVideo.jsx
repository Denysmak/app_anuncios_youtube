import React, { useState, useEffect } from "react";
import styles from './AvaliaVideo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = () => {
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
    "https://www.youtube.com/embed/3Yaaqz6fE_c"  // Sin Bandera - Entra En Mi Vida
  ];

  const currentApiKey = API_KEYS[apiKeyIndex]; // Chave de API atual

  // **Substitua aqui o seu token de acesso do Vimeo**
  const VIMEO_ACCESS_TOKEN = "0dfc00064b5fd780ea62e558d9179770";  // Coloque seu token aqui
  
  // Função para buscar vídeos no YouTube
  const fetchYouTubeVideos = async (pageToken = "") => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&relevanceLanguage=es&pageToken=${pageToken}&key=${currentApiKey}`
      );
      const data = await response.json();
      const videoLinks = data.items
        .map((item) => `https://www.youtube.com/embed/${item.id.videoId}`)
        .filter((link) => !displayedVideos.includes(link)); // Evita vídeos repetidos

      setVideos((prevVideos) => [...prevVideos, ...videoLinks]);
      setNextPageToken(data.nextPageToken || "");
    } catch (error) {
      console.error("Erro ao buscar vídeos no YouTube:", error);
      // Troca para Vimeo se todas as chaves falharem
      if (apiKeyIndex === API_KEYS.length - 1) {
        console.warn("Mudando para Vimeo...");
        setUseVimeo(true);
        fetchVimeoVideos(); // Tenta buscar vídeos no Vimeo
      } else {
        setApiKeyIndex((prevIndex) => (prevIndex + 1) % API_KEYS.length);
      }
    }
  };

  // Função para buscar vídeos no Vimeo
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
        .filter((link) => !displayedVideos.includes(link)); // Evita vídeos repetidos
  
      // Embaralha os vídeos antes de exibir
      const shuffledVideos = videoLinks.sort(() => Math.random() - 0.5);
  
      if (shuffledVideos.length > 0) {
        setVideos(shuffledVideos); // Exibe vídeos embaralhados
      } else {
        console.warn("Nenhum vídeo encontrado no Vimeo. Usando vídeos de emergência...");
        setVideos(EMERGENCY_VIDEOS);
      }
    } catch (error) {
      console.error("Erro ao buscar vídeos no Vimeo:", error);
      setVideos(EMERGENCY_VIDEOS); // Se o Vimeo falhar, usa os vídeos de emergência
    }
  };

  useEffect(() => {
    if (useVimeo) {
      fetchVimeoVideos(); // Alterna para Vimeo
    } else {
      fetchYouTubeVideos(); // Continua com YouTube
    }
  }, [apiKeyIndex, useVimeo]);

  const handleRating = (rating) => {
    console.log(`Você deu um ${rating} para o vídeo: ${videos[currentVideoIndex]}`);
    setNotification(`Você deu um ${rating} para o vídeo!`);
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

  // Função para pular o vídeo atual
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
