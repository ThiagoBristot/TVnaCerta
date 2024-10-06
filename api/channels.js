const axios = require('axios');

export default async function handler(req, res) {
  console.log("API function called");  // Adicionando log para verificar a chamada

  try {
    const response = await axios.get('https://iptv-org.github.io/api/channels.json');
    const channels = response.data;

    // Log para ver a resposta dos canais
    console.log('Channels fetched:', channels);

    res.status(200).json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Error fetching channels' });
  }
}
