import React, { useState, useEffect } from "react";

// 🎤 Función para narrar con voz
const speak = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  synth.speak(utterance);
};

export default function OperacionesCombinadas() {
  const [ejercicio, setEjercicio] = useState({});
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [ejemplo, setEjemplo] = useState(false);

  // 🔹 Generar operaciones combinadas aleatorias
  const generarEjercicio = () => {
    const num1 = Math.floor(Math.random() * 90 + 10); // 2 cifras
    const num2 = Math.floor(Math.random() * 90 + 10);
    const num3 = Math.floor(Math.random() * 9 + 2); // más pequeño para dividir
    const operadores = ["+", "-", "*", "/"];
    const op1 = operadores[Math.floor(Math.random() * operadores.length)];
    const op2 = operadores[Math.floor(Math.random() * operadores.length)];

    const expresion = `${num1} ${op1} ${num2} ${op2} ${num3}`;
    let resultado;

    try {
      resultado = eval(expresion).toFixed(2); // 2 decimales si hay división
    } catch (e) {
      resultado = 0;
    }

    setEjercicio({ expresion, resultado });
    setRespuesta("");
    setMensaje("");
    setEjemplo(false);

    const explicacion = `Recuerda: primero resuelve multiplicaciones o divisiones,
    y después las sumas o restas. Intenta resolver el ejercicio paso a paso.`;
    speak(explicacion);
  };

  useEffect(() => {
    generarEjercicio();
  }, []);

  // 🔹 Verificar respuesta
  const verificarRespuesta = () => {
    if (respuesta === ejercicio.resultado) {
      setMensaje("✅ ¡Muy bien! Respuesta correcta.");
      speak("Muy bien, respuesta correcta.");
      setEjemplo(false);
    } else {
      setMensaje("❌ Incorrecto. Vamos a ver cómo se resuelve paso a paso.");
      speak("Incorrecto. Vamos a ver cómo se resuelve paso a paso.");
      setEjemplo(true); // solo muestra ejemplo si se equivoca
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        margin: "40px auto",
        fontFamily: "Comic Sans MS, cursive, sans-serif",
        background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "#2c3e50", fontSize: "28px" }}>
        🧮 Juego de Operaciones Combinadas
      </h2>
      <p style={{ fontSize: "18px" }}>
        Escribe el resultado de la siguiente operación:
      </p>
      <h3
        style={{
          background: "#fff",
          display: "inline-block",
          padding: "10px 20px",
          borderRadius: "12px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
          fontSize: "24px",
        }}
      >
        {ejercicio.expresion}
      </h3>

      <br />
      <input
        type="text"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta"
        style={{
          padding: "10px",
          margin: "15px",
          fontSize: "18px",
          borderRadius: "8px",
          border: "2px solid #2c3e50",
          textAlign: "center",
        }}
      />
      <br />

      <button
        onClick={verificarRespuesta}
        style={botonStyle("#3498db")}
      >
        Verificar
      </button>
      <button
        onClick={generarEjercicio}
        style={botonStyle("#2ecc71")}
      >
        Nuevo ejercicio
      </button>
      <button
    onClick={() => window.location.href = "/clases"}
    style={botonStyle("#e67e22")}
    >
    Regresar a Clases
      </button>

      <p style={{ fontSize: "20px", marginTop: "15px" }}>{mensaje}</p>

      {ejemplo && (
        <div
          style={{
            backgroundColor: "#f0f8ff",
            border: "2px solid #3498db",
            borderRadius: "12px",
            padding: "15px",
            marginTop: "20px",
            textAlign: "left",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "2px 2px 12px rgba(0,0,0,0.2)",
          }}
        >
          <h4>📘 Ejemplo de desarrollo</h4>
          <p>
            Si el ejercicio es <b>{ejercicio.expresion}</b>:
            <br />
            1️⃣ Primero resolvemos multiplicaciones y divisiones. <br />
            2️⃣ Luego hacemos sumas y restas. <br />
            ✅ El resultado final es <b>{ejercicio.resultado}</b>.
          </p>
        </div>
      )}
    </div>
  );
}

// 🎨 Estilo de botones reutilizable
const botonStyle = (color) => ({
  backgroundColor: color,
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 20px",
  margin: "8px",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "2px 2px 6px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
});
/* 🎨 Estilos responsivos para pantallas pequeñas */
const style = document.createElement("style");
style.innerHTML = `
    @media (max-width: 600px) {
        body, #root, .App {
            min-height: 100vh !important;
            padding: 0 !important;
        }
        h2 {
            font-size: 22px !important;
        }
        h3 {
            font-size: 18px !important;
            padding: 8px 10px !important;
        }
        input {
            font-size: 16px !important;
            padding: 8px !important;
        }
        button {
            font-size: 14px !important;
            padding: 10px 12px !important;
            margin: 6px !important;
        }
        div[style*="maxWidth: 500px"] {
            max-width: 95vw !important;
            padding: 10px !important;
        }
    }
`;
document.head.appendChild(style);
