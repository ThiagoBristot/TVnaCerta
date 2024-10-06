import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import './App.css';

const App = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para carregar os canais do backend
  const fetchChannels = async () => {
  try {
    const response = await fetch('/api/channels');
    const text = await response.text();
    
    console.log('Response from API:', text);  // Adicionar log para inspecionar a resposta

    const data = JSON.parse(text); 
    setChannels(data);
  } catch (error) {
    console.error('Error fetching channels:', error);
  }
};

  useEffect(() => {
    fetchChannels();
  }, []);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>TvnaCerta</h1>
      </header>
      <div className="content">
        <div className="listacanais">
          <input
            type="text"
            placeholder="Buscar canal..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <ul>
            {filteredChannels.map((channel, index) => (
              <li key={index} onClick={() => handleChannelSelect(channel)}>
                {channel.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="video-container">
          {selectedChannel ? (
            <div>
              <VideoPlayer streamUrl={selectedChannel.url} />
              <div>
                <img
                  src={selectedChannel.logo}
                  alt={selectedChannel.name}
                  className="channel-logo"
                />
                <p>{selectedChannel.name}</p>
              </div>
            </div>
          ) : (
            <p>Selecione um canal para reproduzir</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
