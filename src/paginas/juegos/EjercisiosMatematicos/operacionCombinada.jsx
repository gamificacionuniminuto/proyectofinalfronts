import React, { useState } from "react";

export default function JuegoOperacionesCombinadas() {
  const preguntas = [
    { 
      pregunta: "1. 5 + 3 × 2 = ?", 
      opciones: [16, 11, 10, 13], 
      respuesta: 11, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero se hace la multiplicación: 3 × 2 = 6", "Luego sumamos 5 + 6 = 11", "Respuesta: 11"]
    },
    { 
      pregunta: "2. (8 - 3) × 4 = ?", 
      opciones: [20, 25, 24, 18], 
      respuesta: 20, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero resolvemos el paréntesis: 8 - 3 = 5", "Luego multiplicamos 5 × 4 = 20", "Respuesta: 20"]
    },
    { 
      pregunta: "3. 18 ÷ (3 + 3) = ?", 
      opciones: [6, 3, 2, 4], 
      respuesta: 3, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero el paréntesis: 3 + 3 = 6", "Luego la división: 18 ÷ 6 = 3", "Respuesta: 3"]
    },
    { 
      pregunta: "4. 7 + 12 ÷ 4 = ?", 
      opciones: [19, 10, 12, 16], 
      respuesta: 10, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero la división: 12 ÷ 4 = 3", "Luego la suma: 7 + 3 = 10", "Respuesta: 10"]
    },
    { 
      pregunta: "5. (6 + 2) × (10 ÷ 5) = ?", 
      opciones: [16, 12, 14, 18], 
      respuesta: 16, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero paréntesis: 6 + 2 = 8", "Segundo paréntesis: 10 ÷ 5 = 2", "Luego multiplicamos: 8 × 2 = 16", "Respuesta: 16"]
    },
    { 
      pregunta: "6. 15 - 3 × 4 = ?", 
      opciones: [12, 3, 9, 5], 
      respuesta: 3, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero la multiplicación: 3 × 4 = 12", "Luego restamos: 15 - 12 = 3", "Respuesta: 3"]
    },
    { 
      pregunta: "7. (20 ÷ 4) + 6 = ?", 
      opciones: [11, 10, 12, 9], 
      respuesta: 11, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero el paréntesis: 20 ÷ 4 = 5", "Luego sumamos 5 + 6 = 11", "Respuesta: 11"]
    },
    { 
      pregunta: "8. 8 × 2 + 10 ÷ 5 = ?", 
      opciones: [17, 20, 16, 18], 
      respuesta: 17, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero multiplicación: 8 × 2 = 16", "Luego división: 10 ÷ 5 = 2", "Finalmente sumamos: 16 + 2 = 18", "Respuesta correcta: 18"]
    },
    { 
      pregunta: "9. (12 - 4) ÷ 2 + 5 = ?", 
      opciones: [9, 7, 10, 8], 
      respuesta: 9, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero paréntesis: 12 - 4 = 8", "Luego división: 8 ÷ 2 = 4", "Finalmente sumamos 4 + 5 = 9", "Respuesta: 9"]
    },
    { 
      pregunta: "10. 6 + 18 ÷ (3 × 2) = ?", 
      opciones: [7, 9, 10, 12], 
      respuesta: 9, 
      tipo: "operaciones combinadas", 
      explicacion: ["Primero paréntesis: 3 × 2 = 6", "Luego división: 18 ÷ 6 = 3", "Finalmente sumamos 6 + 3 = 9", "Respuesta: 9"]
    },
  ];

  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  const hablar = (texto) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(texto);
    utterThis.lang = "es-ES";
    synth.speak(utterThis);
  };

  const handleOpcion = (opcion) => {
    if (opcion === preguntas[indice].respuesta) {
      setFeedback("¡Correcto! 🎉");
      setAciertos(aciertos + 1);
      setMostrarExplicacion(false);
      hablar("¡Muy bien! " + preguntas[indice].explicacion.join(" "));
    } else {
      setFeedback(`Ups, la respuesta correcta era ${preguntas[indice].respuesta}`);
      setMostrarExplicacion(true);
      hablar("Incorrecto. " + preguntas[indice].explicacion.join(" "));
    }
    setShowNext(true);
  };

  const intentarDeNuevo = () => {
    setFeedback("");
    setMostrarExplicacion(false);
    setShowNext(false);
  };

  const siguientePregunta = () => {
    setFeedback("");
    setMostrarExplicacion(false);
    setShowNext(false);
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
    } 
  };

  const reiniciar = () => {
    setIndice(0);
    setFeedback("");
    setMostrarExplicacion(false);
    setShowNext(false);
    setAciertos(0);
  };

return (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f0f8ff",
            minHeight: "100vh",
        }}
    >
        <style>
            {`
                @media (max-width: 600px) {
                    .juego-container, .fin-container {
                        max-width: 95vw !important;
                        padding: 10px !important;
                    }
                    .juego-container h2, .fin-container h2 {
                        font-size: 1.2em !important;
                    }
                    .juego-container button, .fin-container button {
                        font-size: 1em !important;
                        padding: 8px 12px !important;
                    }
                    .explicacion-box {
                        font-size: 0.95em !important;
                        padding: 8px !important;
                    }
                }
            `}
        </style>
        <h1 style={{ color: "#0077b6" }}>Juego de Operaciones Combinadas</h1>

        {indice < preguntas.length ? (
            <div
                className="juego-container"
                style={{
                    backgroundColor: "#ade8f4",
                    padding: "20px",
                    borderRadius: "15px",
                    margin: "20px auto",
                    maxWidth: "500px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
            >
                <h3 style={{ color: "#023e8a" }}>
                    Tipo de problema: {preguntas[indice].tipo}
                </h3>
                <h2 style={{ color: "#023e8a" }}>{preguntas[indice].pregunta}</h2>

                {preguntas[indice].opciones.map((opcion, i) => (
                    <button
                        key={i}
                        onClick={() => handleOpcion(opcion)}
                        style={{
                            display: "block",
                            width: "80%",
                            margin: "10px auto",
                            padding: "10px",
                            fontSize: "18px",
                            borderRadius: "10px",
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "#0077b6",
                            color: "white",
                            transition: "0.3s",
                        }}
                    >
                        {opcion}
                    </button>
                ))}

                {feedback && (
                    <p
                        style={{
                            fontSize: "18px",
                            marginTop: "15px",
                            color: "#d00000",
                        }}
                    >
                        {feedback}
                    </p>
                )}

                {mostrarExplicacion && (
                    <div
                        className="explicacion-box"
                        style={{
                            backgroundColor: "#ffd6a5",
                            padding: "15px",
                            borderRadius: "10px",
                            marginTop: "10px",
                            color: "#000",
                            textAlign: "left",
                        }}
                    >
                        <strong>Explicación paso a paso:</strong>
                        <ul>
                            {preguntas[indice].explicacion.map((linea, i) => (
                                <li key={i}>{linea}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {mostrarExplicacion && (
                    <button
                        onClick={intentarDeNuevo}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#ff6700",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Intentar de nuevo
                    </button>
                )}

                {showNext && indice < preguntas.length - 1 && (
                    <button
                        onClick={siguientePregunta}
                        style={{
                            marginTop: "15px",
                            padding: "10px 20px",
                            fontSize: "16px",
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#00b4d8",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Siguiente
                    </button>
                )}

                <button
                    onClick={() => (window.location.href = "/clases")}
                    style={{
                        marginTop: "15px",
                        marginLeft: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#6a4c93",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Regresar a Clases
                </button>
            </div>
        ) : (
            <div
                className="fin-container"
                style={{
                    backgroundColor: "#90e0ef",
                    padding: "30px",
                    borderRadius: "15px",
                    margin: "20px auto",
                    maxWidth: "500px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
            >
                <h2>¡Felicidades! 🎉</h2>
                <p>Completaste todos los ejercicios.</p>
                <p>
                    Aciertos: {aciertos} de {preguntas.length}
                </p>
                <p>
                    Recuerda: primero se resuelven paréntesis, luego
                    multiplicaciones/divisiones y al final sumas/restas.
                </p>
                <button
                    onClick={reiniciar}
                    style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#00b4d8",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Jugar de nuevo
                </button>
                <button
                    onClick={() => (window.location.href = "/clases")}
                    style={{
                        marginTop: "15px",
                        marginLeft: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#6a4c93",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Regresar a Clases
                </button>
            </div>
        )}
    </div>
);
}
