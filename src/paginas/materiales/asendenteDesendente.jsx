// MaterialOrdenNumeros.jsx
import React, { useState, useEffect } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

// Generar 8 secuencias aleatorias (4 ascendentes, 4 descendentes)
const generarEjercicios = () => {
  const ejercicios = [];

  // Ascendentes
  for (let i = 0; i < 4; i++) {
    const inicio = Math.floor(Math.random() * 30) + 1;
    const secuencia = [inicio, inicio + 2, inicio + 4, inicio + 6, inicio + 8];
    const mezclada = [...secuencia].sort(() => Math.random() - 0.5);
    ejercicios.push({ tipo: "asc", original: secuencia, mezclada });
  }

  // Descendentes
  for (let i = 0; i < 4; i++) {
    const inicio = Math.floor(Math.random() * 30) + 21;
    const secuencia = [inicio, inicio - 2, inicio - 4, inicio - 6, inicio - 8];
    const mezclada = [...secuencia].sort(() => Math.random() - 0.5);
    ejercicios.push({ tipo: "desc", original: secuencia, mezclada });
  }

  return ejercicios;
};

export default function MaterialOrdenNumeros() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ejercicios] = useState(generarEjercicios());
  const [respuestas, setRespuestas] = useState(
    ejercicios.map(() => ["", "", "", "", ""])
  );

  useEffect(() => {
    hablar("Vamos a aprender a ordenar números de menor a mayor y de mayor a menor.");
  }, []);

  const handleCompletado = () => {
    if (!completado) {
      setCompletado(true);
      hablar("¡Muy bien! Has completado esta guía. Ahora puedes practicar con el juego.");
    }
  };

  const handleCalificacion = (estrellas) => {
    setCalificacion(estrellas);
    hablar(`Gracias por calificar con ${estrellas} estrellas.`);
  };

  const handleChange = (ejIndex, pos, value) => {
    if (/^\d*$/.test(value)) {
      const nuevas = [...respuestas];
      nuevas[ejIndex][pos] = value;
      setRespuestas(nuevas);
    }
  };

  const verificar = () => {
    const todasCorrectas = ejercicios.every((ej, i) => {
      return ej.original.every((num, j) => respuestas[i][j] === num.toString());
    });

    if (todasCorrectas) {
      hablar("¡Perfecto! Has ordenado todos los números correctamente.");
    } else {
      hablar("Revisa tus respuestas. Recuerda: de menor a mayor o de mayor a menor.");
    }

    setMostrarResultado(true);
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>🔢 Números Ascendentes y Descendentes</h2>
       
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar(
            "Ordenar números es fácil. De menor a mayor: ascendente. De mayor a menor: descendente. Vamos a practicar."
          )
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Explicación */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Qué es ordenar números?</h3>
        <p>
          <strong>Ascendente</strong>: de menor a mayor → 10, 15, 20, 25<br />
          <strong>Descendente</strong>: de mayor a menor → 25, 20, 15, 10
        </p>
        <p>Consejo: mira primero el número de las <strong>decenas</strong>. Si son iguales, compara las <strong>unidades</strong>.</p>
      </div>

      {/* Ejercicios */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ Ordena los números</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Escribe cada número en el cuadrito correcto.
        </p>

        {ejercicios.map((ej, index) => (
          <div key={index} style={styles.ejercicio}>
            <div style={styles.enunciado}>
              <strong>{ej.tipo === "asc" ? "Ascendente:" : "Descendente:"}</strong> {ej.mezclada.join(" ")}
            </div>

            <div style={styles.cuadricula}>
              {[0, 1, 2, 3, 4].map((pos) => (
                <input
                  key={pos}
                  type="text"
                  inputMode="numeric"
                  value={respuestas[index][pos]}
                  onChange={(e) => handleChange(index, pos, e.target.value)}
                  placeholder="?"
                  style={styles.cuadrito}
                  disabled={mostrarResultado}
                />
              ))}
            </div>

            {mostrarResultado && (
              <div style={styles.resultado}>
                {ej.original.every((num, j) => respuestas[index][j] === num.toString()) ? (
                  <span style={styles.correct}>✅ ¡Correcto!</span>
                ) : (
                  <span style={styles.incorrect}>❌ Era: {ej.original.join(" ")}</span>
                )}
              </div>
            )}
          </div>
        ))}
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
  activity: {
    backgroundColor: '#f0f8ff',
    padding: '15px',
    borderRadius: '10px',
    border: '1px dashed #007acc',
    marginBottom: '20px'
  },
  ejercicio: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  enunciado: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#1565c0'
  },
  cuadricula: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    margin: '10px 0'
  },
  cuadrito: {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    fontSize: '18px',
    border: '2px solid #007acc',
    borderRadius: '8px',
    outline: 'none',
    fontWeight: 'bold'
  },
  resultado: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  correct: {
    color: '#27ae60'
  },
  incorrect: {
    color: '#e74c3c'
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