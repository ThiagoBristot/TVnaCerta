// api/channels.js

const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://iptv-org.github.io/api/channels.json');
    const channels = response.data;

    // Filtrar os canais brasileiros, como Animal Planet e SportTV
    const brazilianChannels = channels.filter(channel => 
      channel.name.toLowerCase().includes('brasil') ||
      channel.name.toLowerCase().includes('animal planet') ||
      channel.name.toLowerCase().includes('sporttv')
    );

    res.status(200).json(brazilianChannels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Error fetching channels' });
  }
}
