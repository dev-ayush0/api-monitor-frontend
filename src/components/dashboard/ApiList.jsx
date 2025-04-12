import React from 'react';
import { useApi } from '../../hooks/useApi';
import ApiStatusCard from './ApiStatusCard';

const ApiList = () => {
  const { endpoints, loading } = useApi();

  if (loading) return <p>Loading...</p>;
  if (!endpoints.length) return <p>No APIs added yet.</p>;

  return (
    <div className="api-list">
      {endpoints.map((endpoint) => (
        <ApiStatusCard key={endpoint.id} endpoint={endpoint} />
      ))}
    </div>
  );
};

export default ApiList;