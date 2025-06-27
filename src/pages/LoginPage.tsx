
import React, { useState } from 'react';
import Login from '@/components/Login';
import MikroTikDashboard from './MikroTikDashboard';

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Aquí se haría la validación real con el backend
    // Por ahora aceptamos cualquier credencial
    if (username && password) {
      setIsAuthenticated(true);
      setUser(username);
    }
  };

  if (isAuthenticated) {
    return <MikroTikDashboard />;
  }

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
