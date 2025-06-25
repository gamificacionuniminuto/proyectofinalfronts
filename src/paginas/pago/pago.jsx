import React, { useState } from 'react';
import logoConejo from '../Home/logosinfondo.png'; // Asegúrate que el nombre y ruta coincidan

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/crear-orden', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Error al crear la orden de pago');

      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No se recibió una URL de pago válida');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error en el pago:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getResponsiveStyles = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      return {
        container: { padding: '1rem' },
        card: { width: '95%', padding: '1.5rem' },
        title: { fontSize: '1.7rem' },
        price: { fontSize: '1.2rem' },
        description: { fontSize: '1rem' },
        button: { fontSize: '1rem', padding: '0.8rem 1.6rem' },
        error: { fontSize: '0.9rem' }
      };
    }

    if (screenWidth < 1024) {
      return {
        card: { width: '90%', padding: '2rem' },
        title: { fontSize: '2.2rem' },
        price: { fontSize: '1.4rem' },
        description: { fontSize: '1.1rem' },
        button: { fontSize: '1.1rem', padding: '1rem 2rem' },
        error: { fontSize: '1rem' }
      };
    }

    return {
      card: { width: '700px', padding: '2.5rem' },
      title: { fontSize: '2.4rem' },
      price: { fontSize: '1.5rem' },
      description: { fontSize: '1.1rem' },
      button: { fontSize: '1.1rem', padding: '1rem 2rem' },
      error: { fontSize: '1rem' }
    };
  };

  const responsive = getResponsiveStyles();

  const baseStyles = {
    container: {
      minHeight: '130vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Quicksand', sans-serif",
      padding: responsive.container?.padding || '0'
    },
    card: {
      background: '#ffffff',
      borderRadius: '25px',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease',
      border: '3px solid #90caf9',
      ...responsive.card
    },
    image: {
      width: '190px',
      height: '190px',
      objectFit: 'contain',
      marginBottom: '1rem'
    },
    title: {
      color: '#1565c0',
      marginBottom: '1rem',
      fontWeight: '700',
      ...responsive.title
    },
    price: {
      marginBottom: '1rem',
      color: '#42a5f5',
      fontWeight: '600',
      ...responsive.price
    },
    description: {
      marginBottom: '2rem',
      color: '#555',
      lineHeight: '1.6',
      ...responsive.description
    },
    button: {
      background: '#42a5f5',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ...responsive.button,
      ...(isLoading && { opacity: 0.6, cursor: 'not-allowed' })
    },
    error: {
      color: '#d32f2f',
      marginTop: '1rem',
      ...responsive.error
    },
    loading: {
      marginTop: '1rem',
      color: '#1976d2'
    }
  };

  return (
    <div style={baseStyles.container}>
      <div
        style={baseStyles.card}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img src={logoConejo} alt="Logo AprendeKids" style={baseStyles.image} />
        <h1 style={baseStyles.title}>Curso Premium AprendeKids</h1>
        <p style={baseStyles.price}>🎓 Solo $35.000 COP</p>

        <p style={baseStyles.description}>
          🌟 Accede a todos los niveles de matemáticas<br />
          🧠 Juegos con inteligencia artificial<br />
          🎮 Avances gamificados con premios<br />
          👨‍👩‍👧 Seguimiento de progreso para padres<br />
          🐰 ¡Aprender jugando es posible con AprendeKids!
        </p>

        <button
          style={baseStyles.button}
          onMouseOver={(e) => !isLoading && (e.target.style.background = '#1e88e5')}
          onMouseOut={(e) => !isLoading && (e.target.style.background = '#42a5f5')}
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? 'Procesando...' : 'Pagar Ahora'}
        </button>

        {isLoading && <p style={baseStyles.loading}>Cargando...</p>}
        {error && <p style={baseStyles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
