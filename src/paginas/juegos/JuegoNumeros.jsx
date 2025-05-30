import { useState } from "react";
import { numbers } from "./numbersData";
import "./JuegoNumeros.css";

export default function EvenNumbersGame() {
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleClick = (num) => {
    if (selected.includes(num)) return;

    const isEven = num % 2 === 0;

    if (isEven) {
      setScore(score + 1);
      setFeedback("¡Correcto!");
    } else {
      setScore(score - 1);
      setFeedback("Ups, intenta de nuevo");
    }

    setSelected([...selected, num]);

    // Ocultar el mensaje después de 1.5 segundos
    setTimeout(() => setFeedback(""), 1500);
  };

  const goBack = () => {
    window.history.back();
  };

  const restartGame = () => {
    setSelected([]);
    setScore(0);
    setFeedback("");
  };

  return (
    <div className="game-container">
      <button className="back-button" onClick={goBack}>⬅ Regresar</button>

      <h2 className="title">Haz clic en los números pares del 1 al 50</h2>

      <div className="grid">
        {numbers.map((num) => (
          <button
            key={num}
            className={`number-btn ${
              selected.includes(num)
                ? num % 2 === 0
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



