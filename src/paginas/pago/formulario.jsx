import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PagoExitoso = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [premiumData, setPremiumData] = useState(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // 1. Obtener el usuario del localStorage
        const localUser = JSON.parse(localStorage.getItem('user'));
        if (!localUser?.id) {
          throw new Error('No se encontró información del usuario');
        }

        // 2. Llamar al endpoint para actualizar el pago
        const response = await axios.put('http://localhost:3001/api/pago', {
          userId: localUser.id
        });

        // 3. Guardar los datos de la respuesta
        setPremiumData({
          isPremium: response.data.user.isPremium,
          expiration: response.data.user.premiumExpiration
        });

        // 4. Actualizar el localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

      } catch (err) {
        console.error('Error al procesar el pago:', err);
        setError(err.message || 'Error al procesar el pago');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, []);

  // Redirección automática después de 5 segundos
  useEffect(() => {
    if (!loading && !error) {
      const timer = setTimeout(() => {
        navigate('/perfil');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, error, navigate]);

  if (loading) {
    return (
      <div className="payment-status">
        <h2>Procesando tu pago...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-status error">
        <h2>Error en el pago</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/pago')}>
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="payment-success">
      <h1>¡Pago Exitoso! 🎉</h1>
      <p>Tu suscripción premium ha sido activada correctamente.</p>
      
      {premiumData?.expiration && (
        <>
          <p>
            Tu membresía premium es válida hasta: {' '}
            {new Date(premiumData.expiration).toLocaleDateString()}
          </p>
          <p>Serás redirigido automáticamente en 5 segundos...</p>
        </>
      )}

      <button onClick={() => navigate('/perfil')}>
        Ir a mi perfil ahora
      </button>
    </div>
  );
};

export default PagoExitoso;