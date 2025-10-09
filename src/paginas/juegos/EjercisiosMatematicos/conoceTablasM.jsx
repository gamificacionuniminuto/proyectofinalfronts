// JuegoConociendoTablas.jsx
import React, { useState, useEffect } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

export default function JuegoConociendoTablas() {
  const [tablaSeleccionada, setTablaSeleccionada] = useState(null);
  const [animacion, setAnimacion] = useState("");

  // Explicación inicial
  useEffect(() => {
    hablar(
      "Hola, soy Mati. Hoy vamos a conocer las tablas de multiplicar. No tienes que resolver nada, solo mira, escucha y descubre. Cada tabla es como una familia de números que se repiten. Haz clic en una tabla para escucharla."
    );
  }, []);

  const manejarClickTabla = (n) => {
    setAnimacion("escala");
    setTimeout(() => setAnimacion(""), 300);

    const ejemplo1 = `${n} por 1 es ${n}`;
    const ejemplo2 = `${n} por 2 son ${n * 2}`;
    const ejemplo3 = `${n} por 3 son ${n * 3}`;
    const ejemplo4 = `${n} por 4 son ${n * 4}`;
    const ejemplo5 = `${n} por 5 son ${n * 5}`;
    const ejemplo6 = `${n} por 6 son ${n * 6}`;
    const ejemplo7 = `${n} por 7 son ${n * 7}`;
    const ejemplo8 = `${n} por 8 son ${n * 8}`;
    const ejemplo9 = `${n} por 9 son ${n * 9}`;
    const ejemplo10 = `${n} por 10 son ${n * 10}`;
  
    const mensaje = `Esta es la tabla del ${n}. ${ejemplo1}, ${ejemplo2}, ${ejemplo3}, ${ejemplo4}, ${ejemplo5}, ${ejemplo6}, ${ejemplo7}, ${ejemplo8}, ${ejemplo9}, ${ejemplo10}. ¿Te das cuenta? Siempre se suma ${n}.`;

    setTablaSeleccionada(n);
    hablar(mensaje);
  };

  const reiniciar = () => {
    setTablaSeleccionada(null);
    hablar("Vamos a explorar otra tabla. Haz clic en cualquier número del 1 al 10.");
  };

  const styles = `
    .juego-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      background: linear-gradient(135deg, #f3e5f5, #e8f5e9);
      padding: 20px;
      font-family: 'Comic Sans MS', 'Arial', sans-serif;
    }

    .juego-card {
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      padding: 25px;
      width: 100%;
      max-width: 700px;
      text-align: center;
    }

    .titulo {
      color: #6a1b9a;
      margin-bottom: 15px;
      font-size: 28px;
      font-weight: bold;
    }

    .instruccion {
      background: #e1bee7;
      border-radius: 12px;
      padding: 15px;
      margin-bottom: 20px;
      font-size: 16px;
      color: #4a148c;
      line-height: 1.6;
    }

    .tablas-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin: 20px auto;
      max-width: 500px;
    }

    .boton-tabla {
      background: #ce93d8;
      color: white;
      border: none;
      padding: 15px;
      font-size: 20px;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .boton-tabla:hover {
      background: #ba68c8;
      transform: translateY(-2px);
    }

    .animacion-escala {
      animation: escalar 0.3s ease;
    }

    @keyframes escalar {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    .explicacion {
      background: #fff9c4;
      border: 2px solid #ffb300;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
      text-align: left;
      color: #5d4037;
    }

    .explicacion h3 {
      margin: 0 0 10px;
      color: #ef6c00;
    }

    .fila-ejemplo {
      font-size: 18px;
      margin: 5px 0;
      font-weight: bold;
    }

    .btn {
      background: #4caf50;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      margin: 10px;
    }

    .btn:hover {
      background: #388e3c;
    }

    .volver {
      background: #6c757d;
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="juego-container">
        <div className="juego-card">
          <h1 className="titulo">🔍 Conociendo las Tablas</h1>

          <button
            onClick={() => (window.location.href = "/clases")}
            className="btn volver"
          >
            ⬅ Regresar a Clases
          </button>

          <div className="instruccion">
            <strong>¿Qué vamos a hacer?</strong><br />
            Hoy no tienes que resolver nada. Solo <strong>explora</strong> las tablas.<br />
            Haz clic en un número del 1 al 10 para <strong>escuchar</strong> cómo suena su tabla.<br />
            Descubre los <strong>patrones</strong> y cómo los números crecen.
          </div>

          {!tablaSeleccionada ? (
            <>
              <p style={{ fontSize: '18px', color: '#555' }}>
                <strong>Elige una tabla para explorar:</strong>
              </p>

              <div className="tablas-grid">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className="boton-tabla"
                    onClick={() => manejarClickTabla(n)}
                    style={{
                      background: `hsl(${n * 30}, 70%, 60%)`,
                    }}
                  >
                    Tabla del {n}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className={`explicacion ${animacion ? "animacion-escala" : ""}`}>
              <h3>✨ Tabla del {tablaSeleccionada}</h3>
              <p><strong>¿Sabías que…?</strong></p>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 1 = {tablaSeleccionada}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 2 = {tablaSeleccionada * 2}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 3 = {tablaSeleccionada * 3}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 4 = {tablaSeleccionada * 4}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 5 = {tablaSeleccionada * 5}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 6 = {tablaSeleccionada * 6}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 7 = {tablaSeleccionada * 7}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 8 = {tablaSeleccionada * 8}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 9 = {tablaSeleccionada * 9}</div>
              <div className="fila-ejemplo">➡️ {tablaSeleccionada} × 10 = {tablaSeleccionada * 10}</div>
              <p style={{ marginTop: '10px', fontSize: '16px' }}>
                Cada vez se suma <strong>{tablaSeleccionada}</strong>.<br />
                ¡Es como contar de {tablaSeleccionada} en {tablaSeleccionada}!
              </p>

              <button onClick={reiniciar} className="btn">
                🔁 Elegir otra tabla
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
/* Responsive styles */
<style>
{`
    @media (max-width: 900px) {
        .juego-card {
            max-width: 95vw;
            padding: 15px;
        }
        .tablas-grid {
            max-width: 95vw;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
        }
        .explicacion {
            padding: 12px;
            margin: 12px 0;
        }
        .titulo {
            font-size: 22px;
        }
        .instruccion {
            font-size: 14px;
            padding: 10px;
        }
        .boton-tabla {
            font-size: 16px;
            padding: 10px;
        }
        .btn {
            font-size: 14px;
            padding: 8px 16px;
        }
    }
    @media (max-width: 600px) {
        .juego-container {
            padding: 5px;
            min-height: unset;
        }
        .juego-card {
            padding: 8px;
            border-radius: 10px;
        }
        .tablas-grid {
            grid-template-columns: 1fr;
            gap: 6px;
        }
        .explicacion {
            padding: 8px;
            font-size: 14px;
        }
        .titulo {
            font-size: 18px;
        }
        .instruccion {
            font-size: 12px;
            padding: 6px;
        }
        .boton-tabla {
            font-size: 14px;
            padding: 8px;
        }
        .btn {
            font-size: 12px;
            padding: 6px 12px;
        }
        .fila-ejemplo {
            font-size: 15px;
        }
    }
`}
</style>