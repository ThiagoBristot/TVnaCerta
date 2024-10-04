export default async function handler(req, res) {
    const { channelUrl } = req.query;
  
    if (!channelUrl) {
      return res.status(400).json({ error: 'A URL do canal é obrigatória' });
    }
  
    try {
      const response = await fetch(channelUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.apple.mpegurl', // Tipo de conteúdo HLS (M3U8)
        },
      });
  
      if (!response.ok) {
        return res.status(response.status).json({ error: `Falha ao buscar conteúdo do canal: ${channelUrl}` });
      }
  
      // Retorna o conteúdo M3U8 (playlist de vídeo ao vivo)
      const streamData = await response.text();
      return res.status(200).send(streamData);
    } catch (error) {
      console.error('Erro ao buscar o canal:', error);
      return res.status(500).json({ error: 'Erro ao processar a requisição.' });
    }
  }
  