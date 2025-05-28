import React, { useState, useEffect, useRef } from 'react';
import { generarEjerciciosDivision } from './helpers';

const EjercicioMatematicasDivision = () => {
  const [ejercicios] = useState(generarEjerciciosDivision());
  const [respuesta, setRespuesta] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [ejercicioActual, setEjercicioActual] = useState(
    ejercicios[Math.floor(Math.random() * ejercicios.length)]
  );

  const intentarOtroRef = useRef(null);
  const inputRespuestaRef = useRef(null);

  const verificarRespuesta = () => {
    const respuestaUsuario = parseFloat(respuesta);
    if (isNaN(respuestaUsuario)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }
    const correcto = Math.abs(respuestaUsuario - ejercicioActual.respuestaCorrecta) < 0.0001;
    setEsCorrecto(correcto);
    setMostrarResultado(true);
  };

  const reiniciarEjercicio = () => {
    setRespuesta('');
    setMostrarResultado(false);
    setEsCorrecto(false);
    setEjercicioActual(ejercicios[Math.floor(Math.random() * ejercicios.length)]);
    
    if (inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !mostrarResultado) {
      e.preventDefault();
      if (respuesta) {
        verificarRespuesta();
      }
    }
  };

  useEffect(() => {
    if (mostrarResultado && intentarOtroRef.current) {
      intentarOtroRef.current.focus();
    }
  }, [mostrarResultado]);

  useEffect(() => {
    if (!mostrarResultado && inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  }, [mostrarResultado]);

  return (
    <div className="ejercicio-matematicas">
      <h1 className="titulo-ejercicio">{ejercicioActual.titulo}</h1>
      <p className="enunciado">{ejercicioActual.pregunta}</p>

      <div className="contenedor-respuesta">
        <input
          ref={inputRespuestaRef}
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          onKeyDown={manejarTecla}
          placeholder="Escribe tu respuesta"
          className="campo-respuesta"
          disabled={mostrarResultado}
        />

        {!mostrarResultado ? (
          <button
            onClick={verificarRespuesta}
            className="boton-verificar"
            disabled={!respuesta}
          >
            Verificar
          </button>
        ) : (
          <button
            ref={intentarOtroRef}
            onClick={reiniciarEjercicio}
            className="boton-reiniciar"
          >
            Intentar otro
          </button>
        )}
      </div>

      {mostrarResultado && (
        <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
          {esCorrecto ? (
            <p>¡Correcto! {ejercicioActual.pregunta} {ejercicioActual.respuestaCorrecta}</p>
          ) : (
            <p>Incorrecto. La respuesta correcta es {ejercicioActual.respuestaCorrecta}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EjercicioMatematicasDivision;