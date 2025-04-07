// src/components/Dashboard.js
import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Verifica si user existe y tiene la estructura esperada
  const userData = user?.id ? user : {
    id: user?.id || 'N/A',
    name: user?.name || 'Usuario',
    lastName: user?.lastName || '',
    email: user?.email || 'No especificado',
    rol: user?.rol || 'user'
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Bienvenido, {userData.name} {userData.lastName}</h1>
        <button onClick={logout} className="btn btn-danger">
          Cerrar Sesión
        </button>
      </header>

      <div className="user-profile">
        <h2>Tu perfil</h2>
        <div className="profile-info">
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Rol:</strong> {userData.rol}</p>
          {userData.parent && <p><strong>Padre/Tutor:</strong> {userData.parent}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;