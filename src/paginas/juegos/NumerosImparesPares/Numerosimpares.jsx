import { useState } from "react";
import { numbers } from "./numbersData";
import "./JuegoNumeros.css";

export default function OddNumbersGame() {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleClick = (num) => {
    if (selected.includes(num)) return;

    const isOdd = num % 2 !== 0; // Cambiado para detectar impares

    if (isOdd) {
      setScore(score + 1);
      setFeedback("¡Correcto! Es impar");
    } else {
      setScore(score - 1);
      setFeedback("Ups, ese es par. Intenta de nuevo");
    }

    setSelected([...selected, num]);

    // Ocultar el mensaje después de 1.5 segundos
    setTimeout(() => setFeedback(""), 1500);
  };

  const goBack = () => {
    window.location.href = '/Clases'; 
  };

  const restartGame = () => {
    setSelected([]);
    setScore(0);
    setFeedback("");
  };

  return (
    <div className="game-container">
      <button className="back-button4" onClick={goBack}>⬅ Regresar</button>

      <h2 className="title">Haz clic en los números impares del 1 al 50</h2> {/* Cambiado el texto */}

      <div className="grid">
        {numbers.map((num) => (
          <button
            key={num}
            className={`number-btn ${
              selected.includes(num)
                ? num % 2 !== 0 // Cambiada la condición para impares
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {feedback && <div className="feedback">{feedback}</div>}

      <div className="score">Puntaje: {score}</div>

      {/* Botón para reiniciar el juego */}
      <button className="retry-button" onClick={restartGame}>
        🔁 ¡Inténtalo de nuevo!
      </button>
    </div>
  );
}