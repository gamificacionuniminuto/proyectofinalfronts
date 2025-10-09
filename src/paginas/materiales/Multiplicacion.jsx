// MaterialMultiplicacion.jsx
import React, { useState } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

export default function MaterialMultiplicacion() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [respuestas, setRespuestas] = useState(["", "", "", ""]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleCompletado = () => {
    if (!completado) {
      setCompletado(true);
      hablar("¡Muy bien! Has completado esta guía. Ahora puedes practicar con el juego de multiplicaciones.");
    }
  };

  const handleCalificacion = (estrellas) => {
    setCalificacion(estrellas);
    hablar(`Gracias por calificar con ${estrellas} estrellas.`);
  };

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const nuevas = [...respuestas];
      nuevas[index] = value;
      setRespuestas(nuevas);
    }
  };

  const verificar = () => {
    const correctas = [
      respuestas[0] === "6",  // 2×3
      respuestas[1] === "8",  // 4×2
      respuestas[2] === "15", // 3×5
      respuestas[3] === "12"  // 6×2
    ];

    const todasCorrectas = correctas.every(c => c);

    if (todasCorrectas) {
      hablar("¡Perfecto! Todas tus respuestas son correctas. Eres un campeón de las multiplicaciones.");
    } else {
      hablar("Revisa tus respuestas. Algo no está bien. Recuerda: multiplicar es sumar varias veces.");
    }

    setMostrarResultado(true);
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>✖️ Aprende a Multiplicar</h2>
     
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar(
            "Vamos a aprender a multiplicar. Multiplicar es sumar el mismo número varias veces. Por ejemplo, 3 por 4 es 3+3+3+3, que es 12. Vamos a practicar."
          )
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Contenido */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Qué es multiplicar?</h3>
        <p>
          Multiplicar es una forma rápida de <strong>sumar varias veces</strong> el mismo número.
        </p>
        <p>Ejemplo: <strong>3 × 4</strong> = 3 + 3 + 3 + 3 = <strong>12</strong></p>

        <h3 style={styles.subtitle}>📌 Tablas del 1 al 5</h3>
        <div style={styles.tabla}>
          {[
            "1×1=1", "1×2=2", "1×3=3", "1×4=4", "1×5=5",
            "2×1=2", "2×2=4", "2×3=6", "2×4=8", "2×5=10",
            "3×1=3", "3×2=6", "3×3=9", "3×4=12", "3×5=15"
          ].map((item, i) => (
            <span key={i} style={styles.celdaTabla}>
              {item}
            </span>
          ))}
        </div>

        <p><strong>Tip:</strong> La tabla del 2 es como contar de 2 en 2: 2, 4, 6, 8...</p>
      </div>

      {/* Actividad */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ Resuelve estas multiplicaciones</h3>
        <ul style={styles.list}>
          <li>
            2 × 3 = 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[0]}
              onChange={(e) => handleChange(0, e.target.value)}
              placeholder="?"
              style={styles.input}
            />
            {mostrarResultado && respuestas[0] === "6" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[0] && respuestas[0] !== "6" && <span style={styles.incorrect}> ❌ (era 6)</span>}
          </li>
          <li>
            4 × 2 = 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[1]}
              onChange={(e) => handleChange(1, e.target.value)}
              placeholder="?"
              style={styles.input}
            />
            {mostrarResultado && respuestas[1] === "8" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[1] && respuestas[1] !== "8" && <span style={styles.incorrect}> ❌ (era 8)</span>}
          </li>
          <li>
            3 × 5 = 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[2]}
              onChange={(e) => handleChange(2, e.target.value)}
              placeholder="?"
              style={styles.input}
            />
            {mostrarResultado && respuestas[2] === "15" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[2] && respuestas[2] !== "15" && <span style={styles.incorrect}> ❌ (era 15)</span>}
          </li>
          <li>
            6 × 2 = 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[3]}
              onChange={(e) => handleChange(3, e.target.value)}
              placeholder="?"
              style={styles.input}
            />
            {mostrarResultado && respuestas[3] === "12" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[3] && respuestas[3] !== "12" && <span style={styles.incorrect}> ❌ (era 12)</span>}
          </li>
        </ul>
      </div>

      {/* Botones */}
      <div style={styles.footer}>
        <button onClick={verificar} style={styles.checkBtn}>
          ✅ Verificar respuestas
        </button>

        <button onClick={handleCompletado} style={completado ? styles.completedBtnActive : styles.completedBtn}>
          {completado ? "✅ Completado" : "Marcar como leído"}
        </button>

        <button
          onClick={() => (window.location.href = "/materiales")}
          style={styles.backButton}
        >
          ◀️ Regresar a Materiales
        </button>

        <div style={styles.rating}>
          <span>Califica: </span>
          {[1, 2, 3, 4, 5].map((estrella) => (
            <span
              key={estrella}
              onClick={() => handleCalificacion(estrella)}
              style={calificacion >= estrella ? styles.starFilled : styles.starEmpty}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Estilos
const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
    fontFamily: "'Comic Sans MS', 'Arial', sans-serif",
    border: '1px solid #e0e0e0'
  },
  header: {
    textAlign: 'center',
    marginBottom: '15px'
  },
  title: {
    color: '#007acc',
    margin: '0 0 10px 0',
    fontSize: '24px'
  },
  audioButton: {
    display: 'block',
    backgroundColor: '#ffcc00',
    color: '#333',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '20px',
    textAlign: 'center'
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '20px'
  },
  subtitle: {
    color: '#d35400',
    marginTop: '15px',
    fontSize: '18px'
  },
  tabla: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '5px',
    margin: '10px 0'
  },
  celdaTabla: {
    padding: '6px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px'
  },
  list: {
    paddingLeft: '20px',
    margin: '10px 0'
  },
  input: {
    width: '60px',
    height: '30px',
    marginLeft: '8px',
    textAlign: 'center',
    fontSize: '16px',
    border: '2px solid #007acc',
    borderRadius: '6px'
  },
  activity: {
    backgroundColor: '#fff3e0',
    padding: '15px',
    borderRadius: '10px',
    border: '1px dashed #ff9800',
    marginBottom: '20px'
  },
  correct: {
    color: '#27ae60',
    fontWeight: 'bold',
    marginLeft: '10px'
  },
  incorrect: {
    color: '#e74c3c',
    fontSize: '14px',
    marginLeft: '10px'
  },
  checkBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  completedBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  completedBtnActive: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'default'
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '10px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px'
  },
  rating: {
    marginTop: '10px',
    fontSize: '20px'
  },
  starEmpty: {
    color: '#ddd',
    cursor: 'pointer'
  },
  starFilled: {
    color: '#f39c12',
    cursor: 'pointer'
  }
};