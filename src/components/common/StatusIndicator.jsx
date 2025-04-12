import React from 'react';

const StatusIndicator = ({ status }) => {
  const color =
    status === 'good' ? 'green' : status === 'slow' ? 'yellow' : 'red';

  return <span style={{ color, fontSize: '20px' }}>●</span>;
};

export default StatusIndicator;