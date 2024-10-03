import React, { useState, useEffect } from 'react';
import ChannelItem from './ChannelItem';

const ChannelList = ({ onChannelSelect }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await fetch('https://raw.githubusercontent.com/helenfernanda/gratis/main/iptvlegal.m3u');
      const text = await response.text();
      const parsedChannels = parseM3U(text);
      setChannels(parsedChannels);
    };

    fetchChannels();
  }, []);

  const parseM3U = (data) => {
    const lines = data.split('\n');
    const channels = [];
    let channel = {};

    lines.forEach(line => {
      if (line.startsWith('#EXTINF')) {
        const nameMatch = line.match(/,(.+)/);
        if (nameMatch) channel.name = nameMatch[1];

        const logoMatch = line.match(/tvg-logo="(.+?)"/);
        if (logoMatch) channel.logo = logoMatch[1];
      } else if (line && !line.startsWith('#')) {
        channel.url = line.trim();
        channels.push(channel);
        channel = {}; // Reset for next channel
      }
    });

    return channels;
  };

  return (
    <div>
      <h3>Lista de Canais</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {channels.map((channel, index) => (
          <ChannelItem key={index} channel={channel} onChannelSelect={onChannelSelect} />
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
