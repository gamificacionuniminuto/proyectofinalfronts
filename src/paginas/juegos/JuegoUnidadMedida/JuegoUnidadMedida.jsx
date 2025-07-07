import React, { useState, useEffect } from "react";
import "./JuegoUnidadMedida.css";

const problemas = [
  {
    enunciado: "María compró 2 metros de cinta para envolver regalos. Si usó 50 centímetros, ¿cuánto le queda?",
    opciones: ["150 cm", "1.5 m", "2.5 m", "50 m"],
    respuesta: "1.5 m",
  },
  {
    enunciado: "Pedro recorrió 3000 metros en bicicleta. ¿Cuántos kilómetros recorrió?",
    opciones: ["0.3 km", "3 km", "30 km", "300 km"],
    respuesta: "3 km",
  },
  {
    enunciado: "Una botella tiene 2 litros de agua. Si se sirve 500 mililitros, ¿cuánto queda?",
    opciones: ["1.5 L", "1 L", "2.5 L", "500 L"],
    respuesta: "1.5 L",
  },
  {
    enunciado: "Una caja pesa 1500 gramos. ¿Cuántos kilogramos son?",
    opciones: ["1.5 kg", "15 kg", "0.15 kg", "150 kg"],
    respuesta: "1.5 kg",
  },
  {
    enunciado: "Un libro mide 30 centímetros de largo. ¿Cuántos metros son?",
    opciones: ["0.3 m", "3 m", "30 m", "0.03 m"],
    respuesta: "0.3 m",
  },
];

const UsoUnidadMedida = () => {
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState(null);
  const [resultado, setResultado] = useState("");
  const problemaActual = problemas[indice];

  useEffect(() => {
    leerTexto(problemaActual.enunciado);
    setSeleccion(null);
    setResultado("");
  }, [indice]);

  const leerTexto = (texto) => {
    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "es-ES";
    speech.pitch = 1;
    speech.rate = 0.95;
    window.speechSynthesis.speak(speech);
  };

  const verificarRespuesta = () => {
    if (!seleccion) return;
    const esCorrecta = seleccion === problemaActual.respuesta;
    const mensaje = esCorrecta ? "¡Correcto!" : "Incorrecto. Intenta de nuevo.";
    leerTexto(mensaje);
    setResultado(mensaje);
  };

  const siguienteProblema = () => {
    if (indice < problemas.length - 1) {
      setIndice(indice + 1);
    }
  };

  const regresarProblema = () => {
    if (indice > 0) {
      setIndice(indice - 1);
    }
  };

  return (
    <div className="unidad-medida-contenedor">
      <h2>Uso de unidad de medida</h2>
      <p className="enunciado">{problemaActual.enunciado}</p>
      <div className="opciones">
        {problemaActual.opciones.map((opcion, i) => (
          <button
            key={i}
            onClick={() => setSeleccion(opcion)}
            className={seleccion === opcion ? "opcion seleccionada" : "opcion"}
          >
            {opcion}
          </button>
        ))}
      </div>
      <div className="botones">
        <button onClick={regresarProblema} disabled={indice === 0}>
          ⬅ Regresar
        </button>
        <button onClick={verificarRespuesta}>✅ Verificar</button>
        <button onClick={siguienteProblema} disabled={indice === problemas.length - 1}>
          Siguiente ➡
        </button>
      </div>
      {resultado && <div className="resultado">{resultado}</div>}
    </div>
  );
};

export default UsoUnidadMedida;
