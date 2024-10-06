export default async function handler(req, res) {
  try {
    // Usando fetch ao invés de axios
    const response = await fetch('https://iptv-org.github.io/api/channels.json');

    // Verificando se a resposta está OK
    if (!response.ok) {
      throw new Error(`Failed to fetch channels: ${response.status}`);
    }

    const channels = await response.json(); // Parseando a resposta como JSON

    res.status(200).json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error.message);
    res.status(500).json({ error: 'Error fetching channels' });
  }
}
