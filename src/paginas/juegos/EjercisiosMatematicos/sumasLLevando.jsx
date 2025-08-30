// JuegoInteractivoSumas.jsx
import React, { useState, useEffect } from "react";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

const generarNumeros = () => {
  const cifras = Math.random() > 0.5 ? 2 : 3;
  const max = cifras === 2 ? 99 : 999;
  const min = cifras === 2 ? 10 : 100;
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

export default function JuegoInteractivoSumas() {
  const [[num1, num2], setNumeros] = useState(generarNumeros());
  const [respuestas, setRespuestas] = useState([]);
  const [llevar, setLlevar] = useState([]);
  const [columnaActiva, setColumnaActiva] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [ejercicio, setEjercicio] = useState(1);
  const [finalizado, setFinalizado] = useState(false);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  const total = num1 + num2;
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const totalStr = total.toString();
  const maxLength = Math.max(num1Str.length, num2Str.length, totalStr.length);

  const pad = (str) => str.padStart(maxLength, " ");
  const n1 = pad(num1Str);
  const n2 = pad(num2Str);
  const res = pad(totalStr);
  const numCols = maxLength;

  const indicesVisuales = Array.from({ length: numCols }, (_, i) => numCols - 1 - i);

  // Explicación inicial
  useEffect(() => {
    hablar(
      "Hola, soy Mati. Hoy vamos a aprender a sumar llevando. Empezamos por las unidades, a la derecha. Si la suma da 10 o más, escribimos el último dígito y llevamos el de las decenas a la izquierda. ¡Vamos a practicar!"
    );
  }, []);

  // Al cambiar de columna
  useEffect(() => {
    if (finalizado || respuestas[columnaActiva] !== undefined || mostrarExplicacion) return;
    const nombres = ["unidades", "decenas", "centenas"];
    const nombre = nombres[columnaActiva] || "la siguiente cifra";
    hablar(`Ahora, escribe el dígito de las ${nombre}.`);
  }, [columnaActiva, finalizado, respuestas, mostrarExplicacion]);

  const manejarCambio = (valor, colIndex) => {
    const digito = valor.replace(/\D/g, "").slice(-1);
    if (!digito) return;

    const nuevas = [...respuestas];
    nuevas[colIndex] = digito;
    setRespuestas(nuevas);

    // Calcular carry
    const pos = maxLength - 1 - colIndex;
    const d1 = parseInt(n1[pos]) || 0;
    const d2 = parseInt(n2[pos]) || 0;
    const carryIn = llevar[colIndex] || 0;
    const suma = d1 + d2 + carryIn;
    const digitoCorrecto = (suma % 10).toString();

    if (digito === digitoCorrecto) {
      const nuevoCarry = Math.floor(suma / 10);
      const nuevosLlevar = [...llevar];
      if (nuevoCarry > 0 && colIndex + 1 < numCols) {
        nuevosLlevar[colIndex + 1] = nuevoCarry;
      }
      setLlevar(nuevosLlevar);

      if (colIndex < numCols - 1) {
        setColumnaActiva(colIndex + 1);
      }
    } else {
      setMensaje("❌ Dígito incorrecto.");
      hablar("Ese dígito no es correcto. Revisa la columna.");
      setTimeout(() => {
        const nuevas2 = [...respuestas];
        nuevas2[colIndex] = ""; // borrar dígito incorrecto
        setRespuestas(nuevas2);
      }, 1000);
    }
  };

  const verificar = () => {
    // Asegurarse de que todas las respuestas estén completas
    const respuestaCompleta = respuestas.length === numCols && respuestas.every(d => d !== undefined && d !== "");
    if (!respuestaCompleta) {
      setMensaje("⚠️ Completa todos los dígitos.");
      hablar("Todavía faltan dígitos. Completa toda la suma.");
      return;
    }

   const usuario = [...respuestas].reverse().join(""); // <- en vez de respuestas.join("")
const correcto = res.replace(/ /g, "");


    if (usuario === correcto) {
      setMensaje("¡Correcto! 🎉");
      hablar("¡Muy bien! Respuesta correcta. ¡Sigue así!");
      setPuntaje(puntaje + 1);
      setTimeout(() => {
        if (ejercicio < 8) {
          setEjercicio(ejercicio + 1);
          setNumeros(generarNumeros());
          setRespuestas([]);
          setLlevar([]);
          setColumnaActiva(0);
          setMensaje("");
          setMostrarExplicacion(false);
        } else {
          setFinalizado(true);
          hablar("¡Felicidades! Has completado todos los ejercicios. Eres un campeón de las sumas.");
        }
      }, 1500);
    } else {
      setMensaje(`❌ Incorrecto. La respuesta era ${total}`);
      hablar(`Lo siento, esa no es la respuesta correcta. La suma de ${num1} más ${num2} es ${total}. Vamos a ver cómo se resuelve.`);
      setMostrarExplicacion(true);
    }
  };

  const intentarDeNuevo = () => {
    setRespuestas([]);
    setLlevar([]);
    setColumnaActiva(0);
    setMensaje("");
    setMostrarExplicacion(false);
    hablar("Intenta de nuevo. Recuerda: empieza por las unidades.");
  };

  const reiniciarJuego = () => {
    setNumeros(generarNumeros());
    setRespuestas([]);
    setLlevar([]);
    setColumnaActiva(0);
    setMensaje("");
    setMostrarExplicacion(false);
    setPuntaje(0);
    setEjercicio(1);
    setFinalizado(false);
    hablar("Nuevo juego iniciado. ¡Vamos a sumar llevando!");
  };

  const styles = `
    .juego-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      background: linear-gradient(135deg, #e0f7fa, #fff9c4);
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
      margin-top: 20px;
    }

    .titulo {
      color: #ff6b6b;
      margin-bottom: 15px;
      font-size: 28px;
      font-weight: bold;
    }

    .volver, .btn {
      background: #6c757d;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
      margin: 10px 5px;
      font-weight: bold;
    }

    .btn-primary {
      background: #007bff;
    }

    .btn-danger {
      background: #dc3545;
    }

    .btn:hover {
      opacity: 0.9;
    }

    .explicacion-texto {
      background: #e3f2fd;
      border: 2px dashed #2196f3;
      border-radius: 12px;
      padding: 15px;
      margin: 15px 0;
      font-size: 16px;
      color: #1565c0;
      text-align: left;
      line-height: 1.6;
    }

    .explicacion-texto strong {
      color: #d32f2f;
    }

    .operacion {
      display: inline-block;
      text-align: right;
      margin: 25px auto;
      position: relative;
    }

    .fila {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 6px 0;
    }

    .simbolo {
      width: 30px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      color: #333;
    }

    .digito {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: bold;
      border: 2px solid #4caf50;
      border-radius: 10px;
      background-color: #f1f8e9;
      position: relative;
    }

    .llevar {
      color: #d32f2f;
      font-weight: bold;
      font-size: 20px;
      height: 24px;
      background: transparent;
      border: none;
    }

    .respuesta.activa {
      background-color: #fff3e0;
      border-color: #ff9800;
      box-shadow: 0 0 8px rgba(255, 152, 0, 0.4);
    }

    .flecha {
      position: absolute;
      top: -24px;
      font-size: 20px;
      color: #ff5722;
      font-weight: bold;
    }

    .linea {
      display: flex;
      gap: 10px;
      margin: 8px 0;
    }

    .linea span {
      font-size: 22px;
      font-weight: bold;
      color: #000;
    }

    input {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      border: none;
      outline: none;
      background: transparent;
      caret-color: #4caf50;
    }

    input:disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }

    .mensaje {
      margin: 20px 0;
      font-size: 20px;
      font-weight: bold;
      min-height: 28px;
      color: #1b5e20;
    }

    .explicacion-grafica {
      background: #fff3e0;
      border: 2px solid #ffb74d;
      border-radius: 12px;
      padding: 15px;
      margin: 20px 0;
      text-align: left;
    }

    .explicacion-grafica h3 {
      margin: 0 0 10px;
      color: #d84315;
    }

    .final-screen {
      text-align: center;
      padding: 10px;
    }

    .final {
      font-size: 28px;
      color: #2e7d32;
      font-weight: bold;
      margin: 10px 0;
    }
  `;
  // Estilos responsivos
  const mediaStyles = `
    @media (max-width: 900px) {
      .juego-card {
        max-width: 95vw;
        padding: 15px;
      }
      .digito {
        width: 40px;
        height: 40px;
        font-size: 18px;
      }
      .explicacion-texto,
      .explicacion-grafica {
        font-size: 15px;
        padding: 10px;
      }
      .titulo {
        font-size: 22px;
      }
    }
    @media (max-width: 600px) {
      .juego-container {
        padding: 5px;
      }
      .juego-card {
        margin-top: 5px;
        padding: 8px;
      }
      .digito {
        width: 28px;
        height: 28px;
        font-size: 14px;
        border-radius: 6px;
      }
      .simbolo {
        width: 18px;
        font-size: 15px;
      }
      .flecha {
        font-size: 15px;
        top: -16px;
      }
      .explicacion-texto,
      .explicacion-grafica {
        font-size: 13px;
        padding: 6px;
      }
      .titulo {
        font-size: 16px;
      }
      .btn, .volver {
        font-size: 13px;
        padding: 7px 12px;
        border-radius: 6px;
      }
      .mensaje {
        font-size: 15px;
      }
      .final {
        font-size: 18px;
      }
    }
    @media (max-width: 400px) {
      .juego-card {
        padding: 2px;
      }
      .digito {
        width: 18px;
        height: 18px;
        font-size: 10px;
      }
      .simbolo {
        width: 10px;
        font-size: 10px;
      }
      .explicacion-texto,
      .explicacion-grafica {
        font-size: 10px;
        padding: 2px;
      }
      .titulo {
        font-size: 12px;
      }
      .btn, .volver {
        font-size: 9px;
        padding: 4px 6px;
        border-radius: 4px;
      }
      .mensaje {
        font-size: 10px;
      }
      .final {
        font-size: 12px;
      }
    }
  `;



  return (
    <>
      <style>{styles}</style>

      <div className="juego-container">
        <div className="juego-card">
          <h1 className="titulo">🐰 Juego de Sumas Llevando</h1>

          <button onClick={() => (window.location.href = "/clases")} className="volver">
            ⬅ Regresar a Clases
          </button>

          <div className="explicacion-texto">
            <strong>¿Cómo se suma llevando?</strong><br />
            1. ✅ Empieza por las <strong>unidades</strong> (derecha).<br />
            2. ➕ Suma los dígitos de esa columna.<br />
            3. 🔁 Si da 10 o más, escribe el último dígito abajo.<br />
            4. 🔼 Escribe el número que <strong>llevas</strong> arriba de la izquierda.<br />
            5. ➡️ Sigue con las decenas, sumando lo que llevas.
          </div>

          {!finalizado ? (
            <>
              <p><strong>Ejercicio {ejercicio} de 8</strong></p>

              <div className="operacion">
                {/* Fila de llevar */}
                <div className="fila">
                  <div className="simbolo"></div>
                  {indicesVisuales.map((i) => (
                    <div key={`llevar-${i}`} className="digito llevar">
                      {llevar[i] || ""}
                    </div>
                  ))}
                </div>

                {/* Primer número */}
                <div className="fila">
                  <div className="simbolo">+</div>
                  {indicesVisuales.map((i) => {
                    const pos = maxLength - 1 - i;
                    return (
                      <div key={`num1-${i}`} className="digito">
                        {n1[pos]}
                      </div>
                    );
                  })}
                </div>

                {/* Segundo número */}
                <div className="fila">
                  <div className="simbolo"></div>
                  {indicesVisuales.map((i) => {
                    const pos = maxLength - 1 - i;
                    return (
                      <div key={`num2-${i}`} className="digito">
                        {n2[pos]}
                      </div>
                    );
                  })}
                </div>

                {/* Línea */}
                <div className="linea">
                  <span></span>
                  {Array.from({ length: numCols }).map((_, i) => (
                    <span key={i}>―</span>
                  ))}
                </div>

                {/* Respuestas */}
                <div className="fila">
                  <div className="simbolo"></div>
                  {indicesVisuales.map((i) => (
                    <div
                      key={`res-${i}`}
                      className={`digito respuesta ${columnaActiva === i ? "activa" : ""}`}
                    >
                      {columnaActiva === i && <span className="flecha">🔽</span>}
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={respuestas[i] || ""}
                        onChange={(e) => manejarCambio(e.target.value, i)}
                        autoFocus={columnaActiva === i}
                        disabled={!!respuestas[i]}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <p className="mensaje">{mensaje}</p>

              {mostrarExplicacion && (
                <div className="explicacion-grafica">
                  <h3>🔍 Así se resuelve: {num1} + {num2} = {total}</h3>
                  <p><strong>Unidades:</strong> {num1 % 10} + {num2 % 10} = {num1 % 10 + num2 % 10}. {num1 % 10 + num2 % 10 >= 10 ? `Escribimos el ${(num1 % 10 + num2 % 10) % 10} y llevamos 1.` : `No llevamos nada.`}</p>
                  
                  <p><strong>Decenas:</strong> {Math.floor(num1 / 10) % 10} + {Math.floor(num2 / 10) % 10} {num1 % 10 + num2 % 10 >= 10 ? "+ 1 (llevado)" : ""} = {Math.floor(num1 / 10) % 10 + Math.floor(num2 / 10) % 10 + (num1 % 10 + num2 % 10 >= 10 ? 1 : 0)}.</p>

                  {maxLength === 3 && (
                    <p><strong>Centenas:</strong> {Math.floor(num1 / 100)} + {Math.floor(num2 / 100)} {((Math.floor(num1 / 10) + Math.floor(num2 / 10) + (num1 % 10 + num2 % 10 >= 10 ? 1 : 0)) >= 10 ? "+ 1 (llevado)" : "")} = {Math.floor(num1 / 100) + Math.floor(num2 / 100) + ((Math.floor(num1 / 10) + Math.floor(num2 / 10) + (num1 % 10 + num2 % 10 >= 10 ? 1 : 0)) >= 10 ? 1 : 0)}.</p>
                  )}
                </div>
              )}

              <p><strong>Puntaje: {puntaje}</strong></p>

              {/* Botón Verificar solo si hay respuesta completa */}
              {respuestas.length === numCols && !mensaje && !mostrarExplicacion && (
                <button onClick={verificar} className="btn btn-primary">✅ Verificar</button>
              )}

              {/* Botón Intentar de nuevo si falló */}
              {mostrarExplicacion && (
                <button onClick={intentarDeNuevo} className="btn btn-danger">🔄 Intentar de nuevo</button>
              )}
            </>
          ) : (
            <div className="final-screen">
              <p className="final">¡Felicidades! 🎊</p>
              <p>Puntaje final: <strong>{puntaje} de 8</strong></p>
              <button onClick={reiniciarJuego} className="btn btn-primary">🎮 Jugar otra vez</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}