import React, { useState, useEffect } from "react";
import "./fraccionesBasicas.css";

const ejercicios = [
  { id: 1, fraccion: "1/2", imagen: "🟪⬜", texto: "Un medio: la figura está dividida en dos partes y una está coloreada." },
  { id: 2, fraccion: "1/3", imagen: "🟩⬜⬜", texto: "Un tercio: la figura está dividida en tres partes y una está coloreada." },
  { id: 3, fraccion: "2/3", imagen: "🟩🟩⬜", texto: "Dos tercios: dos de las tres partes están coloreadas." },
  { id: 4, fraccion: "1/4", imagen: "🟦⬜⬜⬜", texto: "Un cuarto: de cuatro partes, una está coloreada." },
  { id: 5, fraccion: "3/4", imagen: "🟦🟦🟦⬜", texto: "Tres cuartos: tres de cuatro partes están coloreadas." },
  { id: 6, fraccion: "1/5", imagen: "🟥⬜⬜⬜⬜", texto: "Un quinto: una de cinco partes está coloreada." },
  { id: 7, fraccion: "2/5", imagen: "🟥🟥⬜⬜⬜", texto: "Dos quintos: dos de cinco partes están coloreadas." },
  { id: 8, fraccion: "4/5", imagen: "🟥🟥🟥🟥⬜", texto: "Cuatro quintos: cuatro de cinco partes están coloreadas." },
];

export default function JuegoFracciones() {
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");

  const actual = ejercicios[indice];

  /** ---- Función para hablar ---- */
  const hablar = (texto) => {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "es-ES";
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    hablar(`Observa esta figura. ${actual.texto} ¿Cuál es la fracción correcta?`);
  }, [indice]);

  const opciones = ["1/2", "1/3", "2/3", "1/4", "3/4", "1/5", "2/5", "4/5"];

  const responder = (opcion) => {
    if (opcion === actual.fraccion) {
      setPuntaje(puntaje + 1);
      setMensaje("¡Correcto! 🎉");
      hablar("¡Muy bien! Has respondido correctamente.");
    } else {
      setMensaje("Ups, intenta de nuevo ❌");
      hablar("Esa no es la fracción correcta. Inténtalo otra vez.");
    }
  };

  const siguiente = () => {
    if (indice < ejercicios.length - 1) {
      setIndice(indice + 1);
      setMensaje("");
    } else {
      hablar(`Juego terminado. Tu puntaje final es ${puntaje} de ${ejercicios.length}.`);
      setMensaje(`Juego terminado ✅ Tu puntaje final es ${puntaje}/${ejercicios.length}`);
    }
  };

  const repetir = () => {
    setIndice(0);
    setPuntaje(0);
    setMensaje("");
    hablar("Vamos a repetir el juego desde el inicio. Presta mucha atención a las fracciones.");
  };

  return (
    <div className="juego-fracciones">
      <h1>🎲 Juego de Fracciones Básicas</h1>
      <p className="instrucciones">Escucha la explicación y selecciona la fracción correcta.</p>

      <div className="tarjeta2">
        <h2>{actual.imagen}</h2>
        <p className="explicacion2">{actual.texto}</p>
      </div>

      <div className="opciones1">
        {opciones.map((op, i) => (
          <button key={i} onClick={() => responder(op)} className="opcion-btn">
            {op}
          </button>
        ))}
      </div>

      <p className="mensaje2">{mensaje}</p>
      <p className="puntaje2">Puntaje: {puntaje}</p>

      <div className="controles2">
        <button onClick={siguiente} className="control-btn2">➡️ Siguiente</button>
        <button onClick={repetir} className="control-btn3">🔄 Repetir Juego</button>
        <button onClick={() => alert("Regresando a clases...")} className="control-btn">🏫 Regresar a Clases</button>
      </div>
    </div>
  );
}
