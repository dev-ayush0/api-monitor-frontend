import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setMessage('Check your email for a password reset link.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Reset Password</Button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;