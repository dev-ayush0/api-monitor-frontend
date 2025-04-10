import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function App() {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: endpoints, error } = await supabase
        .from('api_endpoints')
        .select('id, url, monitoring_results(status, response_time).limit(1)');
      if (!error) setEndpoints(endpoints);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Monitor</h1>
      {endpoints.map((ep) => {
        const latest = ep.monitoring_results[0] || {};
        const statusText =
          latest.status === 'good'
            ? `${ep.url} is working fine`
            : latest.status === 'slow'
            ? `${ep.url} is slow`
            : `${ep.url} is down`;
        const color =
          latest.status === 'good' ? 'green' : latest.status === 'slow' ? 'yellow' : 'red';

        return (
          <div key={ep.id}>
            <span style={{ color, marginRight: '10px' }}>●</span>
            {statusText}
          </div>
        );
      })}
    </div>
  );
}

export default App;