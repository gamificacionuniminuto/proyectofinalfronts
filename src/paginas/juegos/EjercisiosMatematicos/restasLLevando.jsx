import React, { useState, useEffect } from "react";
import "./restasLLevando.css";

function generateRandomNumbers() {
  let minuend = Math.floor(10 + Math.random() * 90);
  let subtrahend = Math.floor(10 + Math.random() * minuend);
  return [minuend, subtrahend];
}

function splitDigits(num) {
  return num.toString().padStart(2, "0").split("").map(Number);
}

const RestasLLevando = () => {
  const [[minuend, subtrahend], setNumbers] = useState(generateRandomNumbers());
  const [inputs, setInputs] = useState(["", ""]);
  const [llevada, setLlevada] = useState([0, 0]);
  const [showCambio, setShowCambio] = useState([false, false]);
  const [result, setResult] = useState(null);
  const [columnaActiva, setColumnaActiva] = useState(1); // 1=unidades, 0=decenas

  const minuendDigits = splitDigits(minuend);
  const subtrahendDigits = splitDigits(subtrahend);

  useEffect(() => {
    explicarColumna(columnaActiva);
  }, [columnaActiva]);

  const explicarColumna = (col) => {
    let texto =
      col === 1
        ? "Vamos a comenzar por las unidades. Si el número de arriba es menor que el de abajo, debemos pedir prestado a la columna de las decenas."
        : "Ahora pasamos a las decenas. Restamos normalmente o usando la llevada si es necesario.";
    hablar(texto);
  };

  const hablar = (texto) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    synth.speak(utter);
  };

  const handleInputChange = (idx, value) => {
    const newInputs = [...inputs];
    newInputs[idx] = value.replace(/[^0-9]/g, "");
    setInputs(newInputs);
    if (idx === columnaActiva) {
      setColumnaActiva(columnaActiva - 1);
    }
  };

  const handleLlevadaChange = (idx, value) => {
    const newLlevada = [...llevada];
    newLlevada[idx] = value.replace(/[^0-9]/g, "");
    setLlevada(newLlevada);
  };

const [editableMinuend, setEditableMinuend] = useState(splitDigits(minuend));

useEffect(() => {
  setEditableMinuend(splitDigits(minuend));
}, [minuend]);

const handlePrestar = (idx) => {
  const newDigits = [...editableMinuend];

  // Solo prestamos si no estamos en la columna más a la izquierda
  if (idx > 0 && newDigits[idx - 1] > 0) {
    newDigits[idx] += 10;        // sumamos 10 a la columna actual
    newDigits[idx - 1] -= 1;     // restamos 1 a la columna anterior
    setEditableMinuend(newDigits);
    setShowCambio((prev) => {
      const arr = [...prev];
      arr[idx] = true;
      return arr;
    });
    hablar("Hemos pedido prestado. Sumamos diez a esta columna y restamos uno a la anterior.");
  }
};


  const handleCheck = () => {
    const correct = minuend - subtrahend;
    const userAnswer = parseInt(inputs.join(""), 10);
    setResult(userAnswer === correct ? "¡Correcto!" : "Intenta de nuevo");
    hablar(userAnswer === correct ? "Muy bien, el resultado es correcto" : "No es correcto, inténtalo de nuevo");
  };

  const handleNew = () => {
    setNumbers(generateRandomNumbers());
    setInputs(["", ""]);
    setLlevada([0, 0]);
    setShowCambio([false, false]);
    setResult(null);
    setColumnaActiva(1);
  };

  return (
    <div className="resta-container">
      <h2>Restas llevando</h2>

      {/* Flecha animada */}
      <div className="flechas-container">
        {minuendDigits.map((_, idx) => (
          <div key={idx} className="flecha-columna">
            {idx === columnaActiva && <div className="flecha-animada">⬇️</div>}
          </div>
        ))}
      </div>

      {/* Llevada */}
      <div className="fila-llevada">
        {minuendDigits.map((_, idx) => (
          <input
            key={idx}
            className="llevada-input"
            type="text"
            value={llevada[idx]}
            onChange={(e) => handleLlevadaChange(idx, e.target.value)}
          />
        ))}
      </div>

      {/* Minuendo */}
     {/* Minuendo */}
<div className="fila-digitos">
  {editableMinuend.map((digit, idx) => (
    <div key={idx} className="digito-box">
      {digit}
      <button
        className="prestar-btn"
        onClick={() => handlePrestar(idx)}
        disabled={showCambio[idx]}
      >
        Prestar
      </button>
    </div>
  ))}
</div>


      {/* Sustraendo */}
      <div className="fila-digitos">
        {subtrahendDigits.map((digit, idx) => (
          <div key={idx} className="digito-box">{digit}</div>
        ))}
      </div>

      {/* Línea */}
      <div className="linea-resta"></div>

      {/* Respuesta */}
     {/* Respuesta */}
<div className="fila-digitos">
  {inputs.map((value, idx) => (
    <input
      key={idx}
      className="respuesta-input"
      type="text"
      value={value}
      onChange={(e) => handleInputChange(idx, e.target.value)}
      // maxLength={1} ← ❌ Quitar esto
    />
  ))}
</div>
<button className="btn btn-tertiary" onClick={() => window.history.back()}>
    Regresar
</button>


      {/* Botones */}
      <button className="btn btn-primary" onClick={handleCheck}>Comprobar</button>
      {result && (
        <div className={`resultado ${result === "¡Correcto!" ? "correcto" : "incorrecto"}`}>
          {result}
        </div>
      )}
      <button className="btn btn-secondary" onClick={handleNew}>Nuevo ejercicio</button>
    </div>
  );
};

export default RestasLLevando;
