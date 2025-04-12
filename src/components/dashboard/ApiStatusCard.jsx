import React from 'react';
import StatusIndicator from '../common/StatusIndicator';

const ApiStatusCard = ({ endpoint }) => {
  const latest = endpoint.monitoring_results[0] || {};
  const statusText =
    latest.status === 'good'
      ? `${endpoint.url} is working fine`
      : latest.status === 'slow'
      ? `${endpoint.url} is slow`
      : `${endpoint.url} is down`;

  return (
    <div className="api-status-card">
      <StatusIndicator status={latest.status} />
      <p>{statusText}</p>
    </div>
  );
};

export default ApiStatusCard;