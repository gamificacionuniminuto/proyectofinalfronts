import React, { useState } from 'react';
import '../singin/singin.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SingIn = () => {
  const [email, setEmail] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/olvide-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email}),
      });    
      const data = await response.json();         
      if (response.ok) {  
        Swal.fire({
          title: '¡Éxito!',
          text: 'Te enviamos un código de verificación a tu correo electrónico',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,  
        }).then(() => {
          navigate('/newPassword');  
        });
      } else {
        setError(data.message || 'No se pudo actualizar la contraseña. Verifica los campos ingresados.');
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
      <h2>Recupera tu cuenta</h2>

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
               <button type="submit" className="login-button">
          Cambiar Contraseña
        </button>
      </form>      
    </div>
  );
};

export default SingIn;
