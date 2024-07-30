import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login';

export function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}