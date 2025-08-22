import React, { useState, useEffect } from "react";
import "./divisionBasica.css";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DivisionesJuego = ({ onVolver }) => {
  const [num1, setNum1] = useState(getRandomInt(5, 50)); // Dividendo
  const [num2, setNum2] = useState(getRandomInt(2, 10)); // Divisor
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [vidas, setVidas] = useState(3);
  const [aciertos, setAciertos] = useState(0);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);
  const [pasos, setPasos] = useState([]);
  const [pasoActual, setPasoActual] = useState(0);
  const [cociente, setCociente] = useState(0);
  const [residuo, setResiduo] = useState(0);

  const hablar = (texto) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) synth.cancel();
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = "es-ES";
    synth.speak(utter);
  };

  useEffect(() => {
    hablar(`Resuelve la división: ${num1} entre ${num2}`);
  }, [num1, num2]);

  const nuevaPregunta = () => {
    setNum1(getRandomInt(5, 50));
    setNum2(getRandomInt(2, 10));
    setRespuesta("");
    setMensaje("");
    setMostrarExplicacion(false);
    setPasos([]);
    setPasoActual(0);
    setCociente(0);
    setResiduo(0);
  };

  const generarGrupos = (dividendo, divisor) => {
    const coc = Math.floor(dividendo / divisor);
    const res = dividendo % divisor;
    const grupos = [];

    for (let i = 0; i < divisor; i++) {
      grupos.push(
        Array.from({ length: coc }, (_, idx) => (
          <span key={`g${i}-${idx}`} className="bolita">⚪</span>
        ))
      );
    }

    const sobrantes = Array.from({ length: res }, (_, idx) => (
      <span key={`s-${idx}`} className="bolita sobrante">⚪</span>
    ));

    return { grupos, sobrantes };
  };

  const mostrarExplicacionDivision = (dividendo, divisor) => {
    const coc = Math.floor(dividendo / divisor);
    const res = dividendo % divisor;
    setCociente(coc);
    setResiduo(res);

    let listaPasos = [
      `Paso 1: Tenemos ${dividendo} bolitas en total.`,
      `Paso 2: Vamos a repartirlas en ${divisor} grupos.`,
      `Paso 3: En cada grupo ponemos ${coc} bolitas.`,
    ];
    if (res > 0) {
      listaPasos.push(`Paso 4: Sobran ${res} bolitas sin repartir.`);
    }
    listaPasos.push(`Resultado final: Cociente ${coc} y Residuo ${res}`);

    setPasos(listaPasos);
    setMostrarExplicacion(true);

    let index = 0;
    setPasoActual(0);
    const interval = setInterval(() => {
      hablar(listaPasos[index]);
      setPasoActual(index);
      index++;
      if (index >= listaPasos.length) clearInterval(interval);
    }, 3000);
  };

  const comprobar = () => {
    const correcto = Math.floor(num1 / num2);
    if (parseInt(respuesta, 10) === correcto) {
      setMensaje("✅ ¡Correcto!");
      hablar(`Muy bien, ${num1} entre ${num2} es ${correcto}`);
      setAciertos(aciertos + 1);
      nuevaPregunta();
    } else {
      setMensaje(`❌ Incorrecto`);
      hablar(`Incorrecto. Vamos a resolverlo juntos.`);
      setVidas(vidas - 1);
      mostrarExplicacionDivision(num1, num2);
      if (vidas - 1 <= 0) {
        hablar(`Juego terminado. Tu puntuación final es ${aciertos}`);
      }
    }
  };

  const reiniciar = () => {
    setVidas(3);
    setAciertos(0);
    nuevaPregunta();
  };

  const { grupos, sobrantes } = generarGrupos(num1, num2);

  return (
    <div className="juego-divisiones">
      <h2>Juego de Divisiones Básicas</h2>

<button className="btn btn-tertiary" onClick={() => window.history.back()}>
    Regresar
</button>
      {vidas > 0 ? (
        <>
          <p>
            <strong>Vidas:</strong> {vidas} ❤️ | <strong>Aciertos:</strong> {aciertos}
          </p>
          <h3>
            {num1} ÷ {num2} = ?
          </h3>
          <input
            type="number"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && comprobar()}
          />
          <button onClick={comprobar}>Comprobar</button>
          {mensaje && <p className="mensaje">{mensaje}</p>}

          {mostrarExplicacion && (
            <div className="explicacion">
              <h4>📖 Vamos a resolverlo:</h4>
              <p><strong>Dividendo:</strong> {num1}</p>
              <p><strong>Divisor:</strong> {num2}</p>
              <p><strong>Cociente:</strong> {cociente}</p>
              <p><strong>Residuo:</strong> {residuo}</p>

              <div className="grupos">
                {grupos.map((grupo, idx) => (
                  <div key={idx} className="grupo">
                    {grupo}
                  </div>
                ))}
              </div>

              {sobrantes.length > 0 && (
                <div className="sobrantes">
                  <p>⚠ Sobrantes:</p>
                  {sobrantes}
                </div>
              )}

              {pasos.map((paso, idx) => (
                <p key={idx} className={idx === pasoActual ? "paso-activo" : ""}>
                  {paso}
                </p>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h3>🎯 Juego terminado</h3>
          <p>Puntuación final: {aciertos}</p>
          <button onClick={reiniciar}>Jugar de nuevo</button>
        </>
      )}
    </div>
  );
};

export default DivisionesJuego;
