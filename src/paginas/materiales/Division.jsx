// MaterialDivisiones.jsx
import React, { useState, useEffect } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

// Generar ejercicios de división (dividendo ≤ 100, divisor ≤ 10)
const generarEjercicios = () => {
  const ejercicios = [];
  while (ejercicios.length < 8) {
    const divisor = Math.floor(Math.random() * 9) + 2; // 2 a 10
    const cociente = Math.floor(Math.random() * 9) + 1; // 1 a 9
    const residuo = Math.floor(Math.random() * divisor); // residuo < divisor
    const dividendo = divisor * cociente + residuo;

    if (dividendo <= 100) {
      ejercicios.push({ dividendo, divisor, cociente, residuo });
    }
  }
  return ejercicios;
};

export default function MaterialDivisiones() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ejercicios] = useState(generarEjercicios());
  const [respuestas, setRespuestas] = useState(
    ejercicios.map(() => ({ cociente: "", residuo: "" }))
  );

  useEffect(() => {
    hablar(
      "Vamos a aprender divisiones. Dividir es repartir en partes iguales. Aprendamos con ejemplos."
    );
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

  const handleChange = (index, campo, valor) => {
    if (/^\d*$/.test(valor)) {
      const nuevas = [...respuestas];
      nuevas[index][campo] = valor;
      setRespuestas(nuevas);
    }
  };

  const verificar = () => {
    const todasCorrectas = ejercicios.every((ej, i) => {
      return (
        respuestas[i].cociente === ej.cociente.toString() &&
        respuestas[i].residuo === ej.residuo.toString()
      );
    });

    if (todasCorrectas) {
      hablar("¡Perfecto! Todas tus divisiones están bien resueltas.");
    } else {
      hablar("Revisa tus respuestas. Algo no está bien. Recuerda: dividendo = divisor × cociente + residuo.");
    }

    setMostrarResultado(true);
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>➗ Aprende a Dividir</h2>
       
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar(
            "Dividir es repartir en partes iguales. Por ejemplo, 15 entre 4 es 3 y sobran 3. El número que se reparte es el dividendo, el que divide es el divisor."
          )
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Explicación */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Qué es una división?</h3>
        <p>
          <strong>Dividendo</strong>: el número que se reparte.<br />
          <strong>Divisor</strong>: en cuántas partes se reparte.<br />
          <strong>Cociente</strong>: cuánto le toca a cada parte.<br />
          <strong>Residuo</strong>: lo que sobra.
        </p>
        <p>Ejemplo: 17 ÷ 5 = 3 y sobran 2 → <strong>17 = 5×3 + 2</strong></p>

        <div style={styles.ejemplo}>
          <pre style={styles.division}>
{`    3  ← cociente
   ────
5 │ 17
  -15
  ────
    2  ← residuo`}
          </pre>
        </div>
      </div>

      {/* Ejercicios */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ Resuelve estas divisiones</h3>
        <p style={{ fontSize: '14px', color: '#555' }}>
          Escribe el <strong>cociente</strong> y el <strong>residuo</strong>.
        </p>

        {ejercicios.map((ej, index) => (
          <div key={index} style={styles.ejercicio}>
            <div style={styles.operacion}>
              <strong>{ej.dividendo}</strong> ÷ <strong>{ej.divisor}</strong> = 
            </div>
            <div style={styles.inputs}>
              Cociente:
              <input
                type="text"
                inputMode="numeric"
                value={respuestas[index].cociente}
                onChange={(e) => handleChange(index, "cociente", e.target.value)}
                placeholder="?"
                style={styles.input}
              />
              Residuo:
              <input
                type="text"
                inputMode="numeric"
                value={respuestas[index].residuo}
                onChange={(e) => handleChange(index, "residuo", e.target.value)}
                placeholder="?"
                style={styles.input}
              />
            </div>

            {mostrarResultado && (
              <>
                {respuestas[index].cociente === ej.cociente.toString() ? (
                  <span style={styles.correct}> ✅</span>
                ) : (
                  <span style={styles.incorrect}> ❌ (era {ej.cociente})</span>
                )}
                {respuestas[index].residuo === ej.residuo.toString() ? (
                  <span style={styles.correct}> ✅</span>
                ) : (
                  <span style={styles.incorrect}> ❌ (era {ej.residuo})</span>
                )}
              </>
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
  ejemplo: {
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    textAlign: 'center',
    margin: '10px 0'
  },
  division: {
    fontFamily: 'monospace',
    fontSize: '16px',
    whiteSpace: 'pre',
    color: '#333'
  },
  activity: {
    backgroundColor: '#f0f8ff',
    padding: '15px',
    borderRadius: '10px',
    border: '1px dashed #007acc',
    marginBottom: '20px'
  },
  ejercicio: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #eee'
  },
  operacion: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  inputs: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  input: {
    width: '60px',
    height: '30px',
    textAlign: 'center',
    fontSize: '16px',
    border: '2px solid #007acc',
    borderRadius: '6px'
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