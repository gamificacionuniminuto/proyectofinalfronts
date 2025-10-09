// MaterialFigurasGeometricas.jsx
import React, { useState } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

export default function MaterialFigurasGeometricas() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [respuestas, setRespuestas] = useState(["", "", "", ""]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleCompletado = () => {
    if (!completado) {
      setCompletado(true);
      hablar("¡Muy bien! Has completado esta guía. Ahora puedes practicar con el juego de figuras.");
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
      respuestas[0] === "3", // triángulo
      respuestas[1] === "4", // cuadrado
      respuestas[2] === "0", // círculo
      respuestas[3] === "4"  // rectángulo
    ];

    const todasCorrectas = correctas.every(c => c);

    if (todasCorrectas) {
      hablar("¡Perfecto! Todas tus respuestas son correctas. Muy bien hecho.");
    } else {
      hablar("Revisa tus respuestas. Algo no está bien. Recuerda cuántos lados tienen cada figura.");
    }

    setMostrarResultado(true);
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>🔷 Figuras Geométricas</h2>
        <p><strong>Nivel:</strong>  Primaria</p>
        
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar(
            "Vamos a conocer las figuras geométricas: triángulo, cuadrado, círculo y rectángulo. Aprende cuántos lados y vértices tienen cada una."
          )
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Contenido */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Qué es una figura geométrica?</h3>
        <p>Es una forma que tiene un nombre, lados y vértices. Las más comunes son:</p>

        <div style={styles.figurasGrid}>
          {/* Triángulo */}
          <div style={styles.figuraBox}>
            <svg width="80" height="80" viewBox="0 0 100 100" style={styles.svg}>
              <polygon points="50,10 10,90 90,90" fill="#FFCCBC" stroke="#E65100" strokeWidth="3" />
            </svg>
            <div style={styles.figuraNombre}>Triángulo</div>
            <div style={styles.figuraLados}>3 lados</div>
          </div>

          {/* Cuadrado */}
          <div style={styles.figuraBox}>
            <svg width="80" height="80" viewBox="0 0 100 100" style={styles.svg}>
              <rect x="10" y="10" width="80" height="80" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="3" />
            </svg>
            <div style={styles.figuraNombre}>Cuadrado</div>
            <div style={styles.figuraLados}>4 lados</div>
          </div>

          {/* Círculo */}
          <div style={styles.figuraBox}>
            <svg width="80" height="80" viewBox="0 0 100 100" style={styles.svg}>
              <circle cx="50" cy="50" r="40" fill="#BBDEFB" stroke="#1565C0" strokeWidth="3" />
            </svg>
            <div style={styles.figuraNombre}>Círculo</div>
            <div style={styles.figuraLados}>0 lados</div>
          </div>

          {/* Rectángulo */}
          <div style={styles.figuraBox}>
            <svg width="80" height="80" viewBox="0 0 100 100" style={styles.svg}>
              <rect x="15" y="20" width="70" height="60" fill="#F8BBD0" stroke="#C2185B" strokeWidth="3" />
            </svg>
            <div style={styles.figuraNombre}>Rectángulo</div>
            <div style={styles.figuraLados}>4 lados</div>
          </div>
        </div>

        <h3 style={styles.subtitle}>📌 Características</h3>
        <ul style={styles.list}>
          <li><strong>Triángulo:</strong> Tiene 3 lados y 3 vértices.</li>
          <li><strong>Cuadrado:</strong> Tiene 4 lados iguales y 4 vértices.</li>
          <li><strong>Rectángulo:</strong> Tiene 4 lados (2 pares iguales) y 4 vértices.</li>
          <li><strong>Círculo:</strong> No tiene lados ni vértices. Es redondo.</li>
        </ul>
      </div>

      {/* Actividad */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ ¿Cuántos lados tiene cada figura?</h3>
        <ul style={styles.list}>
          <li>
            Triángulo: 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[0]}
              onChange={(e) => handleChange(0, e.target.value)}
              placeholder="?"
              style={styles.input}
            /> lados
            {mostrarResultado && respuestas[0] === "3" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[0] && respuestas[0] !== "3" && <span style={styles.incorrect}> ❌ (era 3)</span>}
          </li>
          <li>
            Cuadrado: 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[1]}
              onChange={(e) => handleChange(1, e.target.value)}
              placeholder="?"
              style={styles.input}
            /> lados
            {mostrarResultado && respuestas[1] === "4" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[1] && respuestas[1] !== "4" && <span style={styles.incorrect}> ❌ (era 4)</span>}
          </li>
          <li>
            Círculo: 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[2]}
              onChange={(e) => handleChange(2, e.target.value)}
              placeholder="?"
              style={styles.input}
            /> lados
            {mostrarResultado && respuestas[2] === "0" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[2] && respuestas[2] !== "0" && <span style={styles.incorrect}> ❌ (era 0)</span>}
          </li>
          <li>
            Rectángulo: 
            <input
              type="text"
              inputMode="numeric"
              value={respuestas[3]}
              onChange={(e) => handleChange(3, e.target.value)}
              placeholder="?"
              style={styles.input}
            /> lados
            {mostrarResultado && respuestas[3] === "4" && <span style={styles.correct}> ✅</span>}
            {mostrarResultado && respuestas[3] && respuestas[3] !== "4" && <span style={styles.incorrect}> ❌ (era 4)</span>}
          </li>
        </ul>
      </div>

      {/* Botones */}
      <div style={styles.footer}>
        <button onClick={verificar} style={styles.checkBtn}>
          ✅ Verificar
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
  figurasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    margin: '15px 0',
    justifyContent: 'center'
  },
  figuraBox: {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  svg: {
    display: 'block',
    margin: '0 auto'
  },
  figuraNombre: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '8px',
    color: '#333'
  },
  figuraLados: {
    fontSize: '14px',
    color: '#555',
    fontStyle: 'italic'
  },
  list: {
    paddingLeft: '20px',
    margin: '10px 0'
  },
  input: {
    width: '50px',
    height: '30px',
    marginLeft: '8px',
    textAlign: 'center',
    fontSize: '16px',
    border: '2px solid #007acc',
    borderRadius: '6px'
  },
  activity: {
    backgroundColor: '#f0f8ff',
    padding: '15px',
    borderRadius: '10px',
    border: '1px dashed #007acc',
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