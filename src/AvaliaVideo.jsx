import React, { useState, useEffect } from "react";
import styles from './AvaliaVideo.module.css'
const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayedVideos, setDisplayedVideos] = useState([]); // Armazena vídeos já exibidos
  const [nextPageToken, setNextPageToken] = useState(""); // Token para buscar mais vídeos

  const API_KEY = "AIzaSyBN135OWqpHPnDPI7zvu7YtKMdfuuhF1vM"; // Insira sua API Key aqui

  // Função para buscar vídeos na YouTube Data API
  const fetchVideos = async (pageToken = "") => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&relevanceLanguage=es&pageToken=${pageToken}&key=${API_KEY}`
      );
      const data = await response.json();
      const videoLinks = data.items
        .map((item) => `https://www.youtube.com/embed/${item.id.videoId}`)
        .filter((link) => !displayedVideos.includes(link)); // Evita vídeos repetidos

      setVideos((prevVideos) => [...prevVideos, ...videoLinks]); // Adiciona novos vídeos
      setNextPageToken(data.nextPageToken || ""); // Atualiza o token para a próxima página
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(); // Busca os vídeos ao carregar o componente
  }, []);

  const handleRating = (rating) => {
    console.log(`Você deu um ${rating} para o vídeo: ${videos[currentVideoIndex]}`);
    goToNextVideo();
  };

  const handleVideoError = () => {
    console.warn("Vídeo indisponível. Pulando para o próximo...");
    goToNextVideo();
  };

  const goToNextVideo = () => {
    // Armazena o vídeo exibido
    setDisplayedVideos((prev) => [...prev, videos[currentVideoIndex]]);

    // Vai para o próximo vídeo na lista
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else if (nextPageToken) {
      console.log("Carregando mais vídeos...");
      fetchVideos(nextPageToken); // Busca mais vídeos se a lista atual acabar
      setCurrentVideoIndex((prevIndex) => prevIndex + 1); // Atualiza o índice
    } else {
      alert("Não há mais vídeos disponíveis no momento.");
    }
  };

  return (
    <div className={styles.container}>
      {videos.length > 0 ? (
        <div className={styles.containerVideo}>
          <iframe className={styles.video}
            width="560"
            height="315"
            src={videos[currentVideoIndex]}
            title="Vídeo em Espanhol"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            onError={handleVideoError} // Adiciona um evento para lidar com erros
          ></iframe>
          <div>
            <button onClick={() => handleRating("like")}>👍 Like</button>
            <button onClick={() => handleRating("dislike")}>👎 Dislike</button>
          </div>
        </div>
      ) : (
        <p>Carregando vídeos...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
