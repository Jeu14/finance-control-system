import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';

export function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </Router>
  );
}