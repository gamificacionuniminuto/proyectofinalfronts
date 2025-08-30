import React, { useState } from "react";

const ejercicios = [
  {
    pregunta: "¿Cuál es la unidad de medida que aparece en el video para medir la longitud?",
    opciones: ["Litro", "Metro", "Kilogramo"],
    respuesta: "Metro",
  },
  {
    pregunta: "Según el video, ¿qué instrumento se usa para medir la longitud?",
    opciones: ["Regla", "Balanza", "Vaso medidor"],
    respuesta: "Regla",
  },
  {
    pregunta: "¿Cuál es la unidad que se usa para medir el peso en el video?",
    opciones: ["Metro", "Litro", "Kilogramo"],
    respuesta: "Kilogramo",
  },
  {
    pregunta: "¿Qué unidad de medida sirve para medir líquidos?",
    opciones: ["Litro", "Metro", "Gramo"],
    respuesta: "Litro",
  },
  {
    pregunta: "En el video, ¿qué objeto se mide con litros?",
    opciones: ["Botella de agua", "Lápiz", "Mesa"],
    respuesta: "Botella de agua",
  },
  {
    pregunta: "¿Qué instrumento sirve para medir líquidos según el video?",
    opciones: ["Termómetro", "Vaso medidor", "Regla"],
    respuesta: "Vaso medidor",
  },
  {
    pregunta: "¿Cuál es la unidad más pequeña de peso mencionada?",
    opciones: ["Kilogramo", "Gramo", "Metro"],
    respuesta: "Gramo",
  },
  {
    pregunta: "¿Qué se mide con metros en el video?",
    opciones: ["Altura de una persona", "Peso de una manzana", "Cantidad de agua"],
    respuesta: "Altura de una persona",
  },
  {
    pregunta: "Según el video, ¿cuál es la relación entre litro y mililitro?",
    opciones: ["1 L = 100 ml", "1 L = 1000 ml", "1 L = 10 ml"],
    respuesta: "1 L = 1000 ml",
  },
  {
    pregunta: "¿Qué se mide con una balanza según el video?",
    opciones: ["Longitud", "Peso", "Capacidad"],
    respuesta: "Peso",
  },
];

const frasesMotivadoras = [
  "¡Muy bien, sigue así! ",
  "¡Excelente trabajo! ",
  "¡Lo estás haciendo genial! ",
  "¡Perfecto, eres muy inteligente! ",
  "¡Súper! Vas por buen camino ",
];

export default function JuegoMedidas() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const hablar = (texto) => {
    const voz = new SpeechSynthesisUtterance(texto);
    voz.lang = "es-ES";
    speechSynthesis.speak(voz);
  };

  const manejarRespuesta = (opcion) => {
    if (opcion === ejercicios[preguntaActual].respuesta) {
      const frase = frasesMotivadoras[Math.floor(Math.random() * frasesMotivadoras.length)];
      setPuntaje(puntaje + 1);
      setMensaje(frase);
      hablar(frase);
    } else {
      const texto = "Ups, te equivocaste. Intenta de nuevo, tú puedes lograrlo.";
      setMensaje(texto);
      hablar(texto);
    }

    const siguiente = preguntaActual + 1;
    if (siguiente < ejercicios.length) {
      setTimeout(() => {
        setPreguntaActual(siguiente);
        setMensaje("");
      }, 2000);
    } else {
      setTimeout(() => {
        setMostrarResultado(true);
      }, 2000);
    }
  };

  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>Juego: Unidades de Medida 📏⚖️</h1>

      <div style={styles.videoContainer}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/4e-dsOgOIrA"
          title="Video sobre unidades de medida"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <button
        style={{ ...styles.boton, marginBottom: "15px" }}
        onClick={() => window.location.href = "/clases"}
      >
        ⬅️ Regresar a Clases
      </button>

      {mostrarResultado ? (
        <div style={styles.resultado}>
          <h2>🎉 ¡Has terminado el juego!</h2>
          <p>Tu puntaje: {puntaje} de {ejercicios.length}</p>
          <button style={styles.boton} onClick={() => window.location.reload()}>
            🔄 Repetir Juego
          </button>
          <button style={styles.boton} onClick={() => window.location.href="/clases"}>
            ⬅️ Regresar a Clases
          </button>
        </div>
      ) : (
        <div style={styles.tarjeta}>
          <h2>{ejercicios[preguntaActual].pregunta}</h2>
          <div>
            {ejercicios[preguntaActual].opciones.map((opcion, i) => (
              <button
                key={i}
                style={styles.boton}
                onClick={() => manejarRespuesta(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>
          <p style={styles.mensaje}>{mensaje}</p>
        </div>
      )}
    </div>
  );
}

/** ==== CSS en JS ==== */
const styles = {
  contenedor: {
    fontFamily: "Comic Sans MS, Arial, sans-serif",
    textAlign: "center",
    background: "#f0f8ff",
    padding: "20px",
    borderRadius: "15px",
    maxWidth: "800px",
    margin: "40px auto",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },
  titulo: {
    color: "#1e90ff",
  },
  videoContainer: {
    marginBottom: "20px",
  },
  tarjeta: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
    marginTop: "10px",
  },
  boton: {
    margin: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background: "#1e90ff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
  mensaje: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "#228B22",
  },
  resultado: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.2)",
  },
};
