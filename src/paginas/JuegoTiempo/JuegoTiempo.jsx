import React, { useState } from 'react';
import './JuegoTiempo.css';
import fondoReloj from '../../imagenes/reloj-analogico.png';

const horasPosibles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutosPosibles = [0, 15, 30, 45];

const generarPregunta = () => {
  const tipo = Math.random() < 0.5 ? 'reloj' : 'calendario';

  if (tipo === 'reloj') {
    const hora = horasPosibles[Math.floor(Math.random() * horasPosibles.length)];
    const minutos = minutosPosibles[Math.floor(Math.random() * minutosPosibles.length)];
    return { tipo, hora, minutos };
  } else {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + Math.floor(Math.random() * 15));
    return { tipo, fecha };
  }
};

const obtenerFechaEnEspañol = (fecha) => {
  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const JuegoTiempo = () => {
  const [pregunta, setPregunta] = useState(generarPregunta());
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);

  const verificarRespuesta = () => {
    setEsError(false);

    if (pregunta.tipo === 'reloj') {
      const hora = pregunta.hora;
      const minutos = pregunta.minutos;
      const correcta = `${hora}:${minutos.toString().padStart(2, '0')}`;

      const formatoHoraRegex = /^\d{1,2}:\d{2}$/;
      if (!formatoHoraRegex.test(respuesta)) {
        setMensaje('Formato inválido. Usa hh:mm');
        setEsError(true);
        return;
      }

      setMensaje(respuesta === correcta ? '¡Correcto!' : `Incorrecto, era ${correcta}`);
      setEsError(respuesta !== correcta);
    } else {
      const dia = pregunta.fecha.getDate().toString().padStart(2, '0');
      const mes = (pregunta.fecha.getMonth() + 1).toString().padStart(2, '0');
      const correcta = `${dia}/${mes}`;

      const formatoFechaRegex = /^\d{2}\/\d{2}$/;
      if (!formatoFechaRegex.test(respuesta)) {
        setMensaje('Formato inválido. Usa dd/mm');
        setEsError(true);
        return;
      }

      const [dd, mm] = respuesta.split('/').map(Number);

      if (isNaN(dd) || isNaN(mm) || dd < 1 || dd > 31 || mm < 1 || mm > 12) {
        setMensaje('Formato inválido. Usa valores reales');
        setEsError(true);
        return;
      }

      setMensaje(respuesta === correcta ? '¡Correcto!' : `Incorrecto, era ${correcta}`);
      setEsError(respuesta !== correcta);
    }
  };

  const siguientePregunta = () => {
    setPregunta(generarPregunta());
    setRespuesta('');
    setMensaje('');
    setEsError(false);
  };

  const ROTACION_BASE = -90;
  const anguloHora = ((pregunta.hora % 12) + pregunta.minutos / 60) * 30 + ROTACION_BASE;
  const anguloMinuto = pregunta.minutos * 6 + ROTACION_BASE;

  return (
    <div className="juego-tiempo">
      <h2>¡Practica el tiempo!</h2>

      {pregunta.tipo === 'reloj' ? (
        <div className="reloj">
          <div
            className="esfera"
            style={{
              backgroundImage: `url(${fondoReloj})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className="hora" style={{ transform: `rotate(${anguloHora}deg)` }}></div>
            <div className="minuto" style={{ transform: `rotate(${anguloMinuto}deg)` }}></div>
          </div>
        </div>
      ) : (
        <div className="calendario">
          <p>Fecha mostrada: {obtenerFechaEnEspañol(pregunta.fecha)}</p>
        </div>
      )}

      <p className="pregunta-texto">
        {pregunta.tipo === 'reloj'
          ? '¿Qué hora es? (formato hh:mm)'
          : '¿Cuál es el día y mes? (formato dd/mm)'}
      </p>

      <input
        type="text"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder={pregunta.tipo === 'reloj' ? 'hh:mm' : 'dd/mm'}
      />

      <div>
        <button onClick={verificarRespuesta}>Verificar</button>
        <button onClick={siguientePregunta}>Siguiente</button>
      </div>

      <p style={{ color: esError ? 'red' : 'green' }}>{mensaje}</p>
    </div>
  );
};

export default JuegoTiempo;
