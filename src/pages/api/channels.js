const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://iptv-org.github.io/api/channels.json');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching channels:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
};
