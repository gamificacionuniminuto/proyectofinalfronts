import React, { useEffect, useState } from "react";

const PREGUNTAS = [
  {
    id: 1,
    tipo: "secuencia",
    secuencia: [2, 4, 6, "?", 10],
    opciones: ["7", "8", "12"],
    correcta: "8",
    explicacionTexto:
      "Es una secuencia que aumenta de 2 en 2. Después de 2, 4, 6 sigue 8 y luego 10.",
    vozTexto: "Observa: dos, cuatro, seis… ¿qué número sigue? Aumenta de dos en dos.",
  },
  {
    id: 2,
    tipo: "secuencia",
    secuencia: [5, 10, 15, "?", 25],
    opciones: ["18", "20", "22"],
    correcta: "20",
    explicacionTexto:
      "Suma 5 cada vez: 5, 10, 15, 20, 25. El número que falta es 20.",
    vozTexto: "Cinco, diez, quince… sumamos cinco cada vez. ¿Qué número falta?",
  },
  {
    id: 3,
    tipo: "secuencia",
    secuencia: [1, 2, 4, 8, "?"],
    opciones: ["14", "16", "12"],
    correcta: "16",
    explicacionTexto:
      "Es una secuencia que duplica: 1, 2, 4, 8, 16. El faltante es 16.",
    vozTexto: "Uno, dos, cuatro, ocho… fíjate que se duplica cada paso. ¿Cuál sigue?",
  },
  {
    id: 4,
    tipo: "secuencia",
    secuencia: [100, 90, 80, "?", 60],
    opciones: ["65", "70", "75"],
    correcta: "70",
    explicacionTexto:
      "Disminuye de 10 en 10: 100, 90, 80, 70, 60. Falta 70.",
    vozTexto: "Cien, noventa, ochenta… observa que va bajando de diez en diez.",
  },
  {
    id: 5,
    tipo: "secuencia",
    secuencia: [3, 6, 9, 12, "?"],
    opciones: ["14", "15", "18"],
    correcta: "15",
    explicacionTexto:
      "Suma 3 cada vez: 3, 6, 9, 12, 15. El número que falta es 15.",
    vozTexto: "Tres, seis, nueve, doce… vamos sumando de tres en tres. ¿Cuál sigue?",
  },
  {
    id: 6,
    tipo: "secuencia",
    secuencia: [7, 14, 21, 28, "?"],
    opciones: ["32", "35", "36"],
    correcta: "35",
    explicacionTexto:
      "Suma 7 cada vez: 7, 14, 21, 28, 35. El faltante es 35.",
    vozTexto: "Siete, catorce, veintiuno, veintiocho… cada vez sumamos siete.",
  },
  {
    id: 7,
    tipo: "secuencia",
    secuencia: [1, 3, 6, 10, "?"],
    opciones: ["12", "14", "15"],
    correcta: "15",
    explicacionTexto:
      "Son números triangulares: +2, +3, +4, +5… 1, 3, 6, 10, 15.",
    vozTexto: "Uno, tres, seis, diez… fíjate en cuánto se suma cada vez.",
  },
  {
    id: 8,
    tipo: "patron",
    secuencia: ["🔴", "🔵", "🔴", "🔵", "?"],
    opciones: ["🔴", "🟢", "🟡"],
    correcta: "🔴",
    explicacionTexto:
      "Patrón alternado rojo-azul. Tras 🔴, 🔵, 🔴, 🔵, sigue 🔴.",
    vozTexto: "Rojo, azul, rojo, azul… fíjate en cómo se alternan.",
  },
  {
    id: 9,
    tipo: "patron",
    secuencia: ["⭐", "⭐⭐", "⭐", "⭐⭐", "?"],
    opciones: ["⭐", "⭐⭐⭐", "⭐️⭐️⭐️⭐️"],
    correcta: "⭐",
    explicacionTexto:
      "Se alterna 1 estrella y 2 estrellas: ⭐, ⭐⭐, ⭐, ⭐⭐, ⭐.",
    vozTexto: "Una estrella, dos estrellas, una, dos… ¿qué sigue?",
  },
  {
    id: 10,
    tipo: "patron",
    secuencia: ["🟩", "🟩", "⬜", "🟩", "🟩", "⬜", "?"],
    opciones: ["🟩", "⬜", "🟦"],
    correcta: "🟩",
    explicacionTexto:
      "Se repite dos verdes y un blanco: 🟩, 🟩, ⬜… Por eso sigue 🟩.",
    vozTexto: "Dos verdes y un blanco, luego se repite el mismo patrón.",
  },
  {
    id: 11,
    tipo: "patron",
    secuencia: ["🔺", "🔺", "⚪", "🔺", "🔺", "⚪", "?"],
    opciones: ["🔺", "⚪", "🔻"],
    correcta: "🔺",
    explicacionTexto:
      "Dos triángulos rojos y un círculo blanco. El patrón se reinicia con 🔺.",
    vozTexto: "Dos triángulos rojos y un círculo blanco, se repite.",
  },
  {
    id: 12,
    tipo: "patron",
    secuencia: ["🟨", "🟨", "🟦", "🟨", "🟨", "🟦", "?"],
    opciones: ["🟦", "🟨", "🟥"],
    correcta: "🟨",
    explicacionTexto:
      "Se repite: dos amarillos y un azul. Después del azul, vuelve amarillo.",
    vozTexto: "Dos amarillos, un azul… después del azul, ¿qué sigue?",
  },
  {
    id: 13,
    tipo: "patron",
    secuencia: ["🍎", "🍌", "🍎", "🍌", "🍎", "?"],
    opciones: ["🍎", "🍌", "🍇"],
    correcta: "🍌",
    explicacionTexto:
      "Alterna manzana y banana. Tras 🍎, 🍌, … la que sigue es 🍌.",
    vozTexto: "Manzana, banana, manzana, banana… fíjate qué fruta sigue.",
  },
  {
    id: 14,
    tipo: "patron",
    secuencia: ["⬛", "⬛", "⬛", "⬜", "⬛", "⬛", "⬛", "⬜", "?"],
    opciones: ["⬛", "⬜", "🟥"],
    correcta: "⬛",
    explicacionTexto:
      "Patrón 3 negros y 1 blanco. Tras el blanco, vuelve negro.",
    vozTexto: "Tres cuadros negros y uno blanco… se repite.",
  },
];



export default function JuegoPatronesSecuencias() {
  const [indice, setIndice] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [terminado, setTerminado] = useState(false);

  const actual = PREGUNTAS[indice];

  // Voz: explicación al inicio y en cada pregunta
  useEffect(() => {
    const intro =
      "Bienvenido al juego de patrones y secuencias. Lee o escucha la explicación y elige la opción correcta para completar la serie.";
    speak(intro);
  }, []);

  useEffect(() => {
    if (!terminado && actual?.vozTexto) {
      // Pequeño retardo para no solapar con voz previa
      const t = setTimeout(() => {
        speak(actual.vozTexto);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [indice, terminado]);

  const speak = (texto) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = "es-ES";
      synth.speak(u);
    } catch (_) {
      // Silencioso si no hay soporte
    }
  };

  const verificar = (opcion) => {
    const ok = String(opcion) === String(actual.correcta);
    if (ok) {
      const frases = [
        "¡Excelente! Sigue así.",
        "¡Muy bien! Lo estás haciendo genial.",
        "¡Bravo! Respuesta correcta.",
      ];
      const msg = frases[Math.floor(Math.random() * frases.length)];
      setMensaje(`✅ ${msg}`);
      speak(msg);
      setPuntaje((p) => p + 1);

      // Avanza tras un breve tiempo
      setTimeout(() => {
        if (indice < PREGUNTAS.length - 1) {
          setIndice((i) => i + 1);
          setMensaje("");
        } else {
          setTerminado(true);
          speak(
            "¡Felicidades! Has completado todas las preguntas de patrones y secuencias."
          );
        }
      }, 900);
    } else {
      const pista =
        actual.tipo === "secuencia"
          ? "Observa cuánto aumenta o disminuye cada paso."
          : "Mira cómo se repiten los colores o figuras.";
      const msg = `❌ Casi... Vuelve a mirar el patrón. Pista: ${pista}`;
      setMensaje(msg);
      speak("Casi. Intenta de nuevo. " + pista);
    }
  };

  const intentarDeNuevo = () => {
    setIndice(0);
    setPuntaje(0);
    setMensaje("");
    setTerminado(false);
    speak("Reiniciemos. ¡Tú puedes!");
  };

  return (
    <div style={styles.app}>
      <div style={styles.contenedorPrincipal}>
        <h1 style={styles.titulo}>🔢 Juego de Patrones y Secuencias</h1>

        <p style={styles.descripcion}>
          ¿Cómo funciona? Observa la serie, piensa cuál elemento falta y elige
          la opción correcta. Puedes leer la explicación o escucharla con voz.
        </p>

        {/* Tarjeta de pregunta o resultado */}
        {!terminado ? (
          <div style={styles.card}>
            <div style={styles.metaFila}>
              <span style={styles.badge}>
                Pregunta {indice + 1} de {PREGUNTAS.length}
              </span>
              <span style={styles.badgePuntaje}>Puntos: {puntaje}</span>
            </div>

            <h2 style={styles.enunciado}>
              {actual.tipo === "secuencia"
                ? "Completa la secuencia numérica:"
                : "Completa el patrón:"}
            </h2>

            {/* Secuencia visual */}
            <div style={styles.secuencia}>
              {actual.secuencia.map((item, i) => (
                <span
                  key={i}
                  style={
                    String(item) === "?"
                      ? { ...styles.celda, ...styles.celdaFaltante }
                      : styles.celda
                  }
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Explicación escrita */}
            <p style={styles.explicacion}>
              ℹ️ {actual.explicacionTexto}
            </p>

            {/* Opciones */}
            <div style={styles.opciones}>
              {actual.opciones.map((op, idx) => (
                <button
                  key={idx}
                  onClick={() => verificar(op)}
                  style={styles.botonOpcion}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Mensaje dinámico */}
            <p style={styles.mensaje}>{mensaje}</p>
          </div>
        ) : (
          <div style={styles.card}>
            <h2 style={{ marginBottom: 8 }}>🎉 ¡Juego terminado!</h2>
            <p style={{ fontSize: 18, marginBottom: 16 }}>
              Tu puntaje final: <b>{puntaje}</b> / {PREGUNTAS.length}
            </p>
            <p style={{ color: "#444", marginBottom: 20 }}>
              ¡Sigue practicando! Entre más observes, mejor reconocerás los
              patrones.
            </p>
          </div>
        )}

        {/* Botones fijos siempre visibles */}
        <div style={styles.barraBotones}>
          <button onClick={intentarDeNuevo} style={styles.botonPrimario}>
            🔄 Intentar de nuevo
          </button>
          <button
            onClick={() => (window.location.href = "/clases")}
            style={styles.botonSecundario}
          >
            ⬅️ Regresar a clases
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🎨 CSS embebido (objeto styles) */
const styles = {
  app: {
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    boxSizing: "border-box",
    fontFamily: "'Comic Sans MS', 'Trebuchet MS', sans-serif",
  },
  contenedorPrincipal: {
    width: "min(920px, 100%)",
    margin: "100px ",
    background: "#f9faff",
    borderRadius: 20,
    padding: "22px 20px 26px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    border: "2px solid #ffffff",
  },
  titulo: {
    textAlign: "center",
    color: "#1d3557",
    fontSize: 28,
    margin: "4px 0 12px",
    textShadow: "1px 1px #fff",
  },
  descripcion: {
    textAlign: "center",
    color: "#333",
    margin: "0 auto 14px",
    maxWidth: 740,
    fontSize: 16,
  },
  card: {
    marginTop: 12,
    background: "#fff",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
    border: "1px solid #eef2f7",
  },
  metaFila: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  badge: {
    background: "#ffd166",
    padding: "6px 12px",
    borderRadius: 999,
    fontWeight: "bold",
    fontSize: 14,
    color: "#5a4400",
  },
  badgePuntaje: {
    background: "#90be6d",
    padding: "6px 12px",
    borderRadius: 999,
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  enunciado: {
    margin: "6px 0 10px",
    color: "#0b4f6c",
    fontSize: 20,
    textAlign: "center",
  },
  secuencia: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    margin: "10px 0 12px",
  },
  celda: {
    minWidth: 56,
    minHeight: 56,
    padding: "10px 14px",
    borderRadius: 12,
    background: "#ffe082",
    boxShadow: "0 2px 0 #d6a11c inset",
    fontSize: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  celdaFaltante: {
    background: "#ff6f61",
    color: "white",
    boxShadow: "0 2px 0 #b23a35 inset",
    fontWeight: "bold",
  },
  explicacion: {
    background: "#f1f7ff",
    border: "1px solid #d6e6ff",
    color: "#0f3057",
    borderRadius: 12,
    padding: "10px 12px",
    margin: "4px auto 12px",
    maxWidth: 740,
    fontSize: 15,
  },
  opciones: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 6,
  },
  botonOpcion: {
    padding: "12px 18px",
    fontSize: 18,
    borderRadius: 14,
    border: "none",
    background: "#4dabf7",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 3px 0 #2f74c0",
    transition: "transform .1s ease",
  },
  mensaje: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
    minHeight: 24,
  },
  barraBotones: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    marginTop: 14,
    flexWrap: "wrap",
  },
  botonPrimario: {
    padding: "12px 16px",
    fontSize: 16,
    borderRadius: 12,
    border: "none",
    background: "#06d6a0",
    color: "#073b4c",
    cursor: "pointer",
    fontWeight: "bold",
  },
  botonSecundario: {
    padding: "12px 16px",
    fontSize: 16,
    borderRadius: 12,
    border: "none",
    background: "#ef476f",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
media: {
    // Responsive styles for mobile and tablets
    '@media (max-width: 600px)': {
        contenedorPrincipal: {
            margin: "18px 0",
            padding: "14px 6px 18px",
            borderRadius: 12,
            width: "100%",
        },
        titulo: {
            fontSize: 21,
            margin: "2px 0 8px",
        },
        descripcion: {
            fontSize: 14,
            maxWidth: "98vw",
        },
        card: {
            padding: 10,
            borderRadius: 10,
        },
        enunciado: {
            fontSize: 16,
        },
        secuencia: {
            gap: 6,
        },
        celda: {
            minWidth: 38,
            minHeight: 38,
            fontSize: 18,
            padding: "6px 8px",
            borderRadius: 8,
        },
        celdaFaltante: {
            fontSize: 18,
            borderRadius: 8,
        },
        explicacion: {
            fontSize: 13,
            padding: "7px 8px",
            borderRadius: 8,
            maxWidth: "98vw",
        },
        opciones: {
            gap: 7,
        },
        botonOpcion: {
            fontSize: 15,
            padding: "8px 12px",
            borderRadius: 8,
        },
        mensaje: {
            fontSize: 14,
            minHeight: 18,
        },
        barraBotones: {
            gap: 7,
            marginTop: 10,
        },
        botonPrimario: {
            fontSize: 14,
            padding: "8px 10px",
            borderRadius: 8,
        },
        botonSecundario: {
            fontSize: 14,
            padding: "8px 10px",
            borderRadius: 8,
        },
    },
    '@media (max-width: 900px)': {
        contenedorPrincipal: {
            margin: "40px 0",
            width: "98vw",
            padding: "16px 8px 20px",
        },
        titulo: {
            fontSize: 24,
        },
        descripcion: {
            fontSize: 15,
            maxWidth: "98vw",
        },
        card: {
            padding: 14,
            borderRadius: 12,
        },
        enunciado: {
            fontSize: 18,
        },
        secuencia: {
            gap: 8,
        },
        celda: {
            minWidth: 44,
            minHeight: 44,
            fontSize: 22,
            padding: "8px 10px",
            borderRadius: 10,
        },
        celdaFaltante: {
            fontSize: 22,
            borderRadius: 10,
        },
        explicacion: {
            fontSize: 14,
            padding: "8px 10px",
            borderRadius: 10,
            maxWidth: "98vw",
        },
        opciones: {
            gap: 9,
        },
        botonOpcion: {
            fontSize: 16,
            padding: "10px 14px",
            borderRadius: 10,
        },
        mensaje: {
            fontSize: 15,
            minHeight: 20,
        },
        barraBotones: {
            gap: 9,
            marginTop: 12,
        },
        botonPrimario: {
            fontSize: 15,
            padding: "10px 12px",
            borderRadius: 10,
        },
        botonSecundario: {
            fontSize: 15,
            padding: "10px 12px",
            borderRadius: 10,
        },
    },
},
};
