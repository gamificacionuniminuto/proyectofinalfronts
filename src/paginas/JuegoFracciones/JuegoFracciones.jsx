import React, { useState } from 'react';
import './JuegoFracciones.css';

const figuras = [
  { id: 1, tipo: 'círculo', partes: 2 },
  { id: 2, tipo: 'círculo', partes: 3 },
  { id: 3, tipo: 'círculo', partes: 4 },
];

const JuegoFracciones = () => {
  const [figuraActual, setFiguraActual] = useState(figuras[Math.floor(Math.random() * figuras.length)]);
  const [mensaje, setMensaje] = useState('');

  const verificarRespuesta = (respuesta) => {
    const correcta = `1/${figuraActual.partes}`;
    if (respuesta === correcta) {
      setMensaje('¡Correcto!');
    } else {
      setMensaje(`Incorrecto, era ${correcta}`);
    }
  };

  const siguienteFigura = () => {
    setFiguraActual(figuras[Math.floor(Math.random() * figuras.length)]);
    setMensaje('');
  };

  return (
    <div className="juego-fracciones">
      <p className="intro-mensaje">
        Observa el círculo y selecciona si representa una mitad, un tercio o un cuarto.  
        ¡Diviértete aprendiendo fracciones!
      </p>
      <h2>¡Identifica la fracción!</h2>
      <div className={`figura partes-${figuraActual.partes}`}></div>
      <div className="opciones">
        <button onClick={() => verificarRespuesta('1/2')}>1/2</button>
        <button onClick={() => verificarRespuesta('1/3')}>1/3</button>
        <button onClick={() => verificarRespuesta('1/4')}>1/4</button>
      </div>
      <p>{mensaje}</p>
      <button onClick={siguienteFigura}>Nueva figura</button>
    </div>
  );
};

export default JuegoFracciones;
