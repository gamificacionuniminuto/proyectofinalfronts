import React, { useState } from 'react';
import './../../paginas/login/LoginRegister.css'; // Asegúrate de crear este archivo CSS

const LoginRegister = () => {
  // Estados para el formulario de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Estados para el formulario de registro
  const [registerData, setRegisterData] = useState({
    guardian: '',
    name: '',
    lastName: '',
    age: '',
    grade: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });
  const [passwordError, setPasswordError] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Manejadores para el login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Validación básica - puedes agregar más lógica aquí
    if (loginPassword.length < 6) {
      setLoginError('Contraseña incorrecta');
      return;
    }
    setLoginError('');
    console.log('Iniciando sesión...', {
      loginEmail,
      loginPassword,
      rememberMe,
    });
    // Aquí iría la lógica para autenticar al usuario
  };

  // Manejadores para el registro
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar contraseñas coincidentes
    if (name === 'password' || name === 'confirmPassword') {
      if (registerData.password !== registerData.confirmPassword) {
        setPasswordError('Las contraseñas no coinciden');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    console.log('Registrando usuario...', registerData);
    // Aquí iría la lógica para registrar al usuario
  };

  const handleAvatarSelect = (avatar) => {
    setRegisterData((prev) => ({ ...prev, avatar }));
    setShowAvatarModal(false);
  };

  return (
    <div className="login-register-container">
      {/* Formulario de Login */}
      <div className="form-container">
        <h2>Inicio de Sesión</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
          <button type="button" className="google-btn">
            Iniciar Sesión con Google
          </button>
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Recuérdame</label>
          </div>
          {loginError && <span className="error-message">{loginError}</span>}
        </form>
      </div>

      {/* Formulario de Registro */}
      <div className="form-container">
        <h2>Registro de Nuevo Usuario</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            name="guardian"
            placeholder="Acudiente"
            value={registerData.guardian}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={registerData.name}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={registerData.lastName}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            value={registerData.age}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grado (opcional)"
            value={registerData.grade}
            onChange={handleRegisterChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            required
          />
          <button
            type="button"
            className="avatar-btn"
            onClick={() => setShowAvatarModal(true)}
          >
            Seleccionar Avatar
          </button>
          {registerData.avatar && (
            <span className="avatar-selected">Avatar seleccionado</span>
          )}
          {passwordError && (
            <span className="password-error">{passwordError}</span>
          )}
          <button type="submit">Registrarse</button>
        </form>
      </div>

      {/* Modal de selección de avatar */}
      {showAvatarModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-btn"
              onClick={() => setShowAvatarModal(false)}
            >
              &times;
            </span>
            <h2>Selecciona tu Avatar</h2>
            <div className="avatar-options">
              <img
                src="/avatars/avatar1.png"
                alt="Avatar 1"
                className="avatar-img"
                onClick={() => handleAvatarSelect('avatar1')}
              />
              <img
                src="/avatars/avatar2.png"
                alt="Avatar 2"
                className="avatar-img"
                onClick={() => handleAvatarSelect('avatar2')}
              />
              <img
                src="/avatars/avatar3.png"
                alt="Avatar 3"
                className="avatar-img"
                onClick={() => handleAvatarSelect('avatar3')}
              />
              {/* Agrega más avatares según sea necesario */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
