import React, { useState } from 'react';
import './ProblemasSimples.css';

const generarProblema = () => {
  const operaciones = ['+', '-', '×', '÷'];
  const operacion = operaciones[Math.floor(Math.random() * operaciones.length)];

  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  // Ajustes para evitar divisiones con decimales o por cero
  if (operacion === '÷') {
    num1 = num1 * num2;
  }

  let resultado;
  switch (operacion) {
    case '+':
      resultado = num1 + num2;
      break;
    case '-':
      resultado = num1 - num2;
      break;
    case '×':
      resultado = num1 * num2;
      break;
    case '÷':
      resultado = num1 / num2;
      break;
    default:
      break;
  }

  return { num1, num2, operacion, resultado };
};

const ProblemasSimples = () => {
  const [problema, setProblema] = useState(generarProblema());
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const verificarRespuesta = () => {
    const esCorrecta = parseFloat(respuesta) === problema.resultado;
    setMensaje(esCorrecta ? '🎉 ¡Muy bien! ¡Sigue así!' : `😅 Ups, la respuesta correcta es ${problema.resultado}`);
  };

  const siguienteProblema = () => {
    setProblema(generarProblema());
    setRespuesta('');
    setMensaje('');
  };

  return (
    <div className="contenedor-problema">
      <h2>🧠 ¡Resuelve el problema!</h2>
      <div className="problema">
        <span>{problema.num1}</span>
        <span className="operacion">{problema.operacion}</span>
        <span>{problema.num2}</span>
        <span>= ?</span>
      </div>

      <input
        type="number"
        placeholder="Tu respuesta"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />

      <div className="botones">
        <button onClick={verificarRespuesta}>Verificar</button>
        <button onClick={siguienteProblema}>Siguiente</button>
      </div>

      <p className="mensaje">{mensaje}</p>
    </div>
  );
};

export default ProblemasSimples;
