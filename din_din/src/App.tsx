import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { Home } from './pages/Home/Home';
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
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}