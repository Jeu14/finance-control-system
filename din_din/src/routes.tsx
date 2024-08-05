import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { Home } from './pages/Home/Home';
import { ProtectedRoute } from './ProtectedRoute';
import {AppRoutesProps} from './Types/types'



export function AppRoutes({ isAuthenticated, setIsAuthenticated }: Readonly<AppRoutesProps>) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}