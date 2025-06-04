import React, { useState, useEffect, useRef } from 'react';
import './Contar50.css';
import axios from 'axios';
const { REACT_APP_API } = process.env;
const totalNumeros = 50;
const numerosPorFila = 10;

const enviarPuntaje = async () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        throw new Error('No se encontraron datos de usuario');
      }
      const userData = JSON.parse(userString);
      const userId = userData?.id;
      if (!userId) {
        throw new Error('ID de usuario no disponible');
      }

      const puntos = 1;

      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/users/${userId}/score`,
        { numberToAdd: puntos },
        {
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            'Content-Type': 'application/json',
            ...(localStorage.getItem('token') && {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
          }
        }
      );

      try {
        const updatedScore = (Number(userData.score) || 0) + puntos;
        const updatedUser = { ...userData, score: updatedScore };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Puntaje local actualizado a:', updatedScore);
      } catch (localStorageError) {
        console.warn('Error al actualizar localStorage:', localStorageError);
      }

      return response.data;
    } catch (error) {
      console.error('Error en enviarPuntaje:', {
        message: error.message,
        response: error.response?.data
      });
      throw error;
    }
  };

const CuentaHasta50 = () => {
  const [numeroActual, setNumeroActual] = useState(1);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const mensajeVoz = new SpeechSynthesisUtterance(numeroActual.toString());
      mensajeVoz.lang = 'es-ES';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(mensajeVoz);
    }
    setMensaje('');
    setRespuesta('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [numeroActual]);

  const verificarRespuesta = () => {
    const respNum = parseInt(respuesta, 10);
    if (isNaN(respNum)) {
      setMensaje('Por favor, ingresa un número válido.');
      return;
    }
    if (respNum === numeroActual) {
      enviarPuntaje();
      setMensaje('¡Correcto! 🎉');
      if (numeroActual < totalNumeros) {
        setTimeout(() => {
          setNumeroActual(numeroActual + 1);
        }, 1000);
      } else {
        setMensaje('¡Felicidades, completaste el juego! 🏆');
      }
    } else {
      setMensaje(`Oops, intenta de nuevo. El número correcto es ${numeroActual}.`);
      if ('speechSynthesis' in window) {
        const avisoVoz = new SpeechSynthesisUtterance(`Intenta de nuevo. El número correcto es ${numeroActual}`);
        avisoVoz.lang = 'es-ES';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(avisoVoz);
      }
      setRespuesta('');
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const regresarNumero = () => {
    if (numeroActual > 1) {
      setNumeroActual(numeroActual - 1);
    }
  };

  // Función para regresar a la página anterior
  const goBack = () => {
    window.location.href = '/Clases'; // Cambia la ruta según sea necesario
   
  };

  return (
   <div className="contenedor-principal">
     1<div style={{ textAlign: 'left', marginBottom: '10px' }}>
    <button className="boton-volver-pagina" onClick={goBack}>⬅ Regresar</button>
  </div>
  <h1 className="titulo-juego">Cuenta hasta 50 con el conejito 🐰</h1>

  {/* Botón de volver a la página anterior, bien posicionado */}
 

  <div className="contenedor-camino">
    {[...Array(totalNumeros)].map((_, i) => {
      const fila = Math.floor(i / numerosPorFila);
      const col = i % numerosPorFila;
      const esNumeroActual = numeroActual === i + 1;

      return (
        <div
          key={i}
          className={`numero ${esNumeroActual ? 'activo' : ''}`}
          style={{
            gridRowStart: fila + 1,
            gridColumnStart: col + 1,
          }}
        >
          {i + 1}
          {esNumeroActual && <span className="conejo">🐰</span>}
        </div>
      );
    })}
  </div>

  <div className="contenedor-respuesta-juego">
    <input
      ref={inputRef}
      type="number"
      value={respuesta}
      onChange={(e) => setRespuesta(e.target.value)}
      placeholder="Escribe el número donde está el conejo"
      className="campo-respuesta"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          verificarRespuesta();
        }
      }}
    />
    <button onClick={verificarRespuesta} className="boton-verificar" disabled={!respuesta}>
      Verificar
    </button>
    <button onClick={regresarNumero} className="boton-regresar" disabled={numeroActual === 1}>
      Regresa y cuenta en reversa
    </button>
  </div>

  {mensaje && <div className="mensaje-juego">{mensaje}</div>};
</div>
  );
}
export default CuentaHasta50;
