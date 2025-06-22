import React from 'react';

const PaymentPage = () => {
  const handlePayment = () => {
    window.location.href = "https://checkout.wompi.co/p/?public-key=pub_test_1234567890&currency=COP&amount-in-cents=3500000&reference=curso-123&redirect-url=https://tusitio.com/gracias";
  };

  // Estilos responsivos básicos usando JavaScript
  const getResponsiveStyles = () => {
    const screenWidth = window.innerWidth;

    // Ajustes para móviles
    if (screenWidth < 600) {
      return {
        container: {
          padding: '1rem',
        },
        card: {
          width: '100%',
          padding: '1.5rem',
        },
        title: {
          fontSize: '1.5rem',
        },
        price: {
          fontSize: '1.2rem',
        },
        button: {
          fontSize: '1rem',
          padding: '0.7rem 1.5rem',
        }
      };
    }

    // Ajustes para tablets
    if (screenWidth < 1024) {
      return {
        card: {
          width: '80%',
          padding: '2rem',
        },
        title: {
          fontSize: '2rem',
        },
        price: {
          fontSize: '1.4rem',
        },
        button: {
          fontSize: '1.1rem',
          padding: '0.9rem 2rem',
        }
      };
    }

    // Por defecto para pantallas grandes
    return {
      card: {
        width: '400px',
        padding: '2rem',
      },
      title: {
        fontSize: '2rem',
      },
      price: {
        fontSize: '1.5rem',
      },
      button: {
        fontSize: '1rem',
        padding: '0.8rem 2rem',
      }
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
      ...responsive.button
    }
  };

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.card}>
        <h1 style={baseStyles.title}>Pago del Curso AprendeKids</h1>
        <p style={baseStyles.price}>$35.000 COP</p>
        <button
          style={baseStyles.button}
          onMouseOver={(e) => e.target.style.background = '#1565c0'}
          onMouseOut={(e) => e.target.style.background = '#1e88e5'}
          onClick={handlePayment}
        >
          Pagar Ahora
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
