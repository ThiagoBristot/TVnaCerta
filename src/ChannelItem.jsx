import React from 'react';

const ChannelItem = ({ channel, onChannelSelect }) => {
  return (
    <li onClick={() => onChannelSelect(channel.url)} style={{ margin: '10px 0', cursor: 'pointer' }}>
      {channel.logo && <img src={channel.logo} alt={channel.name} style={{ width: '15%', marginRight: '10px' }} />}
      <span>{channel.name}</span>
    </li>
  );
};

export default ChannelItem;
