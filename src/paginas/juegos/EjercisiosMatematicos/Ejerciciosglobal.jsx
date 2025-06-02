import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
const {REACT_APP_API
} = process.env;

const EjercicioMatematicasBase = ({ ejercicios, nivelDificultad, tipoOperacion }) => {
  const [respuesta, setRespuesta] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [ejercicioActual, setEjercicioActual] = useState(
    ejercicios[Math.floor(Math.random() * ejercicios.length)]
  );
  const intentarOtroRef = useRef(null);
  const inputRespuestaRef = useRef(null);
  
  const puntosPorNivel = {
    basico: 2,
    medio: 5,
    avanzado: 10
  };

  const simbolosOperacion = {
    suma: '+',
    resta: '-',
    multiplicacion: '×',
    division: '÷'
  };

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
      
      const puntos = puntosPorNivel[nivelDificultad] || 2;
      
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

  const verificarRespuesta = () => {
    const respuestaUsuario = parseFloat(respuesta);
    if (isNaN(respuestaUsuario)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }
    
    // Para divisiones, permitimos margen de error por decimales
    const margenError = tipoOperacion === 'division' ? 0.01 : 0.0001;
    const correcto = Math.abs(respuestaUsuario - ejercicioActual.respuestaCorrecta) < margenError;
    
    setEsCorrecto(correcto);
    setMostrarResultado(true);  
    
    if (correcto) {
      enviarPuntaje();
    }
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
      <h1 className="titulo-ejercicio">
        {tipoOperacion.charAt(0).toUpperCase() + tipoOperacion.slice(1)} {nivelDificultad}
      </h1>
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
          step={tipoOperacion === 'division' ? '0.01' : '1'}
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
            <>
              <p>¡Correcto! 🎉</p>
              <p>{ejercicioActual.pregunta} = {ejercicioActual.respuestaCorrecta}</p>
            </>
          ) : (
            <>
              <p>Incorrecto ❌</p>
              <p>La respuesta correcta es: {ejercicioActual.respuestaCorrecta}</p>
              {ejercicioActual.explicacion && (
                <p className="explicacion">{ejercicioActual.explicacion}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EjercicioMatematicasBase;