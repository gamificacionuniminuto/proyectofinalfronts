import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/users/${userId}/score`,
        { numberToAdd: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log('Puntaje actualizado en servidor:', response.data);
      
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

  const startGame = () => {
    setIsPlaying(true);
    setMessage('Escucha el número...');
    generateNumber();
  };

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
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    marginBottom: '20px'
  },
  score: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#27ae60'
  },
  round: {
    fontSize: '16px',
    color: '#7f8c8d'
  },
  message: {
    fontSize: '20px',
    margin: '20px 0',
    minHeight: '30px',
    color: '#2c3e50',
    fontWeight: 'bold'
  },
  button: {
    padding: '12px 25px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    margin: '30px 0',
    flexWrap: 'wrap'
  },
  numberButton: {
    padding: '20px',
    fontSize: '24px',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.2s',
    ':hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#2980b9'
    }
  },
  instructions: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
    textAlign: 'left'
  }
};

export default NumerosGame;