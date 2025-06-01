import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contar20.css';

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

const AnimalCounter = () => {
  const [number, setNumber] = useState(1);
  const [input, setInput] = useState('');
  const [animals, setAnimals] = useState(getRandomAnimals(1));
  const [feedback, setFeedback] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const navigate = useNavigate();

  // Ref para controlar si ya se habló para el número actual
  const spokenNumberRef = useRef(null);

  // Hablar pregunta solo cuando cambia number y no se ha hablado antes para ese número
  useEffect(() => {
    if (!gameEnded && spokenNumberRef.current !== number) {
      speak('¿Cuántos animalitos hay?');
      spokenNumberRef.current = number;
    }
  }, [number, gameEnded]);

  const nextQuestion = () => {
    const newNumber = number + 1;
    if (newNumber > 20) {
      setGameEnded(true);
      setFeedback('🎉 ¡Has contado hasta 20! ¡Excelente trabajo!');
      speak('¡Has contado hasta 20! ¡Excelente trabajo!');
    } else {
      setNumber(newNumber);
      setAnimals(getRandomAnimals(newNumber));
      setInput('');
      setFeedback('');      
    }
  };

  const restartGame = () => {
    setNumber(1);
    setAnimals(getRandomAnimals(1));
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

  return (
    <div className="counter-container">
          <div className="nav-buttons">
        <button className="back-button2" onClick={() => navigate(-1)}>🔙 Regresar</button>
      </div>
      <h2>🐾 ¿Cuántos animalitos hay?</h2>

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

export default AnimalCounter;





