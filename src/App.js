import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import './App.css';

const App = () => {
  const [channels, setChannels] = useState([]); // Armazena os canais
  const [selectedChannel, setSelectedChannel] = useState(null); // Armazena o canal selecionado (nome, url, ícone, descrição)
  const [source, setSource] = useState('helenfernanda'); // Armazena a fonte dos canais
  const [searchTerm, setSearchTerm] = useState(''); // Armazena o termo de pesquisa

  // Função para carregar a lista de canais de uma URL específica
  const fetchChannelsFromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const parsedChannels = [];
      const lines = data.split('\n');

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
          const name = lines[i].split(',')[1]?.trim() || `Canal ${i}`;
          const url = lines[i + 1]?.trim();
          const iconUrl = `https://via.placeholder.com/50x50?text=${name}`;

          if (url && url.includes('.m3u8')) {
            parsedChannels.push({ name, url, iconUrl });
          }
        }
      }
      return parsedChannels;
    } catch (error) {
      console.error('Error fetching channels:', error);
      return [];
    }
  };

  // Função principal para carregar os canais com base na fonte selecionada
  const fetchChannels = async () => {
    try {
      let parsedChannels = [];
      if (source === 'helenfernanda') {
        parsedChannels = await fetchChannelsFromUrl('https://raw.githubusercontent.com/helenfernanda/gratis/main/iptvlegal.m3u');
      }

      setChannels(parsedChannels);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  // Carrega a lista de canais ao iniciar o componente ou quando a fonte é alterada
  useEffect(() => {
    fetchChannels();
  }, [source]); // Recarrega quando a 'source' mudar

  // Função para logar quando o canal é selecionado
  const handleChannelSelect = async (channel) => {
    try {
      const response = await fetch(`/api/fetchChannel?channelUrl=${encodeURIComponent(channel.url)}`);
      const streamData = await response.text();

      setSelectedChannel({ ...channel, streamData });
    } catch (error) {
      console.error('Erro ao carregar o canal:', error);
    }
  };

  // Função para alternar a fonte dos canais
  const toggleSource = () => {
    setSource((prevSource) => (prevSource === 'helenfernanda' ? 'mimipipi22' : 'helenfernanda'));
  };

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtra os canais com base no termo de pesquisa
  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="titulo_header">TvnaCerta</h1>
      </header>

      <div className="content">
        <div className="listacanais">
          <h2 className="nomelista">Lista de Canais</h2>

          {/* Barra de pesquisa */}
          <input
            type="text"
            placeholder="Buscar canal..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />

          <ul>
            {filteredChannels.length === 0 && <p>Carregando canais...</p>}
            {filteredChannels.map((channel, index) => (
              <li key={index} onClick={() => handleChannelSelect(channel)}>
                {channel.name}
              </li>
            ))}
          </ul>
        </div>

          <div className="video-container">
            {selectedChannel ? (
              <div className="video-content">
                <VideoPlayer streamUrl={selectedChannel.url} />
                <div className="video-descricao">
                  <img src={selectedChannel.iconUrl} alt={selectedChannel.name} className="channel-icon" />
                  <div>
                    <p><strong>{selectedChannel.name}</strong></p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1>TVnaCerta</h1>
                <p>Selecione um canal para reproduzir</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default App;
