// MaterialRelacionNumeros.jsx
import React, { useState, useEffect } from "react";
import cocodrilo from "./cocodrilo.png"; 
import cocodrilomenor from "./cocdrilo2.png"; 
import cocodrilo3 from "./cocdrilo3.png";     
import cocodriloigual from "./cocodriloigual.png";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

// Generar 8 ejercicios: aseguramos al menos 2 con "igual"
// Generar 8 ejercicios aleatorios (con 2 "igual")
const generarEjercicios = () => {
  const ejercicios = [];

  // Primero metemos 2 con "igual"
  while (ejercicios.length < 2) {
    const num = Math.floor(Math.random() * 20) + 1; // números más pequeños para que se repitan
    ejercicios.push({ a: num, b: num, simbolo: "igual" });
  }

  // Luego completamos hasta 8 con mayor o menor
  while (ejercicios.length < 8) {
    const a = Math.floor(Math.random() * 100) + 1;
    const b = Math.floor(Math.random() * 100) + 1;
    if (a === b) continue; // evitamos más iguales
    let simbolo = a > b ? "mayor" : "menor";
    ejercicios.push({ a, b, simbolo });
  }

  return ejercicios;
};


export default function MaterialRelacionNumeros() {
  const [completado, setCompletado] = useState(false);
  const [calificacion, setCalificacion] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [ejercicios] = useState(generarEjercicios());
  const [respuestas, setRespuestas] = useState(ejercicios.map(() => ""));

  useEffect(() => {
    hablar("Aprendamos a comparar números: mayor que, menor que e igual a. Vamos a practicar.");
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

  const handleSelect = (index, simbolo) => {
    const nuevas = [...respuestas];
    nuevas[index] = simbolo;
    setRespuestas(nuevas);
  };

  const verificar = () => {
    const todasCorrectas = ejercicios.every((ej, i) => respuestas[i] === ej.simbolo);

    if (todasCorrectas) {
      hablar("¡Perfecto! Todas tus respuestas son correctas.");
    } else {
      hablar("Revisa tus respuestas. Recuerda: menor es más pequeño, mayor es más grande.");
    }

    setMostrarResultado(true);
  };

  return (
    <div className="material-card" style={styles.card}>
      {/* Encabezado */}
      <div style={styles.header}>
        <h2 style={styles.title}>🔍 Relación de Números</h2>
        <p><strong>Nivel:</strong> 3° de Primaria</p>
        <p><strong>País:</strong> España 🇪🇸</p>
      </div>

      {/* Botón de audio */}
      <button
        onClick={() =>
          hablar("Vamos a comparar números. Selecciona el símbolo correcto: menor, mayor o igual.")
        }
        style={styles.audioButton}
      >
        🔊 Escuchar guía
      </button>

      {/* Explicación con imágenes */}
      <div style={styles.content}>
        <h3 style={styles.subtitle}>📌 ¿Qué significan "menor", "mayor", "igual"?</h3>

        <div style={styles.imgRow}>
          {/* Menor que */}
          <div style={styles.simboloBox}>
            <img src={cocodrilomenor} alt="Cocodrilo abre hacia mayor" style={styles.img} />
            <p><strong>Menor que: {"<"}</strong></p>
            <p>El cocodrilo siempre quiere comer el número más grande. Si el de la izquierda es más pequeño, ¡su boca se abre hacia la derecha!</p>
            <div style={styles.ejemplo}>5 {"<"} 8 → 5 es <strong>menor</strong></div>
          </div>

          {/* Mayor que */}
          <div style={styles.simboloBox}>
            <img src={cocodrilo3} alt="Cocodrilo abre hacia mayor" style={styles.img} />
            <p><strong>Mayor que: {">"}</strong></p>
            <p>Si el número de la izquierda es más grande, ¡el cocodrilo abre la boca hacia la derecha!</p>
            <div style={styles.ejemplo}>10 {">"} 3 → 10 es <strong>mayor</strong></div>
          </div>

          {/* Igual a */}
          <div style={styles.simboloBox}>
            <img src={cocodriloigual} alt="Dos cocodrilos iguales" style={styles.img} />
            <p><strong>Igual a: {"="}</strong></p>
            <p>Cuando los números son iguales, usamos dos rayas. ¡Ninguno se come al otro!</p>
            <div style={styles.ejemplo}>7 {"="} 7 → 7 es <strong>igual</strong></div>
          </div>
        </div>
      </div>

      {/* Ejercicios */}
      <div style={styles.activity}>
        <h3 style={styles.subtitle}>✏️ Selecciona: menor, mayor o igual</h3>
        <p style={{ fontSize: "14px", color: "#555" }}>
          Haz clic en el símbolo correcto.
        </p>

        <div style={styles.ejerciciosGrid}>
          {ejercicios.map((ej, index) => {
            const mirarDerecha = ej.a < ej.b; // Cocodrilo mira al mayor

            return (
              <div key={index} style={styles.fila}>
                <span style={styles.numero}>{ej.a}</span>

            

                {/* Botones de selección */}
                <div style={styles.opciones}>
                  {["menor", "igual", "mayor"].map((op) => (
                    <button
                      key={op}
                      onClick={() => handleSelect(index, op)}
                      disabled={mostrarResultado}
                      style={{
                        ...styles.opcionBtn,
                        backgroundColor: respuestas[index] === op ? "#ffd54f" : "white",
                        borderColor: respuestas[index] === op ? "#f57f17" : "#007acc",
                      }}
                    >
                      {op === "menor" ? "<" : op === "mayor" ? ">" : "="}
                    </button>
                  ))}
                </div>

                <span style={styles.numero}>{ej.b}</span>

                {mostrarResultado && (
                  <span style={respuestas[index] === ej.simbolo ? styles.correct : styles.incorrect}>
                    {respuestas[index] === ej.simbolo ? " ✅" : ` ❌ (${ej.simbolo})`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Botones */}
      <div style={styles.footer}>
        <button onClick={verificar} style={styles.checkBtn}>
          ✅ Verificar respuestas
        </button>

        <button
          onClick={handleCompletado}
          style={completado ? styles.completedBtnActive : styles.completedBtn}
        >
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
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    padding: "20px",
    margin: "20px auto",
    maxWidth: "800px",
    fontFamily: "'Comic Sans MS', 'Arial', sans-serif",
    border: "1px solid #e0e0e0",
  },
  header: { textAlign: "center", marginBottom: "15px" },
  title: { color: "#007acc", margin: "0 0 10px 0", fontSize: "24px" },
  audioButton: {
    display: "block",
    backgroundColor: "#ffcc00",
    color: "#333",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
    textAlign: "center",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "20px",
  },
  subtitle: { color: "#d35400", marginTop: "15px", fontSize: "18px" },
  imgRow: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "15px",
  },
  simboloBox: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
    flex: "1",
    minWidth: "200px",
    fontSize: "14px",
  },
  img: {
    width: "60px",
    height: "40px",
    marginBottom: "10px",
  },
  ejemplo: {
    backgroundColor: "#e3f2fd",
    padding: "8px",
    borderRadius: "6px",
    marginTop: "10px",
    fontWeight: "bold",
  },
  activity: {
    backgroundColor: "#f0f8ff",
    padding: "15px",
    borderRadius: "10px",
    border: "1px dashed #007acc",
    marginBottom: "20px",
  },
  ejerciciosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "15px",
    marginTop: "10px",
  },
  fila: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "1px solid #eee",
  },
  numero: {
    fontSize: "18px",
    fontWeight: "bold",
    minWidth: "40px",
    textAlign: "center",
  },
  opciones: { display: "flex", gap: "5px" },
  opcionBtn: {
    border: "2px solid #007acc",
    borderRadius: "8px",
    fontSize: "18px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
  correct: { color: "#27ae60", fontWeight: "bold" },
  incorrect: { color: "#e74c3c", fontWeight: "bold" },
  checkBtn: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  completedBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  completedBtnActive: {
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "default",
  },
  backButton: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    marginTop: "10px",
  },
  footer: { textAlign: "center", marginTop: "20px" },
  rating: { marginTop: "10px", fontSize: "20px" },
  starEmpty: { color: "#ddd", cursor: "pointer" },
  starFilled: { color: "#f39c12", cursor: "pointer" },
};