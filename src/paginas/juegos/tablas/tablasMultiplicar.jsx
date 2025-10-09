import React, { useState, useEffect } from "react";
import "./tablas.css";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TablasJuego = ({ onVolver }) => {
  const [num1, setNum1] = useState(getRandomInt(1, 10));
  const [num2, setNum2] = useState(getRandomInt(1, 10));
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [vidas, setVidas] = useState(3);
  const [aciertos, setAciertos] = useState(0);
  const [historial, setHistorial] = useState([]);

  const hablar = (texto) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    synth.speak(utter);
  };

  // Explicación inicial
  useEffect(() => {
    hablar(`Resuelve la multiplicación: ${num1} por ${num2}`);
  }, [num1, num2]);

  const nuevaPregunta = () => {
    setNum1(getRandomInt(1, 10));
    setNum2(getRandomInt(1, 10));
    setRespuesta("");
    setMensaje("");
  };

  const comprobar = () => {
    const correcto = num1 * num2;
    const esCorrecto = parseInt(respuesta, 10) === correcto;

    setHistorial((prev) => [
      ...prev,
      { num1, num2, respuesta, correcto, esCorrecto }
    ]);

    if (esCorrecto) {
      setMensaje("✅ ¡Correcto!");
      hablar(`Muy bien, ${num1} por ${num2} es ${correcto}`);
      setAciertos(aciertos + 1);
      nuevaPregunta();
    } else {
      setMensaje(`❌ Incorrecto, la respuesta correcta era ${correcto}`);
      hablar(
        `Incorrecto, la respuesta correcta era ${correcto}. Para encontrarla, suma ${num1} consigo mismo ${num2} veces.`
      );
      setVidas(vidas - 1);
      if (vidas - 1 > 0) {
        nuevaPregunta();
      }
    }
  };

  const reiniciar = () => {
    setVidas(3);
    setAciertos(0);
    setHistorial([]);
    nuevaPregunta();
  };

  return (
    <div className="juego-tablas">
      <h2>Juego de Tablas de Multiplicar</h2>

<button className="btn btn-tertiary" onClick={() => window.history.back()}>
    Regresar
</button>
      {vidas > 0 ? (
        <>
          <p>
            <strong>Vidas:</strong> {vidas} ❤️ | <strong>Aciertos:</strong> {aciertos}
          </p>
          <h3>
            {num1} × {num2} = ?
          </h3>
          <input
            type="number"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && comprobar()}
          />
          <button onClick={comprobar}>Comprobar</button>
          {mensaje && <p className="mensaje">{mensaje}</p>}
        </>
      ) : (
        <>
          <h3>🎯 Juego terminado</h3>
          <p>Puntuación final: {aciertos}</p>
          <h4>📜 Resumen de preguntas</h4>
          <ul className="historial">
            {historial.map((item, idx) => (
              <li
                key={idx}
                style={{ color: item.esCorrecto ? "green" : "red" }}
              >
                {item.num1} × {item.num2} = {item.correcto} | 
                Tú respondiste: {item.respuesta || "Sin respuesta"}
              </li>
            ))}
          </ul>
          <button onClick={reiniciar}>Jugar de nuevo</button>
        </>
      )}
    </div>
  );
};

export default TablasJuego;
