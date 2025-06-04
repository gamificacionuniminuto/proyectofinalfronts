import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // para navegación

const NumerosGame = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('Presiona "Comenzar" para iniciar');
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [userId, setUserId] = useState(null);
  const {REACT_APP_API
} = process.env;

  const navigate = useNavigate(); // hook para navegar

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserId(user.id);
      setScore(user.score || 0);
    }
  }, []);

  const incrementScore = async () => {
    if (!userId) return;

    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const newScore = (user.score || 0) + 1;
        user.score = newScore;
        localStorage.setItem('user', JSON.stringify(user));
        setScore(newScore);
      }
      await axios.put(
        `http://localhost:3001/api/users/${userId}/score`,
        { numberToAdd: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } catch (error) {
      console.error('Error al actualizar el puntaje:', error);
      setMessage('Error al guardar el puntaje, pero puedes seguir jugando');
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const previousScore = (user.score || 0) - 1;
        user.score = previousScore;
        localStorage.setItem('user', JSON.stringify(user));
        setScore(previousScore);
      }
    }
  };

  const generateNumber = () => {
    const newNumber = Math.floor(Math.random() * 10) + 1;
    setTargetNumber(newNumber);

    const optionsArray = [newNumber];
    while (optionsArray.length < 3) {
      const randomOption = Math.floor(Math.random() * 20) + 1;
      if (!optionsArray.includes(randomOption)) {
        optionsArray.push(randomOption);
      }
    }
    setOptions(optionsArray.sort(() => Math.random() - 0.5));
    setRound(prev => prev + 1);
    speakNumber(newNumber);
  };

  const speakNumber = (number) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.lang = 'es-ES';
    utterance.rate = 0.8;
    synth.speak(utterance);
  };

  // Aquí está la función startGame que faltaba
  const startGame = () => {
    setIsPlaying(true);
    setMessage('Escucha el número...');
    generateNumber();
  };

  // Función para manejar la selección de número
  const handleNumberSelect = async (selectedNumber) => {
    if (selectedNumber === targetNumber) {
      setMessage(`¡Correcto! Era el ${targetNumber}`);
      await incrementScore();
      setTimeout(() => {
        setMessage('Escucha el próximo número...');
        generateNumber();
      }, 1500);
    } else {
      setMessage(`Incorrecto. Intenta de nuevo. Escucha: ${targetNumber}`);
      speakNumber(targetNumber);
    }
  };

  const isSpeechSupported = () => {
    return 'speechSynthesis' in window;
  };

  if (!isSpeechSupported()) {
    return (
      <div style={styles.container}>
        <h2>Lo siento, tu navegador no soporta síntesis de voz.</h2>
        <p>Prueba con Chrome, Edge o Safari.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Juego de Números</h1>
      <p style={styles.score}>Puntuación: {score}</p>
      <p style={styles.round}>Ronda: {round}</p>

      <div style={styles.message}>{message}</div>

      {!isPlaying ? (
        <button style={styles.button} onClick={startGame}>Comenzar Juego</button>
      ) : (
        <div style={styles.optionsContainer}>
          {options.map((number) => (
            <button
              key={number}
              style={styles.numberButton}
              onClick={() => handleNumberSelect(number)}
            >
              {number}
            </button>
          ))}
        </div>
      )}

      {isPlaying && (
        <button
          style={{ ...styles.button, backgroundColor: '#ff4444' }}
          onClick={() => {
            setIsPlaying(false);
            setMessage('Juego terminado. Presiona "Comenzar" para jugar otra vez');
          }}
        >
          Terminar Juego
        </button>
      )}

      <button
        style={{ ...styles.button, backgroundColor: '#56cc90', marginTop: '20px' }}
        onClick={() => navigate('/clases')} // Cambia '/clases' por la ruta correcta
      >
        Regresar a Clases
      </button>

      <div style={styles.instructions}>
        <h3>Instrucciones:</h3>
        <p>1. Escucha el número que dice la aplicación</p>
        <p>2. Haz clic en el número correcto</p>
        <p>3. ¡Gana puntos por cada acierto!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '45px',
    maxWidth: '800px',
    margin: '100px auto',
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    background: 'linear-gradient(135deg,rgb(117, 192, 151),rgba(196, 123, 129, 0.76))',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(58, 59, 49, 0.84)',
    userSelect: 'none',
  },
  title: {
    color: '#FF45A1',
    fontSize: '3rem',
    marginBottom: '20px',
    textShadow: '2px 2px 6px rgb(88, 60, 60)',
    fontWeight: '900',
  },
  score: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#2F80ED',
    textShadow: '1px 1px 3px #56CCF2',
    marginBottom: '6px',
  },
  round: {
    fontSize: '18px',
    color: '#303030',
    fontWeight: '600',
    marginBottom: '25px',
  },
  message: {
    fontSize: '22px',
    margin: '25px 0',
    minHeight: '40px',
    color: '#1A374D',
    fontWeight: 'bold',
    animation: 'pulse 2s ease-in-out infinite',
  },
  button: {
    padding: '15px 35px',
    fontSize: '18px',
    backgroundColor: '#56CCF2',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    margin: '12px 10px',
    boxShadow: '0 6px 12px rgba(86, 204, 242, 0.7)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '30px 0',
    flexWrap: 'wrap',
  },
  numberButton: {
    padding: '0',
    fontSize: '28px',
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#FF6F91',
    color: 'white',
    border: '4px solid rgb(53, 73, 255)',
    cursor: 'pointer',
    boxShadow: '0 8px 15px rgba(53, 117, 255, 0.7)',
    transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  instructions: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#FFF5E1',
    borderRadius: '15px',
    boxShadow: '0 6px 12px rgba(255, 111, 145, 0.5)',
    textAlign: 'left',
    fontSize: '18px',
    color: '#FF355E',
    fontWeight: '600',
    lineHeight: '1.5',
  },
};

// Animación CSS en JS para el mensaje (pulso)
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes pulse {
  0% { color:rgb(26, 128, 206); text-shadow: 0 0 5px rgb(123, 255, 111); }
  50% { color:rgb(41, 148, 190); text-shadow: 0 0 20px rgb(145, 25, 49); }
  100% { color:rgb(37, 94, 219); text-shadow: 0 0 5px rgb(231, 19, 68); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default NumerosGame;

