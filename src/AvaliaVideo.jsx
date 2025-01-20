import React, { useState, useEffect } from "react";
import styles from './AvaliaVideo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = ({ onRate, email }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [apiKeyIndex, setApiKeyIndex] = useState(0);
  const [notification, setNotification] = useState("");
  const [useVimeo, setUseVimeo] = useState(false);

  const API_KEYS = ["API_KEY_1", "API_KEY_2", "API_KEY_3", "API_KEY_4"];
  const currentApiKey = API_KEYS[apiKeyIndex];
  const VIMEO_ACCESS_TOKEN = "YOUR_VIMEO_ACCESS_TOKEN";
  const EMERGENCY_VIDEOS = ["https://www.youtube.com/embed/VIDEO_1", "https://www.youtube.com/embed/VIDEO_2"];

  // Carregar dados do usuário baseado no email
  const loadUserData = () => {
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    return usersData[email] || { avaliacaoValor: 0 }; // Dados padrão para novo usuário
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

  const handleRating = (rating) => {
    setNotification(`Você deu um ${rating} para o vídeo!`);
    const newAvaliacaoValor = (userData.avaliacaoValor || 0) + 2;

    // Atualiza o estado e salva no localStorage
    const updatedData = { ...userData, avaliacaoValor: newAvaliacaoValor };
    setUserData(updatedData);
    saveUserData(updatedData);

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
