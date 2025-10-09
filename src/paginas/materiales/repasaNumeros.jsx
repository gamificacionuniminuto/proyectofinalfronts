// MaterialNumeros1a50.jsx
import React, { useState } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

export default function MaterialNumeros1a50() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [actividad1, setActividad1] = useState(["", "", "", "", ""]);
  const [actividad2, setActividad2] = useState(["", "", "", "", ""]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleCompletado = () => {
    if (!completado) {
      setCompletado(true);
      hablar("¡Muy bien! Has completado esta guía. Ahora puedes practicar con el juego de números.");
    }
  };

  const handleCalificacion = (estrellas) => {
    setCalificacion(estrellas);
    hablar(`Gracias por calificar con ${estrellas} estrellas.`);
  };

  const verificar = () => {
    const correcta1 = actividad1.every((val, i) => val === (i + 27).toString()); // 27,28,29,30
    const correcta2 = actividad2.every((val, i) => val === (i + 47).toString()); // 47,48,49,50

    if (correcta1 && correcta2) {
      hablar("¡Perfecto! Llenaste todas las secuencias correctamente.");
    } else {
      hablar("Revisa los espacios vacíos. Algo no está bien.");
    }
    setMostrarResultado(true);
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>🔢 Conoce los números del 1 al 50</h2>
        <p><strong>Nivel:</strong> Primaria</p>
        
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar(
            "Vamos a conocer los números del uno al cincuenta. Escucha y repite: uno, dos, tres... hasta cincuenta. Fíjate en cómo se escriben y en el orden."
          )
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Contenido */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Cómo se ven los números?</h3>
        <p>Mira cómo se escriben los números:</p>
        <div style={styles.numerosGrid}>
          {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
            <span key={num} style={styles.numeroItem}>
              {num}
            </span>
          ))}
        </div>

        <p><strong>Tip:</strong> Los números van en orden: 1, 2, 3... cada uno es uno más que el anterior.</p>

        <h3 style={styles.subtitle}>📌 Secuencias numéricas</h3>
        <p>Completa los números que faltan:</p>
        <p><strong>Del 26 al 30:</strong> 26, ___, ___, ___, ___, 31</p>
        <p><strong>Del 46 al 50:</strong> 46, ___, ___, ___, ___, 51</p>
      </div>

      {/* Actividad interactiva */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ Escribe los números que faltan</h3>
        <p><strong>Del 27 al 30:</strong></p>
        <div style={styles.ordenGrid}>
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              value={actividad1[i]}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  const nuevas = [...actividad1];
                  nuevas[i] = val;
                  setActividad1(nuevas);
                }
              }}
              placeholder="?"
              style={styles.inputSmall}
            />
          ))}
        </div>

        <p><strong>Del 47 al 50:</strong></p>
        <div style={styles.ordenGrid}>
          {[0, 1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              value={actividad2[i]}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  const nuevas = [...actividad2];
                  nuevas[i] = val;
                  setActividad2(nuevas);
                }
              }}
              placeholder="?"
              style={styles.inputSmall}
            />
          ))}
        </div>

        {mostrarResultado && (
          <>
            {actividad1.every((v, i) => v === (i + 27).toString()) ? (
              <p style={styles.correct}>✅ ¡Bien! 27, 28, 29, 30</p>
            ) : (
              <p style={styles.incorrect}>❌ Debe ser: 27, 28, 29, 30</p>
            )}
            {actividad2.every((v, i) => v === (i + 47).toString()) ? (
              <p style={styles.correct}>✅ ¡Bien! 47, 48, 49, 50</p>
            ) : (
              <p style={styles.incorrect}>❌ Debe ser: 47, 48, 49, 50</p>
            )}
          </>
        )}
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

// Estilos (incluido el nuevo botón)
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
  numerosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '5px',
    margin: '10px 0',
    textAlign: 'center'
  },
  numeroItem: {
    display: 'inline-block',
    width: '28px',
    height: '28px',
    lineHeight: '28px',
    backgroundColor: '#e3f2fd',
    border: '1px solid #bbdefb',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  secuencia: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    alignItems: 'center',
    margin: '10px 0',
    fontSize: '18px'
  },
  input: {
    width: '40px',
    height: '30px',
    textAlign: 'center',
    fontSize: '16px',
    border: '2px solid #007acc',
    borderRadius: '6px'
  },
  activity: {
    backgroundColor: '#e8f5e8',
    padding: '15px',
    borderRadius: '10px',
    border: '1px dashed #4caf50',
    marginBottom: '20px'
  },
  ordenGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    margin: '10px 0'
  },
  inputSmall: {
    width: '50px',
    height: '35px',
    textAlign: 'center',
    fontSize: '16px',
    border: '2px solid #27ae60',
    borderRadius: '6px'
  },
  correct: {
    color: '#27ae60',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  incorrect: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginTop: '10px'
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