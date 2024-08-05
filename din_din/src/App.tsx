import { useState, useEffect } from 'react';
import { AppRoutes } from './routes';
import { getItem, setItem, removeItem } from './localStorage/localStorage';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return getItem('token') !== null;
  });

  useEffect(() => {
    if (isAuthenticated) {
      const token = getItem('token');
      if (token) {
        setItem('token', token);
      }
    } else {
      removeItem('token');
    }
  }, [isAuthenticated]);

  return (
    <AppRoutes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
  );
}