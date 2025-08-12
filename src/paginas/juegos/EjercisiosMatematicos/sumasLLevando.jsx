// JuegoInteractivoSumas.jsx
import React, { useState, useEffect } from "react";
import "./sumasLLevando.css";

const hablar = (texto) => {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "es-ES";
  window.speechSynthesis.speak(msg);
};

const generarNumeros = () => {
  const cifras = Math.random() > 0.5 ? 2 : 3; // aleatorio 2 o 3 cifras
  const max = cifras === 2 ? 99 : 999;
  const min = cifras === 2 ? 10 : 100;
  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    Math.floor(Math.random() * (max - min + 1)) + min
  ];
};

export default function JuegoInteractivoSumas() {
  const [[num1, num2], setNumeros] = useState(generarNumeros());
  const [respuestas, setRespuestas] = useState([]);
  const [llevar, setLlevar] = useState([]); // valores que se llevan
  const [columnaActiva, setColumnaActiva] = useState(0); // ahora 0 = unidades
  const [mensaje, setMensaje] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [ejercicio, setEjercicio] = useState(1);
  const [finalizado, setFinalizado] = useState(false);

  const num1Str = num1.toString().padStart(
    Math.max(num1.toString().length, num2.toString().length),
    " "
  );
  const num2Str = num2.toString().padStart(num1Str.length, " ");
  const sumaStr = (num1 + num2)
    .toString()
    .padStart(num1Str.length, " ");

  // Explicación inicial al cargar el juego
  useEffect(() => {
    hablar(
      "Hoy aprenderemos a hacer sumas llevando. Se empieza siempre por las unidades. Sumamos los dos números de esa columna. Si el resultado es diez o más, escribimos solo el último dígito y llevamos el número de las decenas arriba de la siguiente columna. Después seguimos con las decenas, sumando también lo que llevamos. Y así hasta terminar la operación."
    );
  }, []);

  // Indicación de voz para cada columna
  useEffect(() => {
    const nombresCol = ["unidades", "decenas", "centenas"];
    hablar(`Escribe el número de las ${nombresCol[columnaActiva]}`);
  }, [columnaActiva]);

  const manejarCambio = (valor, index) => {
    const nuevas = [...respuestas];
    nuevas[index] = valor.slice(-1); // solo último dígito
    setRespuestas(nuevas);

    // cálculo de llevar
    const d1 = parseInt(num1Str[num1Str.length - 1 - index]) || 0;
    const d2 = parseInt(num2Str[num2Str.length - 1 - index]) || 0;
    const sumaCol = d1 + d2 + (llevar[index] || 0);
    if (sumaCol >= 10) {
      const nuevoLlevar = [...llevar];
      nuevoLlevar[index + 1] = Math.floor(sumaCol / 10);
      setLlevar(nuevoLlevar);
    }

    // avanzar columna
    if (index === columnaActiva && valor !== "") {
      if (columnaActiva < num1Str.length - 1) {
        setColumnaActiva(columnaActiva + 1);
      } else {
        verificar();
      }
    }
  };

  const verificar = () => {
    const respUsuario = respuestas.join("");
    if (respUsuario === sumaStr.replace(/ /g, "")) {
      setMensaje("¡Muy bien! 🎉");
      setPuntaje(puntaje + 1);
      hablar("Muy bien, respuesta correcta");
    } else {
      setMensaje(`Incorrecto ❌. La respuesta era ${num1 + num2}`);
      hablar(`Incorrecto. La respuesta correcta era ${num1 + num2}`);
    }

    if (ejercicio < 8) {
      setTimeout(() => {
        setEjercicio(ejercicio + 1);
        const nuevos = generarNumeros();
        setNumeros(nuevos);
        setRespuestas([]);
        setLlevar([]);
        setColumnaActiva(0); // volver a unidades
        setMensaje("");
      }, 2500);
    } else {
      setFinalizado(true);
      hablar("Has terminado los 8 ejercicios");
    }
  };

  const reiniciarJuego = () => {
    setNumeros(generarNumeros());
    setRespuestas([]);
    setLlevar([]);
    setColumnaActiva(0);
    setMensaje("");
    setPuntaje(0);
    setEjercicio(1);
    setFinalizado(false);
  };

  return (
    <div className="juego-container">
      <div className="juego-card">
        <h1 className="titulo">🐰 Juego de Sumas Llevando</h1>

        <button
          onClick={() => (window.location.href = "/clases")}
          className="btn volver"
        >
          ⬅ Regresar a Clases
        </button>

        {!finalizado ? (
          <>
            <p>Ejercicio {ejercicio} de 8</p>

            <div className="operacion">
              {/* Fila de valores llevados */}
              <div className="numeros">
                {num1Str.split("").map((_, i) => {
                  const idx = num1Str.length - 1 - i; // invertir para que quede sobre la suma
                  return (
                    <div key={i} className="digito llevar">
                      {llevar[idx] || ""}
                    </div>
                  );
                })}
              </div>

              {/* Primer número */}
              <div className="numeros">
                {num1Str.split("").map((d, i) => (
                  <div key={i} className="digito">{d}</div>
                ))}
              </div>

              {/* Segundo número */}
              <div className="numeros">
                {num2Str.split("").map((d, i) => (
                  <div key={i} className="digito">{d}</div>
                ))}
              </div>

              <div className="linea"></div>

              {/* Respuestas */}
              <div className="respuestas">
                {sumaStr.split("").map((_, i) => (
                  <div
                    key={i}
                    className={`digito respuesta ${columnaActiva === i ? "activa" : ""}`}
                  >
                    {columnaActiva === i && <span className="flecha">🔽</span>}
                    <input
                      type="number"
                      value={respuestas[i] || ""}
                      onChange={(e) => manejarCambio(e.target.value, i)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="mensaje">{mensaje}</p>
            <p>Puntaje: <b>{puntaje}</b></p>
          </>
        ) : (
          <>
            <p className="final">¡Felicidades! Has completado el juego 🎊</p>
            <p>Tu puntaje fue: {puntaje} de 8</p>
            <button onClick={reiniciarJuego} className="btn">
              Jugar otra vez
            </button>
          </>
        )}
      </div>
    </div>
  );
}
