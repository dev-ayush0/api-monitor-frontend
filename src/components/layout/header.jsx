import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="header">
      <h1>API Monitor</h1>
      <nav>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/settings">Settings</Link>
            <Button onClick={signOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Link to="/auth/signin">Sign In</Link>
            <Link to="/auth/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;