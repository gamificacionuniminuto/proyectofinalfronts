// src/componentes/PublicRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../componentes/AuthContext';

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/perfil" /> : children;
}

export default PublicRoute;
