import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;