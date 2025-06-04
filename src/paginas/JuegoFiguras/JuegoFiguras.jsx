import React, { useState, useEffect, useRef } from 'react';
import './JuegoFiguras.css';
import confetti from 'canvas-confetti';
import axios from 'axios';
const { REACT_APP_API } = process.env;

const figuras = [
  { id: 1, tipo: 'círculo' },
  { id: 2, tipo: 'cuadrado' },
  { id: 3, tipo: 'triángulo' },
  { id: 4, tipo: 'rectángulo' },
  { id: 5, tipo: 'óvalo' },
  { id: 6, tipo: 'rombo' },
  { id: 7, tipo: 'estrella' },
];
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

      const puntos = 1;

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

const JuegoFiguras = () => {
  const [figuraActual, setFiguraActual] = useState(figuras[Math.floor(Math.random() * figuras.length)]);
  const [mensaje, setMensaje] = useState('');
  const [animacion, setAnimacion] = useState('');
  const [reconocimiento, setReconocimiento] = useState(null);
  const [escuchando, setEscuchando] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [conteoFiguras, setConteoFiguras] = useState({});
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const figuraRef = useRef(figuraActual);
  const figuraElemento = useRef(null);

  const sonidoCorrecto = useRef(new Audio('/sonidos/correcto.wav'));
  const sonidoIncorrecto = useRef(new Audio('/sonidos/incorrecto.wav'));
  const sonidoInicio = useRef(new Audio('/sonidos/inicio.wav'));

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
        verificarRespuesta(resultado);
        setEscuchando(false);
      };

      recog.onend = () => setEscuchando(false);
      recog.onerror = () => setEscuchando(false);

      setReconocimiento(recog);
    } else {
      alert('Tu navegador no soporta reconocimiento de voz.');
    }
  }, []);

  const verificarRespuesta = (respuesta) => {
    const palabras = respuesta.split(/\s+/);
    const primeraPalabra = palabras[0];
    const figuraCorrecta = figuraRef.current.tipo.toLowerCase();

    if (primeraPalabra === figuraCorrecta) {
      setMensaje('🎉 ¡Correcto!');
      sonidoCorrecto.current.play();
      setAnimacion('acierto');
      enviarPuntaje()
      setPuntaje(prev => prev + 1);

      const nuevaFigura = figuraCorrecta;
      setConteoFiguras(prev => {
        const actualizado = { ...prev, [nuevaFigura]: (prev[nuevaFigura] || 0) + 1 };

        const figurasRestantes = figuras.filter(f => (actualizado[f.tipo] || 0) < 2);
        if (figurasRestantes.length === 0) {
          setJuegoTerminado(true);
        } else {
          setTimeout(() => seleccionarNuevaFigura(actualizado), 2000);
        }

        return actualizado;
      });

      if (figuraElemento.current) {
        const rect = figuraElemento.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 120,
          spread: 100,
          startVelocity: 30,
          origin: { x, y },
          colors: ['#ffeb3b', '#f50057', '#4caf50', '#2196f3', '#ff9800', '#e91e63'],
        });
      }

      setTimeout(() => {
        sonidoCorrecto.current.pause();
        sonidoCorrecto.current.currentTime = 0;
        setMensaje('');
        setAnimacion('');
      }, 2000);
    } else {
      setMensaje('❌ Intenta de nuevo...');
      sonidoIncorrecto.current.play();
      setAnimacion('fallo');

      setTimeout(() => {
        sonidoIncorrecto.current.pause();
        sonidoIncorrecto.current.currentTime = 0;
        setMensaje('');
        setAnimacion('');
      }, 2000);
    }
  };

  const seleccionarNuevaFigura = (conteoActual = conteoFiguras) => {
    const disponibles = figuras.filter(f => (conteoActual[f.tipo] || 0) < 2);
    if (disponibles.length > 0) {
      const nueva = disponibles[Math.floor(Math.random() * disponibles.length)];
      setFiguraActual(nueva);
    } else {
      setJuegoTerminado(true);
    }
  };

  const iniciarEscucha = () => {
    if (reconocimiento && !escuchando && !juegoTerminado) {
      try {
        reconocimiento.start();
        sonidoInicio.current.play();
        setMensaje('🎧 ¡Escuchando!');
        setEscuchando(true);
      } catch (error) {
        console.error('Error al iniciar reconocimiento:', error);
      }
    }
  };

  const reiniciarJuego = () => {
    setPuntaje(0);
    setConteoFiguras({});
    setJuegoTerminado(false);
    setMensaje('');
    setAnimacion('');
    seleccionarNuevaFigura({});
  };

  const reproducirInstrucciones = () => {
    const texto = 'Di el nombre de la figura que ves: círculo, cuadrado, triángulo, rectángulo, óvalo, rombo o estrella. Pulsa "Habla ahora" y responde. ¡Suerte!';
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta síntesis de voz.');
    }
  };

  const volverClases = () => {
    window.location.href = '/clases';
  };

  return (
    <div className="juego-contenedor">
      <h2>🎨 ¡Identifica la figura!</h2>

      {!juegoTerminado && figuraActual && (
        <div className="zona-figura">
          <div ref={figuraElemento} className={`figura ${figuraActual.tipo} ${animacion}`} />
        </div>
      )}

      <div className="zona-puntaje">
        <p>Puntaje: <strong>{puntaje}</strong></p>
      </div>

      <div className="zona-botones">
        <button onClick={iniciarEscucha} disabled={escuchando || juegoTerminado}>🎤 ¡Habla ahora!</button>
        <button onClick={() => seleccionarNuevaFigura()} disabled={juegoTerminado}>🔄 Nueva figura</button>
        <button onClick={reproducirInstrucciones}>📢 Instrucciones</button>
        <button onClick={volverClases} className="boton-volver">⬅️ Regresar</button>
      </div>

      <p className="mensaje">{mensaje}</p>

      {juegoTerminado && (
        <div className="mensaje-final">
          <h3>🎉 ¡Felicidades, adivinaste todas las figuras dos veces!</h3>
          <button onClick={reiniciarJuego}>🔄 Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
};

export default JuegoFiguras;



