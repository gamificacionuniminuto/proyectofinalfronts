import React, { useState, useEffect, useRef } from 'react';
import './JuegoFiguras.css';

const figuras = [
  { id: 1, tipo: 'círculo' },
  { id: 2, tipo: 'cuadrado' },
  { id: 3, tipo: 'triángulo' }
];

const JuegoFiguras = () => {
  const [figuraActual, setFiguraActual] = useState(figuras[Math.floor(Math.random() * figuras.length)]);
  const [mensaje, setMensaje] = useState('');
  const [animacion, setAnimacion] = useState('');
  const [reconocimiento, setReconocimiento] = useState(null);
  const [escuchando, setEscuchando] = useState(false);
  
  // Ref para mantener sincronizado figuraActual con el reconocimiento
  const figuraRef = useRef(figuraActual);

  // Cargar sonidos
  const sonidoCorrecto = new Audio('/sonidos/correcto.wav');
  const sonidoIncorrecto = new Audio('/sonidos/incorrecto.wav');
  const sonidoInicio = new Audio('/sonidos/inicio.wav');

  useEffect(() => {
    figuraRef.current = figuraActual;
  }, [figuraActual]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = 'es-ES';
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (event) => {
        const resultado = event.results[0][0].transcript.toLowerCase().trim();
        console.log(`Escuchado: ${resultado}`);
        verificarRespuesta(resultado);
        setEscuchando(false);
      };

      recog.onend = () => {
        setEscuchando(false);
      };

      recog.onerror = (event) => {
        console.error('Error de reconocimiento de voz:', event.error);
        setEscuchando(false);
      };

      setReconocimiento(recog);
    } else {
      alert('Tu navegador no soporta reconocimiento de voz.');
    }
  }, []);

  const verificarRespuesta = (respuesta) => {
    const palabras = respuesta.split(/\s+/);
    const primeraPalabra = palabras[0];

    const figuraCorrecta = figuraRef.current.tipo.toLowerCase();
    console.log(`Figura actual: ${figuraCorrecta}, palabra hablada: ${primeraPalabra}`);

    if (primeraPalabra === figuraCorrecta) {
      setMensaje('¡Correcto!');
      sonidoCorrecto.play();
      setAnimacion('acierto');
      setTimeout(() => {
        sonidoCorrecto.pause();
        sonidoCorrecto.currentTime = 0;
      }, 2000);
    } else {
      setMensaje('Intenta de nuevo...');
      sonidoIncorrecto.play();
      setAnimacion('fallo');
      setTimeout(() => {
        sonidoIncorrecto.pause();
        sonidoIncorrecto.currentTime = 0;
      }, 2000);
    }
  };

  const siguienteFigura = () => {
    const nuevaFigura = figuras[Math.floor(Math.random() * figuras.length)];
    setFiguraActual(nuevaFigura);
    console.log(`Nueva figura: ${nuevaFigura.tipo}`);
    setMensaje('');
  };

  const iniciarEscucha = () => {
    if (reconocimiento && !escuchando) {
      reconocimiento.start();
      sonidoInicio.play();
      setMensaje('¡Escuchando!');
      setEscuchando(true);
    }
  };

  return (
    <div className="juego-contenedor">
      <h2>¡Identifica la figura!</h2>
      <div className={`figura ${figuraActual.tipo} ${animacion}`}></div>
      <button onClick={iniciarEscucha}>Habla ahora</button>
      <p>{mensaje}</p>
      <button onClick={siguienteFigura}>Nueva figura</button>
    </div>
  );
};

export default JuegoFiguras;
