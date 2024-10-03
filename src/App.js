import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import './App.css';

const App = () => {
  const [channels, setChannels] = useState([]); // Armazena os canais
  const [selectedChannel, setSelectedChannel] = useState(null); // Armazena o canal selecionado (nome, url, ícone, descrição)
  const [source, setSource] = useState('helenfernanda'); // Armazena a fonte dos canais

  // Função para buscar os canais de um arquivo .m3u8 específico
  const fetchChannelsFromUrl = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const parsedChannels = [];
      const lines = data.split('\n');

      // Processar cada linha do arquivo .m3u8
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF')) {
          const name = lines[i].split(',')[1]?.trim() || `Canal ${i}`;
          const url = lines[i + 1]?.trim();

          // Adicionando ícone e descrição fictícia
          const iconUrl = `https://via.placeholder.com/50x50?text=${name}`; // Ícone fictício
          const description = `Descrição breve sobre o canal ${name}.`; // Descrição fictícia

          // Verifica se a URL contém ".m3u8"
          if (url && url.includes('.m3u8')) {
            parsedChannels.push({ name, url, iconUrl, description });
          }
        }
      }

      return parsedChannels;
    } catch (error) {
      console.error('Error fetching channels from URL:', error);
      return [];
    }
  };

  // Função para buscar canais de múltiplos arquivos do GitHub
  const fetchChannelsFromGithub = async () => {
    const baseUrl = 'https://raw.githubusercontent.com/mimipipi22/inspirationlinks/live/Streams/';
    
    // Lista dos arquivos .m3u8 que você deseja ler
    const files = ['AniPlanet.m3u8', 'Disc.m3u8', 'PaPremiere.m3u8', 'Dmax.m3u8']; // Adicione os nomes dos arquivos aqui
    let allChannels = [];

    for (const file of files) {
      const fileUrl = `${baseUrl}${file}`;
      console.log(`Fetching channels from: ${fileUrl}`);
      
      // Buscar e combinar canais de cada arquivo
      const channels = await fetchChannelsFromUrl(fileUrl);
      allChannels = [...allChannels, ...channels]; // Combinar com os canais anteriores
    }
    console.log(allChannels);
    return allChannels;
  };

  // Chamar a função de exemplo
  useEffect(() => {
    const loadGithubChannels = async () => {
      const githubChannels = await fetchChannelsFromGithub();
      setChannels(githubChannels);
    };

    loadGithubChannels();
  }, []);


  // Função principal para carregar os canais com base na fonte selecionada
  const fetchChannels = async () => {
    try {
      let parsedChannels = [];
      if (source === 'helenfernanda') {
        parsedChannels = await fetchChannelsFromUrl('https://raw.githubusercontent.com/helenfernanda/gratis/main/iptvlegal.m3u');
      } else if (source === 'mimipipi22') {
        parsedChannels = await fetchChannelsFromGithub();
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
  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  // Função para alternar a fonte dos canais
  const toggleSource = () => {
    setSource((prevSource) => (prevSource === 'helenfernanda' ? 'mimipipi22' : 'helenfernanda'));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="titulo_header">TvnaCerta</h1>
      </header>

      <div className="content">
        <div className="listacanais">
          <h2 className="nomelista">Lista de Canais</h2>
          <button onClick={toggleSource} className="toggle-source-btn">
            Trocar Fonte de Canais
          </button>
          <ul>
            {channels.length === 0 && <p>Carregando canais...</p>}
            {channels.map((channel, index) => (
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
