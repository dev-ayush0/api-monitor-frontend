import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function App() {
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState('');
  const [notifyTo, setNotifyTo] = useState('');
  const [notifyType, setNotifyType] = useState('sms');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleAddEndpoint = async () => {
    const { error } = await supabase.from('api_endpoints').insert({
      url,
      notify_to: notifyTo,
      notify_type: notifyType,
      user_id: user.id,
    });
    if (error) alert(error.message);
    else {
      alert('Endpoint added!');
      setUrl('');
      setNotifyTo('');
    }
  };

  if (!user) return <div>Please log in (add login form here)</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Monitor</h1>
      <input
        type="text"
        placeholder="API URL (e.g., https://api.stripe.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notify to (e.g., +1234567890)"
        value={notifyTo}
        onChange={(e) => setNotifyTo(e.target.value)}
      />
      <select value={notifyType} onChange={(e) => setNotifyType(e.target.value)}>
        <option value="sms">SMS</option>
        <option value="email">Email</option>
      </select>
      <button onClick={handleAddEndpoint}>Add Endpoint</button>
    </div>
  );
}

export default App;