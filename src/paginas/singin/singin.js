import React, { useState } from 'react';
import './singin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:3006/api/login', {
        email,
        password,
      });

      const data = response.data; // Axios devuelve la respuesta en 'data'

      if (data.status === 'success') {
        // Guardar token y datos del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.location.reload(true);

        // Redirigir al perfil
        navigate('/perfil');
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
  <div className="signin-page">
  <div className="signin-container">
    <h2>Iniciar Sesión</h2>

    {error && <div className="signin-error">{error}</div>}

    <form className="signin-form" onSubmit={handleSubmit}>
      <div className="signin-form-group">
        <label className="signin-form-label" htmlFor="email">Correo Electrónico:</label>
        <input
          className="signin-form-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="signin-form-group">
        <label className="signin-form-label" htmlFor="password">Contraseña:</label>
        <input
          className="signin-form-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="signin-button">Iniciar Sesión</button>
    </form>

    <div className="signin-register-link">
      ¿Aún no tienes cuenta?{' '}
      <span onClick={() => navigate('/Login')}>Regístrate</span>
    </div>

    <div className="signin-forgot-password">
      ¿Olvidaste tu contraseña?{' '}
      <span onClick={() => navigate('/forgotPassword')}>Recuperar</span>
    </div>
  </div>
</div>

  );
};

export default SingIn;
