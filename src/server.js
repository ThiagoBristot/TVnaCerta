const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para permitir CORS
app.use(cors({
  origin: '*',
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type, x-csrf-token',
  credentials: true,
}));

// Middleware para servir arquivos estáticos do React (gerados na pasta build)
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint para obter canais via backend
app.get('/api/channels', async (req, res) => {
  try {
    const { data } = await axios.get('https://iptv-org.github.io/api/channels.json');
    const filteredChannels = data.map(channel => ({
      id: channel.id,
      name: channel.name,
      url: channel.website,
      logo: channel.logo,
    }));

    res.json(filteredChannels);  // Envia resposta ao frontend
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).send('Error fetching channels');
  }
});

// Rota principal - Serve o React App para todas as rotas não-API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
