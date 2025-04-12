import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import ForgotPassword from '../components/auth/ForgotPassword';

const Auth = () => {
  return (
    <div className="auth-page">
      <Routes>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

export default Auth;