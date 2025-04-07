// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    loading: true
  });
  const navigate = useNavigate();

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar el token JWT para obtener información básica
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAuthState({
          user: payload, // Usamos los datos del payload del token
          token,
          loading: false
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        setAuthState({
          user: null,
          token: null,
          loading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', credentials);
      console.log(response)
      
      localStorage.setItem('token', response.data.token);
      
      setAuthState({
        user: response.data.data.user, // Usamos los datos del usuario de la respuesta
        token: response.data.token,
        loading: false
      });

      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Credenciales incorrectas'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      token: null,
      loading: false
    });
    navigate('/login');
  };

  const value = {
    ...authState,
    isAuthenticated: !!authState.token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!authState.loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};