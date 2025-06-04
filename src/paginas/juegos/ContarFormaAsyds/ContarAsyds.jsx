import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Contar/Contar20.css'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
const { REACT_APP_API } = process.env;


const animalList = ['🦊', '🐰', '🦉', '🦝', '🐻', '🦔'];

const speak = (text) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  window.speechSynthesis.speak(utterance);
};

const getRandomAnimals = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const animal = animalList[Math.floor(Math.random() * animalList.length)];
    result.push(animal);
  }
  return result;
};



const AnimalCounterDs = () => {
  const [number, setNumber] = useState(1);
  const [input, setInput] = useState('');
  const [animals, setAnimals] = useState(getRandomAnimals(1));
  const [feedback, setFeedback] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [countingMode, setCountingMode] = useState('asc'); // 'asc' o 'desc'
  const navigate = useNavigate();

  // Ref para controlar si ya se habló para el número actual
  const spokenNumberRef = useRef(null);

  // Hablar pregunta solo cuando cambia number y no se ha hablado antes para ese número
  useEffect(() => {
    if (!gameEnded && spokenNumberRef.current !== number) {
      speak('¿Cuenta las figuras?');
      spokenNumberRef.current = number;
    }
  }, [number, gameEnded]);

  const nextQuestion = () => {
    let newNumber;
    
    if (countingMode === 'asc') {
      newNumber = number + 1;
      if (newNumber > 20) {
        setGameEnded(true);
        setFeedback('🎉 ¡Has contado hasta 20! ¡Excelente trabajo!');
        speak('¡Has contado hasta 20! ¡Excelente trabajo!');
        return;
      }
    } else { // Modo descendente
      newNumber = number - 1;
      if (newNumber < 1) {
        setGameEnded(true);
        setFeedback('🎉 ¡Has contado desde 20! ¡Excelente trabajo!');
        speak('¡Has contado desde 20! ¡Excelente trabajo!');
        return;
      }
    }
    
    setNumber(newNumber);
    setAnimals(getRandomAnimals(newNumber));
    setInput('');
    setFeedback('');
  };

  const restartGame = () => {
    const initialNumber = countingMode === 'asc' ? 1 : 20;
    setNumber(initialNumber);
    setAnimals(getRandomAnimals(initialNumber));
    setInput('');
    setFeedback('');
    setGameEnded(false);
    spokenNumberRef.current = null;
  };

  const checkAnswer = () => {
    if (parseInt(input) === number) {
      setFeedback('✅ ¡Muy bien!');
      speak('¡Muy bien!');
      setTimeout(nextQuestion, 1000);
    } else {
      setFeedback('❌ Intenta otra vez.');
      speak('Intenta otra vez');
    }
  };

  const changeCountingMode = (mode) => {
    setCountingMode(mode);
    const initialNumber = mode === 'asc' ? 1 : 20;
    setNumber(initialNumber);
    setAnimals(getRandomAnimals(initialNumber));
    setInput('');
    setFeedback('');
    setGameEnded(false);
    spokenNumberRef.current = null;
  };

  return (
    <div className="counter-container">
      <div className="nav-buttons">
        <button className="back-button2" onClick={() => navigate(-1)}>🔙 Regresar</button>
      </div>
      
      <h2>🐾 ¿Cuántos animalitos hay?</h2>
      
      <div className="mode-selector">
        <button 
          className={countingMode === 'asc' ? 'active' : ''}
          onClick={() => changeCountingMode('asc')}
        >
          Ascendente (1 a 20)
        </button>
        <button 
          className={countingMode === 'desc' ? 'active' : ''}
          onClick={() => changeCountingMode('desc')}
        >
          Descendente (20 a 1)
        </button>
      </div>

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

export default AnimalCounterDs;