import React, { useState } from 'react';

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Llamar a tu API para crear la orden (sin enviar body)
      const response = await fetch('http://localhost:3001/api/crear-orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden de pago');
      }

      const data = await response.json();
      
      // Verificar que la respuesta contiene una URL
      if (data.url) {
        // Abrir la URL de pago en una nueva pestaña
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

  // Estilos responsivos (igual que en tu código original)
  const getResponsiveStyles = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
      return {
        container: { padding: '1rem' },
        card: { width: '100%', padding: '1.5rem' },
        title: { fontSize: '1.5rem' },
        price: { fontSize: '1.2rem' },
        button: { fontSize: '1rem', padding: '0.7rem 1.5rem' },
        error: { fontSize: '0.9rem' }
      };
    }

    if (screenWidth < 1024) {
      return {
        card: { width: '80%', padding: '2rem' },
        title: { fontSize: '2rem' },
        price: { fontSize: '1.4rem' },
        button: { fontSize: '1.1rem', padding: '0.9rem 2rem' },
        error: { fontSize: '1rem' }
      };
    }

    return {
      card: { width: '400px', padding: '2rem' },
      title: { fontSize: '2rem' },
      price: { fontSize: '1.5rem' },
      button: { fontSize: '1rem', padding: '0.8rem 2rem' },
      error: { fontSize: '1rem' }
    };
  };

  const responsive = getResponsiveStyles();

  const baseStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: responsive.container?.padding || '0',
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      ...responsive.card
    },
    title: {
      color: '#333',
      marginBottom: '1rem',
      ...responsive.title
    },
    price: {
      marginBottom: '1.5rem',
      color: '#1e88e5',
      ...responsive.price
    },
    button: {
      background: '#1e88e5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.3s',
      ...responsive.button,
      ...(isLoading && { opacity: 0.7, cursor: 'not-allowed' })
    },
    error: {
      color: '#d32f2f',
      marginTop: '1rem',
      ...responsive.error
    },
    loading: {
      marginTop: '1rem',
      color: '#1e88e5'
    }
  };

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.card}>
        <h1 style={baseStyles.title}>Pago del Curso AprendeKids</h1>
        <p style={baseStyles.price}>$35.000 COP</p>
        <button
          style={baseStyles.button}
          onMouseOver={(e) => !isLoading && (e.target.style.background = '#1565c0')}
          onMouseOut={(e) => !isLoading && (e.target.style.background = '#1e88e5')}
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