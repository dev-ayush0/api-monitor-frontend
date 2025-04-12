import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for auth
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

// API endpoints management
export const fetchApiEndpoints = async () => {
  const { data, error } = await supabase
    .from('api_endpoints')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const addApiEndpoint = async (endpoint) => {
  const { data, error } = await supabase
    .from('api_endpoints')
    .insert([endpoint])
    .select();
  return { data, error };
};

export const updateApiEndpoint = async (id, updates) => {
  const { data, error } = await supabase
    .from('api_endpoints')
    .update(updates)
    .eq('id', id)
    .select();
  return { data, error };
};

export const deleteApiEndpoint = async (id) => {
  const { error } = await supabase
    .from('api_endpoints')
    .delete()
    .eq('id', id);
  return { error };
};

// Notification preferences
export const fetchNotificationSettings = async () => {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .single();
  return { data, error };
};

export const updateNotificationSettings = async (settings) => {
  const { data, error } = await supabase
    .from('notification_settings')
    .upsert(settings)
    .select();
  return { data, error };
};