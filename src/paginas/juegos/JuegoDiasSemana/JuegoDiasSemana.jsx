import React, { useState, useEffect } from 'react';
import './JuegoDiasSemana.css';
import confetti from 'canvas-confetti';

const diasSemana = [
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
  'domingo'
];

const JuegoDiasSemana = () => {
  const [diaActual, setDiaActual] = useState('');
  const [tipoPregunta, setTipoPregunta] = useState(''); // 'anterior' o 'siguiente'
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [puntaje, setPuntaje] = useState(0);

  // Generar una nueva pregunta
  const nuevaPregunta = () => {
    const dia = diasSemana[Math.floor(Math.random() * diasSemana.length)];
    const tipo = Math.random() > 0.5 ? 'anterior' : 'siguiente';
    setDiaActual(dia);
    setTipoPregunta(tipo);
    setRespuesta('');
    setMensaje('');
  };

  useEffect(() => {
    nuevaPregunta();
  }, []);

  const verificarRespuesta = () => {
    const index = diasSemana.indexOf(diaActual);
    let respuestaCorrecta = '';

    if (tipoPregunta === 'anterior') {
      respuestaCorrecta = diasSemana[(index - 1 + diasSemana.length) % diasSemana.length];
    } else {
      respuestaCorrecta = diasSemana[(index + 1) % diasSemana.length];
    }

    if (respuesta.trim().toLowerCase() === respuestaCorrecta) {
      setMensaje('🎉 ¡Correcto!');
      setPuntaje(puntaje + 1);

      // Efecto confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        nuevaPregunta();
      }, 1500);
    } else {
      setMensaje(`❌ Incorrecto. La respuesta correcta era: ${respuestaCorrecta}`);
      setTimeout(() => {
        nuevaPregunta();
      }, 2000);
    }
    
  };
  
  return (
    <div className="juego-dias-semana">
      <h2>📅 Juego de Días de la Semana</h2>
      <p>
        ¿Cuál es el día <strong>{tipoPregunta}</strong> a <strong>{diaActual}</strong>?
      </p>

      <input
        type="text"
        placeholder="Escribe el día..."
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />

      <div className="botones">
        <button onClick={verificarRespuesta}>✅ Verificar</button>
        <button onClick={nuevaPregunta}>🔄 Nueva pregunta</button>
      </div>

      <p className="mensaje">{mensaje}</p>
      <p className="puntaje">Puntaje: {puntaje}</p>
    </div>
  );
};

export default JuegoDiasSemana;
