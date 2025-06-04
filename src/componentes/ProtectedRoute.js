// ProtectedRoute.js
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario, redirigir a la página de login
    return <Navigate to="/perfil
    " replace />;
  }

  return children;
};

export default ProtectedRoute;