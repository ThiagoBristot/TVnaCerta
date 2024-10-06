// api/channels.js

const axios = require('axios');

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://iptv-org.github.io/api/channels.json');
    const channels = response.data;
    
    res.status(200).json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ error: 'Error fetching channels' });
  }
}
