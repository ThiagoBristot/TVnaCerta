import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const streamUrl = 'http://localhost:5000/api';

const VideoPlayer = ({ streamUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = streamUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }
  }, [streamUrl]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default VideoPlayer;
