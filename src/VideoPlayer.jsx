import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ streamUrl }) => {
  console.log('Stream URL:', streamUrl); // Adicione isso para depuração

  if (!streamUrl) {
    return <p>Nenhuma URL de vídeo fornecida</p>;
  }

  return (
    <div className="video-player">
      <ReactPlayer
        url={streamUrl}
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer