// src/componentes/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../componentes/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/singin" />;
}

export default ProtectedRoute;
