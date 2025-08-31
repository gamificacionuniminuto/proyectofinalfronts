import React, { useState, useEffect } from "react";

// ===== Datos de problemas =====
const PROBLEMAS = [
  { pregunta: "Juan tenía 245 manzanas y compró 378 más. ¿Cuántas tiene ahora?", numeros: [245, 378], respuesta: 623, operacion: "suma" },
  { pregunta: "Un colegio tenía 1245 estudiantes, se retiraron 368. ¿Cuántos estudiantes quedan?", numeros: [1245, 368], respuesta: 877, operacion: "resta" },
];

const styles = {
  contenedor: {
    maxWidth: "500px",
    margin: "30px auto",
    padding: "30px",
    background: "#f7f7f7",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  titulo: {
    fontSize: "28px",
    marginBottom: "18px",
    color: "#333",
  },
  pregunta: {
    fontSize: "20px",
    marginBottom: "14px",
    color: "#444",
  },
  input: {
    fontSize: "18px",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "180px",
    textAlign: "center",
  },
  boton: {
    fontSize: "18px",
    padding: "10px 22px",
    margin: "10px 6px",
    borderRadius: "6px",
    border: "none",
    background: "#4caf50",
    color: "#fff",
    cursor: "pointer",
  },
  botonSecundario: {
    fontSize: "16px",
    padding: "8px 18px",
    margin: "8px 6px",
    borderRadius: "6px",
    border: "none",
    background: "#f1c40f",
    color: "#333",
    cursor: "pointer",
  },
  botonRegresar: {
    fontSize: "16px",
    padding: "8px 18px",
    margin: "18px 0 0 0",
    borderRadius: "6px",
    border: "none",
    background: "#3498db",
    color: "#fff",
    cursor: "pointer",
  },
  mensaje: {
    fontSize: "18px",
    margin: "12px 0",
    fontWeight: "bold",
  },
  explicacion: {
    background: "#fffbe6",
    border: "1px solid #ffe58f",
    borderRadius: "8px",
    padding: "18px",
    margin: "18px auto",
    maxWidth: "400px",
    textAlign: "left",
  },
  linea: {
    fontFamily: "monospace",
    fontSize: "22px",
    margin: "4px 0",
    textAlign: "right",
  },
};

export default function JuegoProblemas() {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [paso, setPaso] = useState(0);

  const problemaActual = PROBLEMAS[indice];

  const hablar = (texto) => {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  const verificarRespuesta = () => {
    if (parseInt(respuesta) === problemaActual.respuesta) {
      setMensaje("✅ ¡Muy bien! Respuesta correcta.");
      hablar("Muy bien, respuesta correcta");
      setMostrarExplicacion(false);

      setTimeout(() => {
        if (indice < PROBLEMAS.length - 1) {
          setIndice(indice + 1);
          setRespuesta("");
          setMensaje("");
        } else {
          setMensaje("🎉 ¡Felicidades! Has terminado todos los problemas.");
          hablar("Felicidades, has terminado todos los problemas");
        }
      }, 2000);
    } else {
      setMensaje("❌ Respuesta incorrecta. Inténtalo de nuevo.");
      hablar("Respuesta incorrecta. Vamos a ver cómo resolverlo paso a paso.");
      setMostrarExplicacion(true);
      setPaso(0);
    }
  };

  // ==== Explicación paso a paso ====
  const pasosExplicacion = () => {
    const [a, b] = problemaActual.numeros;
    const digA = String(a).padStart(4, " ");
    const digB = String(b).padStart(4, " ");
    const resultado = String(problemaActual.respuesta).padStart(4, " ");

    const pasos = [];

    // Paso 1: colocar los números
    pasos.push(
      <div key="colocar">
        <p>Primero colocamos los números uno debajo del otro, bien alineados:</p>
        <pre style={styles.linea}>{digA}</pre>
        <pre style={styles.linea}>
          {problemaActual.operacion === "suma" ? "+" : "-"} {digB}
        </pre>
      </div>
    );

    // Paso 2: unidades
    pasos.push(
      <div key="unidades">
        <p>Ahora resolvemos la columna de las unidades:</p>
        <p>
          {digA[3]} {problemaActual.operacion === "suma" ? "+" : "-"} {digB[3]}
        </p>
      </div>
    );

    // Paso 3: decenas
    pasos.push(
      <div key="decenas">
        <p>Seguimos con la columna de las decenas:</p>
        <p>
          {digA[2]} {problemaActual.operacion === "suma" ? "+" : "-"} {digB[2]}
        </p>
      </div>
    );

    // Paso 4: centenas o millares
    pasos.push(
      <div key="centenas">
        <p>Ahora resolvemos las centenas (y miles si hay):</p>
        <p>
          {digA[1]} {problemaActual.operacion === "suma" ? "+" : "-"} {digB[1]}
        </p>
      </div>
    );

    // Paso final: resultado completo
    pasos.push(
      <div key="resultado">
        <p>Finalmente, el resultado completo es:</p>
        <pre style={styles.linea}>{digA}</pre>
        <pre style={styles.linea}>
          {problemaActual.operacion === "suma" ? "+" : "-"} {digB}
        </pre>
        <hr style={{ width: "120px", margin: "5px auto", border: "1px solid black" }} />
        <pre style={styles.linea}>{resultado}</pre>
      </div>
    );

    return pasos.slice(0, paso + 1);
  };

  useEffect(() => {
    if (mostrarExplicacion && paso < 4) {
      const timer = setTimeout(() => setPaso(paso + 1), 4000); // cada 4 seg avanza un paso
      return () => clearTimeout(timer);
    }
  }, [mostrarExplicacion, paso]);

  const intentarDeNuevo = () => {
    setRespuesta("");
    setMensaje("");
    setMostrarExplicacion(false);
    setPaso(0);
  };

  // ... tu código igualito como lo tienes arriba ...

  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>🧮 Juego de Problemas de Suma y Resta</h1>
      <p style={styles.pregunta}>{problemaActual.pregunta}</p>

      <input
        type="number"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta"
        style={styles.input}
      />
      <br />
      <button onClick={verificarRespuesta} style={styles.boton}>Responder</button>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

      {mostrarExplicacion && (
        <div style={styles.explicacion}>
          {pasosExplicacion()}
          <button onClick={() => hablar("Repitiendo la explicación paso a paso")} style={styles.boton}>
            🔊 Repetir explicación
          </button>
          <button onClick={intentarDeNuevo} style={styles.botonSecundario}>
            🔄 Intentar de nuevo
          </button>
        </div>
      )}

      <br />
      <button onClick={() => window.location.href = "/clases"}  style={styles.botonRegresar}>
        ⬅️ Regresar a clases
      </button>

      {/* === MEDIA QUERIES === */}
      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 22px !important;
          }
          p {
            font-size: 16px !important;
          }
          input {
            width: 100% !important;
            font-size: 16px !important;
          }
          button {
            width: 100% !important;
            font-size: 16px !important;
            padding: 12px !important;
          }
          pre {
            font-size: 18px !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 20px !important;
          }
          p {
            font-size: 14px !important;
          }
          input {
            font-size: 14px !important;
          }
          button {
            font-size: 14px !important;
            padding: 10px !important;
          }
          pre {
            font-size: 16px !important;
          }
          div {
            padding: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
