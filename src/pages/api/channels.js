export default async function handler(req, res) {
  try {
    const response = await fetch('https://iptv-org.github.io/api/channels.json');
    
    // Verificando se a resposta está OK
    if (!response.ok) {
      throw new Error(`Failed to fetch channels: ${response.status}`);
    }

    const channels = await response.json();

    // Filtrar para retornar apenas nome, URL e logo
    const filteredChannels = channels.map(channel => ({
      name: channel.name,
      website: channel.website,
      logo: channel.logo
    }));

    res.status(200).json(filteredChannels); // Enviar apenas os campos filtrados
  } catch (error) {
    console.error('Error fetching channels:', error.message);
    res.status(500).json({ error: 'Error fetching channels' });
  }
}
