import React, { useState, useEffect } from "react";

export default function MultiplicacionEnCuadricula() {
  // Operación fija del ejemplo: 123 × 4
  const A = [1, 2, 3]; // centenas, decenas, unidades
  const B = 4;

  // Estado de los pasos
  const [paso, setPaso] = useState(0); // 0..3 (3 = resultado)
  const [input, setInput] = useState("");
  const [carry, setCarry] = useState({ c: "", d: "¹", u: "" }); // llevadas (solo usamos decenas)
  const [parciales, setParciales] = useState({
    u: "", // unidades (solo el "2" del 12)
    // decenas (9)
    c: "", // centenas (4)
  });
  const [mensaje, setMensaje] = useState("");
  const [vozTexto, setVozTexto] = useState("");

  // ===== voz =====
  const hablar = (t) => {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t);
      u.lang = "es-ES";
      u.rate = 0.97;
      setVozTexto(t);
      window.speechSynthesis.speak(u);
    } catch {}
  };

  useEffect(() => {
    hablar("Vamos a resolver 123 por 4. Escribe lo que corresponde en cada paso.");
    // Estado inicial: solo mostrar la marca de llevada en vacío (como guía de lugar)
    setCarry({ c: "", d: "", u: "" });
  }, []);

  useEffect(() => {
    if (paso === 0) hablar("Paso 1. Multiplica las unidades: 3 por 4.");
    if (paso === 1) hablar("Paso 2. Multiplica las decenas: 2 por 4 y suma la llevada.");
    if (paso === 2) hablar("Paso 3. Multiplica las centenas: 1 por 4.");
    if (paso === 3) hablar("Muy bien. Observa el resultado final.");
  }, [paso]);

  const verificarPaso = () => {
    const v = input.trim();
    let ok = false;

    if (paso === 0) {
      // Esperamos "12"
      if (v === "12") {
        // Se escribe 2 en unidades y se lleva 1 a decenas
        setParciales((p) => ({ ...p, u: "2" }));
        setCarry({ c: "", d: "¹", u: "" });
        ok = true;
      }
    } else if (paso === 1) {
      // Esperamos "9"
      if (v === "9") {
        setParciales((p) => ({ ...p, d: "9" }));
        ok = true;
      }
    } else if (paso === 2) {
      // Esperamos "4"
      if (v === "4") {
        setParciales((p) => ({ ...p, c: "4" }));
        ok = true;
      }
    }

    if (ok) {
      setMensaje("✅ ¡Correcto!");
      setPaso((p) => p + 1);
      setInput("");
    } else {
      setMensaje("❌ Inténtalo de nuevo. Fíjate en la columna.");
      hablar("No es correcto. Intenta de nuevo.");
    }
  };

  // ========= UI =========
  return (
    <div className="mpaso-wrapper">
      <h2 className="mpaso-title">Multiplicación paso a paso</h2>

      <div className="mpaso-voz">🔊 {vozTexto}</div>

      {/* Tablero en cuadrícula */}
      <div className="mpaso-grid" aria-label="Multiplicación en columnas 123 × 4">
        {/* Fila 1: LLEVADAS (sobre centenas, decenas, unidades) */}
        <div className="cell carry c">{carry.c}</div>
        <div className="cell carry d">{carry.d}</div>
        <div className="cell carry u">{carry.u}</div>

        {/* Fila 2: 1 2 3 */}
        <div className="cell num c">{A[0]}</div>
        <div className="cell num d">{A[1]}</div>
        <div className="cell num u">{A[2]}</div>

        {/* Fila 3: ×   4 (signo a la izquierda y 4 en unidades) */}
        <div className="cell sign">×</div>
        <div className="cell m-c"></div>
        <div className="cell m-d"></div>
        <div className="cell m-u">{B}</div>

        {/* Línea */}
        <div className="line" />

        {/* Paso 1: 12 → 1 en decenas y 2 en unidades */}
        <div className="cell p1-c"></div>
        <div className={`cell p1-d ${parciales.u ? "filled" : ""}`}>
          {parciales.u ? "1" : ""}
        </div>
        <div className={`cell p1-u ${parciales.u ? "filled" : ""}`}>
          {parciales.u}
        </div>
        <div className="note"> (4 × 3 = 12 → escribo 2 y llevo 1)</div>

        {/* Paso 2: 9 en decenas */}
        <div className="cell p2-c"></div>
        <div className={`cell p2-d ${parciales.d ? "filled" : ""}`}>
          {parciales.d}
        </div>
        <div className="cell p2-u"></div>
        <div className="note"> (4 × 2 = 8 + 1 = 9 → escribo 9)</div>

        {/* Paso 3: 4 en centenas */}
        <div className={`cell p3-c ${parciales.c ? "filled" : ""}`}>
          {parciales.c}
        </div>
        <div className="cell p3-d"></div>
        <div className="cell p3-u"></div>
        <div className="note"> (4 × 1 = 4)</div>

        {/* Línea */}
        <div className="line" />

        {/* Resultado final: 4 9 2 */}
        <div className="cell r-c">{parciales.c || ""}</div>
        <div className="cell r-d">{parciales.d || ""}</div>
        <div className="cell r-u">{parciales.u || ""}</div>
      </div>

      {/* Controles */}
      {paso < 3 && (
        <div className="mpaso-controls">
          <div className="mpaso-instruccion">
            {paso === 0 && "Escribe 12 (resultado de 3 × 4)"}
            {paso === 1 && "Escribe 9 (resultado de 2 × 4 + 1)"}
            {paso === 2 && "Escribe 4 (resultado de 1 × 4)"}
          </div>
          <input
            className="mpaso-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tu número"
          />
          <button className="btn" onClick={verificarPaso}>
            Verificar
          </button>
          <button className="btn ghost" onClick={() => hablar(vozTexto)}>
            Repetir voz
          </button>
        </div>
      )}

      {paso >= 3 && (
        <div className="mpaso-final">
          <strong>¡Listo!</strong> Observa que el resultado es <b>492</b> (no lo
          escribimos por ti: se forma con 4, 9 y 2).
        </div>
      )}

      <p className="mpaso-msg">{mensaje}</p>

      <style jsx>{`
        .mpaso-wrapper {
          max-width: 760px;
          margin: 40px auto;
          padding: 16px;
          text-align: center;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Arial;
          color: #1f2937;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }
        .mpaso-title {
          margin: 4px 0 12px;
          color: #3b3b98;
        }
        .mpaso-voz {
          max-width: 640px;
          margin: 8px auto 16px;
          padding: 10px 12px;
          border-radius: 10px;
          background: #eef6ff;
          color: #1e3a8a;
          font-style: italic;
        }

        /* === GRID ===
           4 columnas visuales:
           col 0: signo / notas
           col 1: centenas
           col 2: decenas
           col 3: unidades
        */
        .mpaso-grid {
          display: grid;
          justify-content: center;
          grid-template-columns: 28px 44px 44px 44px 1fr; /* última para notas */
          grid-auto-rows: 44px;
          gap: 4px 6px;
          align-items: center;
          margin: 8px auto 10px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", monospace;
          font-size: 22px;
        }
        .cell {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
          min-width: 36px;
          min-height: 36px;
          box-shadow: inset 0 0 0 1px #f3f4f6;
        }
        .cell.filled {
          background: #f0fdf4;
          border-color: #86efac;
        }
        .note {
          font-size: 14px;
          color: #374151;
          font-style: italic;
          grid-column: 5 / 6;
          padding-left: 6px;
        }
        .sign {
          grid-column: 1 / 2;
          color: #444;
          font-weight: 700;
          border: none;
          background: transparent;
          box-shadow: none;
        }
        .num,
        .m-c,
        .m-d,
        .m-u,
        .p1-c,
        .p1-d,
        .p1-u,
        .p2-c,
        .p2-d,
        .p2-u,
        .p3-c,
        .p3-d,
        .p3-u,
        .r-c,
        .r-d,
        .r-u,
        .carry.c,
        .carry.d,
        .carry.u {
          grid-column: auto;
        }

        /* Posiciones (columna fija) */
        .carry.c,
        .num.c,
        .m-c,
        .p1-c,
        .p2-c,
        .p3-c,
        .r-c {
          grid-column: 2 / 3; /* centenas */
        }
        .carry.d,
        .num.d,
        .m-d,
        .p1-d,
        .p2-d,
        .p3-d,
        .r-d {
          grid-column: 3 / 4; /* decenas */
        }
        .carry.u,
        .num.u,
        .m-u,
        .p1-u,
        .p2-u,
        .p3-u,
        .r-u {
          grid-column: 4 / 5; /* unidades */
        }

        /* Línea separadora ocupa columnas 2..4 */
        .line {
          grid-column: 2 / 5;
          height: 2px;
          background: #111827;
          border-radius: 2px;
          margin: 4px 0 2px;
        }

        /* Controles */
        .mpaso-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .mpaso-instruccion {
          font-size: 14px;
          color: #374151;
          margin-right: 6px;
        }
        .mpaso-input {
          width: 120px;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          text-align: center;
          font-size: 16px;
        }
        .btn {
          padding: 8px 14px;
          border: none;
          border-radius: 10px;
          background: #3b3b98;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(59, 59, 152, 0.25);
        }
        .btn:hover {
          filter: brightness(0.95);
        }
        .btn.ghost {
          background: #64748b;
        }

        .mpaso-final {
          margin-top: 10px;
        }
        .mpaso-msg {
          margin-top: 8px;
          font-weight: 600;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .mpaso-grid {
            grid-template-columns: 24px 36px 36px 36px 1fr;
            grid-auto-rows: 38px;
            font-size: 18px;
          }
          .note {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
