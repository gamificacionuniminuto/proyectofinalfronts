import React, { useState, useEffect, useRef } from 'react';
import './Contar50.css';

const totalNumeros = 50;
const numerosPorFila = 10;

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

  return (
    <div className="contenedor-principal">
      <h1 className="titulo-juego">Cuenta hasta 50 con el conejito 🐰</h1>
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
          Regresar
        </button>
      </div>

      {mensaje && <div className="mensaje-juego">{mensaje}</div>}
    </div>
  );
};

export default CuentaHasta50;




