import React, { useState, useEffect } from 'react';
import './mayormenor.css';

const JuegoComparacion = () => {
  // Estados del juego
  const [nivel, setNivel] = useState('basico');
  const [puntaje, setPuntaje] = useState(0);
  const [ejercicio, setEjercicio] = useState(generarEjercicio('basico'));
  const [feedback, setFeedback] = useState('');
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [aciertosConsecutivos, setAciertosConsecutivos] = useState(0);

  // Generar un nuevo ejercicio
  function generarEjercicio(nivelActual) {
    let num1, num2;
    
    switch(nivelActual) {
      case 'avanzado':
        num1 = Math.floor(Math.random() * 1000) + 100;
        num2 = Math.floor(Math.random() * 1000) + 100;
        break;
      case 'medio':
        num1 = Math.floor(Math.random() * 100) + 10;
        num2 = Math.floor(Math.random() * 100) + 10;
        break;
      default: // básico
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
    }
    
    // Asegurar que no siempre sea igual (para básico)
    if (nivelActual === 'basico' && num1 === num2) {
      num2 = num1 + (Math.random() > 0.5 ? 1 : -1);
      if (num2 < 1) num2 = 1;
    }
    
    return { num1, num2, respuestaCorrecta: compararNumeros(num1, num2) };
  }

  // Función para determinar la respuesta correcta
  function compararNumeros(a, b) {
    if (a > b) return '>';
    if (a < b) return '<';
    return '=';
  }

  // Manejar la selección del jugador
  const manejarSeleccion = (seleccion) => {
    const esCorrecto = seleccion === ejercicio.respuestaCorrecta;
    
    setIntentos(intentos + 1);
    setMostrarFeedback(true);
    
    if (esCorrecto) {
      const nuevosAciertos = aciertosConsecutivos + 1;
      setAciertosConsecutivos(nuevosAciertos);
      
      // Aumentar puntaje según nivel y racha
      let puntos = 1;
      if (nivel === 'medio') puntos = 2;
      if (nivel === 'avanzado') puntos = 3;
      if (nuevosAciertos >= 3) puntos *= 2; // Bonificación por racha
      
      setPuntaje(puntaje + puntos);
      setFeedback(`¡Correcto! +${puntos} puntos`);
    } else {
      setAciertosConsecutivos(0);
      setFeedback('Incorrecto, intenta de nuevo');
    }
    
    // Generar nuevo ejercicio después de 1.5 segundos
    setTimeout(() => {
      setMostrarFeedback(false);
      if (esCorrecto || intentos >= 2) {
        setEjercicio(generarEjercicio(nivel));
        if (!esCorrecto) setIntentos(0);
      }
    }, 1500);
  };

  // Cambiar nivel de dificultad
  const cambiarNivel = (nuevoNivel) => {
    setNivel(nuevoNivel);
    setEjercicio(generarEjercicio(nuevoNivel));
    setAciertosConsecutivos(0);
    setIntentos(0);
  };

  // Efectos para voz
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const mensaje = new SpeechSynthesisUtterance(
        `Compara: ¿${ejercicio.num1} es mayor, menor o igual a ${ejercicio.num2}?`
      );
      mensaje.lang = 'es-ES';
      window.speechSynthesis.speak(mensaje);
    }
  }, [ejercicio]);

  return (
    <div className="juego-comparacion">
      <h1>Comparación de Números</h1>
      
      <div className="controles-nivel">
        <button 
          className={nivel === 'basico' ? 'activo' : ''} 
          onClick={() => cambiarNivel('basico')}
        >
          Básico (1-10)
        </button>
        <button 
          className={nivel === 'medio' ? 'activo' : ''} 
          onClick={() => cambiarNivel('medio')}
        >
          Intermedio (10-100)
        </button>
        <button 
          className={nivel === 'avanzado' ? 'activo' : ''} 
          onClick={() => cambiarNivel('avanzado')}
        >
          Avanzado (100-1000)
        </button>
      </div>
      
      <div className="puntaje-racha">
        <p>Puntaje: <span>{puntaje}</span></p>
        {aciertosConsecutivos >= 3 && (
          <p className="racha">¡Racha de {aciertosConsecutivos} aciertos! x2 puntos</p>
        )}
      </div>
      
      <div className="ejercicio">
        <div className="numeros">
          <span className="numero">{ejercicio.num1}</span>
          <span className="vs">?</span>
          <span className="numero">{ejercicio.num2}</span>
        </div>
        
        <div className="opciones">
          <button onClick={() => manejarSeleccion('>')} className="opcion mayor">
            Mayor que (&gt;)
          </button>
          <button onClick={() => manejarSeleccion('=')} className="opcion igual">
            Igual a (=)
          </button>
          <button onClick={() => manejarSeleccion('<')} className="opcion menor">
            Menor que (&lt;)
          </button>
        </div>
      </div>
      
      {mostrarFeedback && (
        <div className={`feedback ${feedback.includes('¡Correcto') ? 'correcto' : 'incorrecto'}`}>
          {feedback}
          {feedback.includes('¡Correcto') && (
            <span className="explicacion">
              {ejercicio.num1} {ejercicio.respuestaCorrecta} {ejercicio.num2}
            </span>
          )}
        </div>
      )}
      
      <button 
        className="boton-sonido"
        onClick={() => {
          const mensaje = new SpeechSynthesisUtterance(
            `¿${ejercicio.num1} es mayor, menor o igual a ${ejercicio.num2}?`
          );
          mensaje.lang = 'es-ES';
          window.speechSynthesis.speak(mensaje);
        }}
      >
        🔊 Repetir Pregunta
      </button>
    </div>
  );
};

export default JuegoComparacion;