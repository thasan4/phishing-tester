import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { jwtDecode } from 'jwt-decode';

interface PrivateRouteProps {
  element: React.ReactElement;
}
interface JWTPayload {
  exp: number;
  [key: string]: unknown;
}

const isTokenValid = (token: string): boolean => {
  try {
    const payload = jwtDecode<JWTPayload>(token);
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem('accessToken');
  if(!accessToken || !isTokenValid(accessToken)) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute element={<Dashboard />} />} 
        />
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;