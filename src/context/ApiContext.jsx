import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const { user } = useAuth();
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchEndpoints = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('api_endpoints')
        .select('id, url, monitoring_results(status, response_time).limit(1)')
        .eq('user_id', user.id);

      if (!error) setEndpoints(data || []);
      setLoading(false);
    };

    fetchEndpoints();
  }, [user]);

  const addEndpoint = async (url) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('api_endpoints')
      .insert({ url, user_id: user.id })
      .select()
      .single();

    if (!error) setEndpoints([...endpoints, data]);
  };

  const value = { endpoints, loading, addEndpoint };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};