import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApiProvider } from './context/ApiContext';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Router>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;