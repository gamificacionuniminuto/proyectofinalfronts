import React, { useState } from 'react';
import logoConejo from '../Home/logosinfondo.png'; // Ajusta la ruta si es necesario

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombreEstudiante: '',
    nombreAcudiente: '',
    correo: ''
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3001/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Error al registrar los datos');

      setRegistroExitoso(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Quicksand', sans-serif",
      padding: '1rem',
    
    }}>
      <div style={{
        margin: '10% auto',
        width: '100%',
        maxWidth: '600px',
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '20px',
        textAlign: 'center',
        border: '3px solid #90caf9',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <img
          src={logoConejo}
          alt="Logo AprendeKids"
          style={{ width: '190px', marginBottom: '1rem' }}
        />
        <h1 style={{ color: '#1565c0', marginBottom: '1.5rem' }}>Datos comprobante de pago  AprendeKids</h1>

        {registroExitoso ? (
          <div>
            <h2 style={{ color: '#43a047', marginBottom: '0.5rem' }}>¡Envio exitoso!</h2>
            <p>Envio exitoso 🎉</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              textAlign: 'left',
              fontWeight: '500'
            }}>
              Nombre del estudiante
            </label>
            <input
              type="text"
              name="nombreEstudiante"
              required
              value={formData.nombreEstudiante}
              onChange={handleChange}
              style={{
                padding: '0.8rem',
                marginBottom: '1rem',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />

            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              textAlign: 'left',
              fontWeight: '500'
            }}>
              Nombre del acudiente
            </label>
            <input
              type="text"
              name="nombreAcudiente"
              required
              value={formData.nombreAcudiente}
              onChange={handleChange}
              style={{
                padding: '0.8rem',
                marginBottom: '1rem',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />

            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              textAlign: 'left',
              fontWeight: '500'
            }}>
              Correo electrónico
            </label>
            <input
              type="email"
              name="correo"
              required
              value={formData.correo}
              onChange={handleChange}
              style={{
                padding: '0.8rem',
                marginBottom: '1.5rem',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '1rem'
              }}
            />

            <button
              type="submit"
              disabled={enviando}
              style={{
                background: '#1e88e5',
                color: '#fff',
                padding: '0.9rem 2rem',
                fontSize: '1rem',
                borderRadius: '10px',
                border: 'none',
                cursor: enviando ? 'not-allowed' : 'pointer',
                opacity: enviando ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {enviando ? 'Enviando...' : 'Enviar comprobante de pago'}
            </button>

            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistroPage;
