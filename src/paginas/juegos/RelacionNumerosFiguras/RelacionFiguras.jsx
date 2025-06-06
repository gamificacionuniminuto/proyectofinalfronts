import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Contar/Contar20.css'; 
import axios from 'axios';
const { REACT_APP_API } = process.env;

const animalList = ['🔺', '🔵', '⚫', '⬛', '⬜', '🔶', '🔷'];

const speak = (text) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  window.speechSynthesis.speak(utterance);
};

const getRandomAnimals = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomAnimal = animalList[Math.floor(Math.random() * animalList.length)];
    result.push(randomAnimal);
  }
  return result;
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

const FigureCounter = () => {
  const [input, setInput] = useState('');
  const [targetCount, setTargetCount] = useState(Math.floor(Math.random() * 10) + 1);
  const [animals, setAnimals] = useState(getRandomAnimals(targetCount));
  const [feedback, setFeedback] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const spokenRef = useRef(false);

  useEffect(() => {
    if (!gameEnded && !spokenRef.current) {
      speak('¿Cuántos figuras hay?');
      spokenRef.current = true;
    }
  }, [gameEnded, animals]);

  const nextQuestion = () => {
    const newTargetCount = Math.floor(Math.random() * 10) + 1;
    setTargetCount(newTargetCount);
    setAnimals(getRandomAnimals(newTargetCount));
    setInput('');
    setFeedback('');
    spokenRef.current = false;
  };

  const restartGame = () => {
    setTargetCount(Math.floor(Math.random() * 10) + 1);
    setAnimals(getRandomAnimals(targetCount));
    setInput('');
    setFeedback('');
    setGameEnded(false);
    setScore(0);
    spokenRef.current = false;
  };

  const checkAnswer = () => {
    if (parseInt(input) === animals.length) {
      setFeedback('✅ ¡Muy bien!');
      setScore(score + 1);
      speak('¡Muy bien!');
      enviarPuntaje()
      setTimeout(nextQuestion, 1000);
    } else {
      setFeedback(`❌ Intenta otra vez. Hay ${animals.length} animalitos.`);
      speak('Intenta otra vez');
    }
  };

  return (
    <div className="counter-container">
      <div className="nav-buttons">
        <button className="back-button2" onClick={() => navigate(-1)}>🔙 Regresar</button>
      </div>
      <h2>🐾 ¿Cuenta las figuras?</h2>
      <p className="score">Aciertos: {score}</p>

      {!gameEnded && (
        <>
          <div className="animals">
            {animals.map((a, i) => (
              <span key={i} className="animal">{a}</span>
            ))}
          </div>

          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu respuesta"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                checkAnswer();
              }
            }}
            min="1"
            max="20"
          />
          <button onClick={checkAnswer}>✅</button>
          <p className="feedback">{feedback}</p>
        </>
      )}

      {gameEnded && (
        <>
          <p className="feedback">{feedback}</p>
          <button onClick={restartGame}>🔁 Intentar de nuevo</button>
        </>
      )}
    </div>
  );
};

export default FigureCounter;