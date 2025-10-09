// MaterialSumasRestasLlevadas.jsx
import React, { useState } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

export default function MaterialSumasRestasLlevadas() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [respuestas, setRespuestas] = useState(["", "", "", ""]);
  const [orden, setOrden] = useState(["", "", "", ""]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ordenCorrecto, setOrdenCorrecto] = useState(false);

  const resultados = [83, 83, 25, 26]; // respuestas de las operaciones
  const ordenIdeal = ["25", "26", "83", "83"]; // orden correcto de menor a mayor

  const handleCompletado = () => {
    if (!completado && (respuestas.every(r => r !== "") || mostrarResultado)) {
      setCompletado(true);
      hablar("¡Muy bien! Has completado esta guía. Ahora puedes practicar con el juego.");
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

  const handleOrden = (index, value) => {
    if (/^\d*$/.test(value)) {
      const nuevoOrden = [...orden];
      nuevoOrden[index] = value;
      setOrden(nuevoOrden);
    }
  };

  const verificarResultado = () => {
    const todasCorrectas = respuestas.every((r, i) => r === resultados[i].toString());
    const ordenCorrectoCheck = orden.every((val, i) => val === ordenIdeal[i]);

    setMostrarResultado(true);
    setOrdenCorrecto(ordenCorrectoCheck);

    if (todasCorrectas && ordenCorrectoCheck) {
      hablar("¡Perfecto! Todas tus respuestas y el orden son correctos. ¡Excelente trabajo!");
    } else if (!todasCorrectas && !ordenCorrectoCheck) {
      hablar("Revisa las operaciones y el orden. Algo no está bien.");
    } else if (!todasCorrectas) {
      hablar("Revisa las operaciones. Algunas no están bien.");
    } else {
      hablar("El orden de los números no es correcto. Recuerda: de menor a mayor.");
    }
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>➕➖ Sumas y Restas con Llevadas</h2>
        <p><strong>Nivel:</strong> Primaria</p>
        
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar(
            "Aprende a sumar y restar con llevadas. En las sumas, si el resultado es 10 o más, llevamos 1 a la izquierda. En las restas, si el número de arriba es más pequeño, pedimos prestado."
          )
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Contenido */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Qué es "llevamos 1"?</h3>
        <p>
          Cuando sumas dos dígitos y el resultado es <strong>10 o más</strong>, escribes solo el último dígito y llevas el otro a la columna de la izquierda.
        </p>
        <pre style={styles.example}>
{`   1
   47
+  36
─────
   83`}
        </pre>
        <p><strong>7 + 6 = 13</strong> → Escribimos 3, llevamos 1. Luego 4 + 3 + 1 = 8.</p>

        <h3 style={styles.subtitle}>📌 ¿Qué es "pedir prestado"?</h3>
        <p>
          En restas, si el número de arriba es más pequeño, pides prestado de la izquierda.
        </p>
        <pre style={styles.example}>
{`  4 12
   52
-  27
─────
   25`}
        </pre>
        <p><strong>2  7</strong> → Pedimos prestado: 12 - 7 = 5. Decenas: 4 - 2 = 2.</p>

        <h3 style={styles.subtitle}>🔢 Ordenar números</h3>
        <p>Después de resolver, ordena los resultados de menor a mayor:</p>
        <p>Ejemplo: 83, 25, 92, 47 → <strong>25  26  83  83</strong></p>
      </div>

      {/* Actividad con entrada */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ Resuelve y ordena</h3>
        <ul style={styles.list}>
          {[
            "47 + 36 = ",
            "58 + 25 = ",
            "52 - 27 = ",
            "71 - 45 = "
          ].map((texto, i) => (
            <li key={i}>
              {texto}
              <input
                type="text"
                value={respuestas[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                placeholder="?"
                style={styles.input}
              />
              {mostrarResultado && respuestas[i] === resultados[i].toString() && (
                <span style={styles.correct}> ✅</span>
              )}
              {mostrarResultado && respuestas[i] && respuestas[i] !== resultados[i].toString() && (
                <span style={styles.incorrect}> ❌ (era {resultados[i]})</span>
              )}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: '15px' }}>
          <strong>Ordena de menor a mayor:</strong>
        </p>
        <div style={styles.ordenGrid}>
          {orden.map((val, i) => (
            <input
              key={i}
              type="text"
              value={val}
              onChange={(e) => handleOrden(i, e.target.value)}
              placeholder="?"
              style={styles.inputSmall}
            />
          ))}
        </div>
        {mostrarResultado && (
          <>
            {ordenCorrecto ? (
              <p style={styles.correct}>✅ ¡Muy bien! El orden es correcto: 25, 26, 83, 83</p>
            ) : (
              <p style={styles.incorrect}>
                ❌ El orden no es correcto. El correcto es: 25, 26, 83, 83
              </p>
            )}
          </>
        )}
      </div>

      {/* Botón verificar */}
      <div style={styles.footer}>
        <button onClick={verificarResultado} style={styles.checkBtn}>
          ✅ Verificar respuestas
        </button>

        <button onClick={handleCompletado} style={completado ? styles.completedBtnActive : styles.completedBtn}>
          {completado ? "✅ Completado" : "Marcar como leído"}
        </button>
        <button
            style={{
                backgroundColor: '#e67e22',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                margin: '10px 0'
            }}
            onClick={() => window.location.href = '/materiales'}
        >
            ← Regresar a materiales
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

// Estilos (sin cambios, pero incluidos por completitud)
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
  example: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    fontSize: '18px',
    textAlign: 'center',
    margin: '10px 0'
  },
  activity: {
    backgroundColor: '#e8f4f8',
    padding: '15px',
    borderRadius: '10px',
    border: '1px dashed #007acc',
    marginBottom: '20px',
    fontSize: '16px'
  },
  list: {
    margin: '10px 0',
    paddingLeft: '20px'
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
  inputSmall: {
    width: '60px',
    height: '30px',
    textAlign: 'center',
    fontSize: '16px',
    border: '2px solid #27ae60',
    borderRadius: '6px',
    margin: '0 5px'
  },
  ordenGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px'
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
    marginBottom: '10px',
    fontSize: '16px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px'
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