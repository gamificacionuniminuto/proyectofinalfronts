import React, { useState, useEffect } from "react";

// ===== Generar horas aleatorias =====
const generarHora = () => {
  const hora = Math.floor(Math.random() * 12);
  const minutos = Math.floor(Math.random() * 60);
  return { hora, minutos };
};

// ===== Componente principal =====
export default function JuegoMedicionTiempo() {
  const [ejercicio, setEjercicio] = useState(1);
  const [horaCorrecta, setHoraCorrecta] = useState(generarHora());
  const [opciones, setOpciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [explicado, setExplicado] = useState(false);

  // Crear opciones múltiples
  useEffect(() => {
    const opcionesTemp = [horaCorrecta];
    while (opcionesTemp.length < 4) {
      const nueva = generarHora();
      if (
        !opcionesTemp.some(
          (o) => o.hora === nueva.hora && o.minutos === nueva.minutos
        )
      ) {
        opcionesTemp.push(nueva);
      }
    }
    setOpciones(opcionesTemp.sort(() => Math.random() - 0.5));
  }, [horaCorrecta]);

  // Voz de explicación al inicio
  useEffect(() => {
    if (!explicado) {
      const msg = new SpeechSynthesisUtterance(
        "Bienvenido al juego de la hora. Mira el reloj analógico y selecciona la hora correcta en formato digital. Tienes nueve ejercicios para completar. ¡Mucha suerte!"
      );
      msg.lang = "es-ES";
      window.speechSynthesis.speak(msg);
      setExplicado(true);
    }
  }, [explicado]);

  const manejarRespuesta = (opcion) => {
    if (
      opcion.hora === horaCorrecta.hora &&
      opcion.minutos === horaCorrecta.minutos
    ) {
      setMensaje("¡Correcto!");
      if (ejercicio < 9) {
        setTimeout(() => {
          setHoraCorrecta(generarHora());
          setEjercicio(ejercicio + 1);
          setMensaje("");
        }, 1000);
      } else {
        setMensaje("¡Muy bien! Terminaste los 9 ejercicios.");
      }
    } else {
      setMensaje("Intenta de nuevo.");
    }
  };

  // Dibujar reloj analógico
  const renderReloj = () => {
    const anguloHora =
      ((horaCorrecta.hora % 12) + horaCorrecta.minutos / 60) * 30;
    const anguloMinutos = horaCorrecta.minutos * 6;

    return (
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="95" stroke="black" strokeWidth="4" fill="white" />
        {/* Números del reloj */}
        {[...Array(12)].map((_, i) => {
          const ang = ((i + 1) * 30 * Math.PI) / 180;
          const x = 100 + 80 * Math.sin(ang);
          const y = 105 - 80 * Math.cos(ang);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize="16"
              fontWeight="bold"
            >
              {i + 1}
            </text>
          );
        })}
        {/* Manecilla de la hora */}
        <line
          x1="100"
          y1="100"
          x2={100 + 40 * Math.sin((Math.PI / 180) * anguloHora)}
          y2={100 - 40 * Math.cos((Math.PI / 180) * anguloHora)}
          stroke="black"
          strokeWidth="6"
        />
        {/* Manecilla de los minutos */}
        <line
          x1="100"
          y1="100"
          x2={100 + 60 * Math.sin((Math.PI / 180) * anguloMinutos)}
          y2={100 - 60 * Math.cos((Math.PI / 180) * anguloMinutos)}
          stroke="red"
          strokeWidth="3"
        />
        <circle cx="100" cy="100" r="4" fill="black" />
      </svg>
    );
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        maxWidth: "700px",
        margin: "60px auto",
        background: "#f0f8ff",
        borderRadius: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <h2 style={{ color: "#2a4d69" }}>Juego de la Hora</h2>

      {/* Video explicativo */}
      <div style={{ marginBottom: "20px" }}>
        <iframe
          width="100%"
          height="250"
          src="https://www.youtube.com/embed/XCgJB97DEGM"
          title="¿QUÉ HORA ES? | Aprender a decir la hora | Las horas y los minutos | El reloj - Episodio 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <h3>
        Ejercicio {ejercicio} de 9 <br /> ¿Qué hora es?
      </h3>

      {/* Reloj */}
      <div style={{ margin: "20px 0" }}>{renderReloj()}</div>

      {/* Opciones digitales */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {opciones.map((op, i) => (
          <button
            key={i}
            onClick={() => manejarRespuesta(op)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
              background: "#4caf50",
              color: "white",
              border: "none",
            }}
          >
            {`${op.hora.toString().padStart(2, "0")}:${op.minutos
              .toString()
              .padStart(2, "0")}`}
          </button>
        ))}
      </div>

      <h3 style={{ marginTop: "20px", color: "#333" }}>{mensaje}</h3>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            setEjercicio(1);
            setHoraCorrecta(generarHora());
            setMensaje("");
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: "#2196f3",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Reintentar
        </button>
        <button
          onClick={() => (window.location.href = "/clases")}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Regresar a Clases
        </button>
      </div>
    </div>
  );
}
