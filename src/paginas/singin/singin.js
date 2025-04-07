import React, { useState } from 'react';
import './singin.css';
import { useNavigate } from 'react-router-dom';

const SingIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        // Redirigir al home
        navigate('/home');
      } else {
        setError(data.message || 'Correo electrónico o contraseña incorrectos');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al conectar con el servidor');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="singin-container">
      <h2>Iniciar Sesión</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>

      <div className="register-link">
        ¿Aún no tienes cuenta?{' '}
        <span onClick={() => navigate('/LoginRegister')}>Regístrate</span>
      </div>
    </div>
  );
};

export default SingIn;
