import React, { useState } from 'react';
import './JuegoFracciones.css';
import { useNavigate } from 'react-router-dom';

const fracciones = [
  { valor: '1/2', grados: 180 },
  { valor: '1/3', grados: 120 },
  { valor: '1/4', grados: 90 },
];

const obtenerFraccionAleatoria = () => {
  return fracciones[Math.floor(Math.random() * fracciones.length)];
};

const JuegoFracciones = () => {
    const navigate = useNavigate();
  const [fraccionActual, setFraccionActual] = useState(obtenerFraccionAleatoria());
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const verificarRespuesta = (valor) => {
    if (valor === fraccionActual.valor) {
      setMensaje('¡Correcto!');
    } else {
      setMensaje('Intenta de nuevo');
    }
  };

  const nuevaFraccion = () => {
    setFraccionActual(obtenerFraccionAleatoria());
    setRespuesta('');
    setMensaje('');
  };
const regresarAClases = () => {
    navigate('/clases'); // <-- Redirección al presionar el botón
    
  return (
    <div className="contenedor-fraccion">
      <h2>¡Identifica la fracción!</h2>
      <div className="circulo">
        <div
          className="fraccion"
          style={{ transform: `rotate(${fraccionActual.grados}deg)` }}
        ></div>
      </div>
      <div className="botones">
        {fracciones.map((frac) => (
          <button
            key={frac.valor}
            onClick={() => verificarRespuesta(frac.valor)}
          >
            {frac.valor}
          </button>
        ))}
      </div>
      <button className="nueva" onClick={nuevaFraccion}>
        Nueva figura
      </button>
      <p className="mensaje">{mensaje}</p>
    </div>
  );
};

export default JuegoFracciones;
