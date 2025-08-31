// JuegoFraccionesAvanzado.jsx
import React, { useState, useEffect } from 'react';
import './JuegoFracciones.css';
import { useNavigate } from 'react-router-dom';

const fracciones = [
  { valor: '1/2', porcentaje: 50, texto: 'Mitad del círculo' },
  { valor: '1/3', porcentaje: 33.33, texto: 'Un tercio del círculo' },
  { valor: '2/3', porcentaje: 66.66, texto: 'Dos tercios del círculo' },
  { valor: '1/4', porcentaje: 25, texto: 'Un cuarto del círculo' },
  { valor: '3/4', porcentaje: 75, texto: 'Tres cuartos del círculo' },
  { valor: '1/5', porcentaje: 20, texto: 'Un quinto del círculo' },
  { valor: '2/5', porcentaje: 40, texto: 'Dos quintos del círculo' },
  { valor: '3/5', porcentaje: 60, texto: 'Tres quintos del círculo' },
];

const obtenerFraccionAleatoria = () => {
  return fracciones[Math.floor(Math.random() * fracciones.length)];
};

const hablar = (texto) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'es-ES';
    msg.rate = 0.9;
    msg.pitch = 1.2;
    window.speechSynthesis.speak(msg);
  }
};

export default function JuegoFraccionesAvanzado() {
  const navigate = useNavigate();
  const [fraccionActual, setFraccionActual] = useState(obtenerFraccionAleatoria());
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [explicacion, setExplicacion] = useState('');
  const [aciertos, setAciertos] = useState(0);
  const [juegoFinalizado, setJuegoFinalizado] = useState(false);
  const [mostrarIntentar, setMostrarIntentar] = useState(false);

  useEffect(() => {
    hablar(`¿Qué fracción ves? Elige entre un medio, un tercio, dos tercios, un cuarto, tres cuartos, un quinto, dos quintos o tres quintos.`);
  }, []);

  const verificar = (opcion) => {
    setRespuesta(opcion);
    if (opcion === fraccionActual.valor) {
      setMensaje('¡Correcto!');
      setExplicacion(fraccionActual.texto);
      setAciertos(aciertos + 1);
      hablar('¡Correcto! ' + fraccionActual.texto);

      // Finalizar tras 5 aciertos
      if (aciertos + 1 >= 5) {
        setJuegoFinalizado(true);
        hablar('¡Felicidades! Has completado el juego de fracciones. Eres un genio.');
      } else {
        setMostrarIntentar(true); // Mostrar botón "Siguiente"
      }
    } else {
      setMensaje('❌ Incorrecto');
      setExplicacion(
        `La fracción correcta es ${fraccionActual.valor}. Recuerda: el número de abajo es en cuántas partes se divide el círculo.`
      );
      hablar('Incorrecto. ' + explicacion);
      setMostrarIntentar(true); // Permite intentar de nuevo
    }
  };

  const intentarDeNuevo = () => {
    // Limpia solo el error, pero mantiene la misma fracción
    setRespuesta('');
    setMensaje('');
    setExplicacion('');
    setMostrarIntentar(false);
    hablar(`Intenta de nuevo. ¿Qué fracción ves?`);
  };

  const siguienteFraccion = () => {
    setFraccionActual(obtenerFraccionAleatoria());
    setRespuesta('');
    setMensaje('');
    setExplicacion('');
    setMostrarIntentar(false);
  };

  const regresar = () => {
    navigate('/materiales');
  };

  const gradiente = `conic-gradient(#4ecdc4 0% ${fraccionActual.porcentaje}%, #ddd ${fraccionActual.porcentaje}% 100%)`;

  return (
    <div className="juego-container">
      <h2>🍕 ¡Fracciones Avanzadas con Mati!</h2>
      <p className="instruccion">¿Qué parte del círculo está coloreada?</p>

      {/* Contador de aciertos */}
      <div className="aciertos">
        <strong>⭐ Aciertos: {aciertos}/5</strong>
      </div>

      {/* Círculo */}
      <div className="circulo-container">
        <div
          className="circulo"
          style={{ background: gradiente }}
        ></div>
      </div>

      {/* Opciones */}
      <div className="opciones">
        {fracciones.map((frac) => (
          <button
            key={frac.valor}
            className="btn-opcion"
            onClick={() => verificar(frac.valor)}
            disabled={respuesta !== ''}
          >
            {frac.valor}
          </button>
        ))}
      </div>

      {/* Mensaje */}
      {mensaje && <p className="mensaje">{mensaje}</p>}
      {explicacion && <p className="explicacion">{explicacion}</p>}

      {/* Botones */}
      {juegoFinalizado ? (
        <div className="final">
          <h3>🎉 ¡Felicidades, Mati está orgulloso de ti!</h3>
          <p>Has completado el juego de fracciones. Eres un campeón de las matemáticas.</p>
          <button className="btn-juego btn-regresar" onClick={regresar}>
            ◀️ Volver a Materiales
          </button>
        </div>
      ) : (
        <div className="acciones">
          {mostrarIntentar ? (
            <button className="btn-juego btn-siguiente" onClick={respuesta === fraccionActual.valor ? siguienteFraccion : intentarDeNuevo}>
              {respuesta === fraccionActual.valor ? 'Siguiente ➡️' : '🔄 Intentar de nuevo'}
            </button>
          ) : null}
          <button className="btn-juego btn-regresar" onClick={regresar}>
            ◀️ Regresar
          </button>
        </div>
      )}
    </div>
  );
}