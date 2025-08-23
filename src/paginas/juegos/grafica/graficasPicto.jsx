import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Confetti from "react-confetti";

// Datos para las gráficas
const dataFrutas = [
  { name: "Manzanas", value: 10 },
  { name: "Bananas", value: 6 },
  { name: "Uvas", value: 4 },
];

const dataColores = [
  { name: "Rojo", value: 5 },
  { name: "Azul", value: 7 },
  { name: "Verde", value: 3 },
];

const dataAnimales = [
  { name: "🐶", value: 8 },
  { name: "🐱", value: 5 },
  { name: "🐰", value: 4 },
];

const dataDeportes = [
  { name: "Fútbol", value: 12 },
  { name: "Básquet", value: 8 },
  { name: "Natación", value: 6 },
];

const dataHelados = [
  { name: "Chocolate", value: 7 },
  { name: "Vainilla", value: 4 },
  { name: "Fresa", value: 9 },
];

const dataTransportes = [
  { name: "🚗", value: 6 },
  { name: "🚲", value: 9 },
  { name: "🚌", value: 4 },
];

const dataMascotas = [
  { name: "Perros", value: 15 },
  { name: "Gatos", value: 10 },
  { name: "Peces", value: 5 },
];

const preguntas = [
  {
    id: 1,
    tipo: "barras",
    pregunta: "¿Cuál fruta es la que más tienen los niños?",
    opciones: ["Manzanas", "Bananas", "Uvas"],
    respuesta: "Manzanas",
    data: dataFrutas,
    explicacion:
      "Este es un gráfico de barras. Se usa para comparar cantidades de diferentes categorías. Observa cuál barra es más alta.",
  },
  {
    id: 2,
    tipo: "pie",
    pregunta: "¿Cuál color es el más preferido?",
    opciones: ["Rojo", "Azul", "Verde"],
    respuesta: "Azul",
    data: dataColores,
    explicacion:
      "Este es un gráfico circular o de pastel. Muestra cómo se divide un total en partes. El pedazo más grande es el que más se repite.",
  },
  {
    id: 3,
    tipo: "pictograma",
    pregunta: "¿Qué animal aparece más veces en el gráfico?",
    opciones: ["🐶", "🐱", "🐰"],
    respuesta: "🐶",
    data: dataAnimales,
    explicacion:
      "Este es un pictograma. Representa cantidades usando dibujos o íconos. Mientras más veces aparece un dibujo, mayor es la cantidad.",
  },
  {
    id: 4,
    tipo: "barras",
    pregunta: "¿Cuál es el deporte más practicado?",
    opciones: ["Fútbol", "Básquet", "Natación"],
    respuesta: "Fútbol",
    data: dataDeportes,
    explicacion:
      "Otra vez vemos un gráfico de barras. Observa cuál barra es más alta, significa que más niños practican ese deporte.",
  },
  {
    id: 5,
    tipo: "pie",
    pregunta: "¿Cuál sabor de helado es el favorito?",
    opciones: ["Chocolate", "Vainilla", "Fresa"],
    respuesta: "Fresa",
    data: dataHelados,
    explicacion:
      "En este gráfico circular, cada pedazo representa un sabor. El pedazo más grande significa que es el preferido.",
  },
  {
    id: 6,
    tipo: "pictograma",
    pregunta: "¿Qué medio de transporte aparece más veces?",
    opciones: ["🚗", "🚲", "🚌"],
    respuesta: "🚲",
    data: dataTransportes,
    explicacion:
      "Aquí tenemos un pictograma con transportes. El que aparece más veces es el más usado.",
  },
  {
    id: 7,
    tipo: "barras",
    pregunta: "¿Cuál mascota es la más popular?",
    opciones: ["Perros", "Gatos", "Peces"],
    respuesta: "Perros",
    data: dataMascotas,
    explicacion:
      "Este gráfico de barras muestra qué mascota prefieren más los niños. Mira cuál barra es más grande.",
  },
];

export default function JuegoGraficas() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [acierto, setAcierto] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const current = preguntas[preguntaActual];

  // 🔊 Explicación con voz automática (Text-to-Speech)
  useEffect(() => {
    if (current?.explicacion && !finalizado) {
      const utterance = new SpeechSynthesisUtterance(current.explicacion);
      utterance.lang = "es-ES";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [preguntaActual, finalizado]);

  const verificarRespuesta = (opcion) => {
    if (opcion === current.respuesta) {
      setAcierto(true);
      setTimeout(() => {
        setAcierto(false);
        if (preguntaActual < preguntas.length - 1) {
          setPreguntaActual(preguntaActual + 1);
        } else {
          setFinalizado(true);
        }
      }, 2000);
    } else {
      alert("❌ Intenta de nuevo");
    }
  };

  const reiniciarJuego = () => {
    setPreguntaActual(0);
    setFinalizado(false);
  };

  return (
    <div>
      <style>
        {`
          @media (max-width: 600px) {
            .jg-container {
              padding: 15px !important;
              max-width: 100% !important;
              margin: 10px auto !important;
              border-radius: 8px !important;
            }
            .jg-chart {
              width: 100% !important;
              min-width: 0 !important;
              height: auto !important;
            }
            .jg-pictograma {
              font-size: 28px !important;
              margin: 8px !important;
            }
            .jg-btn {
              font-size: 14px !important;
              padding: 8px 12px !important;
              margin: 6px !important;
            }
            .jg-btn-main {
              font-size: 16px !important;
              padding: 10px 15px !important;
              margin-top: 20px !important;
            }
          }
        `}
      </style>
      <div
        className="jg-container"
        style={{
          textAlign: "center",
          padding: "50px",
          maxWidth: "800px",
          margin: "60px auto",
          border: "2px solid #ccc",
          borderRadius: "15px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {acierto && <Confetti />}
        <h1>🎮 Juego de Gráficas y Pictogramas</h1>

        {!finalizado ? (
          <>
            <p>
              Observa con atención cada gráfica o pictograma, escucha la
              explicación, lee la pregunta y elige la respuesta correcta.
            </p>

            <h2>{current.pregunta}</h2>
            <p style={{ fontStyle: "italic", color: "#555" }}>
              {current.explicacion}
            </p>

            {/* Mostrar gráficas */}
            {current.tipo === "barras" && (
              <BarChart
                className="jg-chart"
                width={350}
                height={250}
                data={current.data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            )}

            {current.tipo === "pie" && (
              <PieChart className="jg-chart" width={350} height={250}>
                <Pie
                  data={current.data}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {current.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#ff6384", "#36a2eb", "#4bc0c0"][index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}

            {current.tipo === "pictograma" && (
              <div className="jg-pictograma" style={{ fontSize: "40px", margin: "15px" }}>
                {current.data.map((item, idx) => (
                  <div key={idx}>
                    {item.name.repeat(item.value)} ({item.value})
                  </div>
                ))}
              </div>
            )}

            {/* Opciones */}
            <div style={{ marginTop: "20px" }}>
              {current.opciones.map((op, idx) => (
                <button
                  className="jg-btn"
                  key={idx}
                  onClick={() => verificarRespuesta(op)}
                  style={{
                    margin: "10px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    backgroundColor: "#ffd966",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {op}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ marginTop: "30px" }}>
            <h2>🎉 ¡Felicidades!</h2>
            <p>
              Has terminado todas las preguntas y aprendiste sobre gráficas y
              pictogramas.
            </p>
            <Confetti />
          </div>
        )}

        {/* ✅ Botones siempre visibles */}
        <div style={{ marginTop: "40px" }}>
          <button
            className="jg-btn-main"
            onClick={reiniciarJuego}
            style={{
              marginRight: "15px",
              padding: "12px 25px",
              fontSize: "18px",
              borderRadius: "12px",
              backgroundColor: "#f39c12",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔄 Intentar de Nuevo
          </button>
          <button
            className="jg-btn-main"
            onClick={() => (window.location.href = "/clases")}
            style={{
              padding: "12px 25px",
              fontSize: "18px",
              borderRadius: "12px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            📚 Regresar a Clases
          </button>
        </div>
      </div>
    </div>
  );
}
