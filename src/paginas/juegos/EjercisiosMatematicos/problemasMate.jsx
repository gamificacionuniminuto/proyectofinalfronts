import React, { useState } from "react";

export default function JuegoProblemas() {
  const ejercicios = [
    { id: 1, enunciado: "Ana tenía 12 manzanas y le dieron 8 más. ¿Cuántas tiene ahora?", operacion: "suma", resultado: 20 },
    { id: 2, enunciado: "Pedro tenía 15 dulces y se comió 7. ¿Cuántos le quedan?", operacion: "resta", resultado: 8 },
    { id: 3, enunciado: "Un paquete tiene 5 galletas. Si compras 4 paquetes, ¿cuántas galletas tienes en total?", operacion: "multiplicacion", resultado: 20 },
    { id: 4, enunciado: "María leyó 6 páginas y luego 9 páginas más. ¿Cuántas páginas leyó en total?", operacion: "suma", resultado: 15 },
    { id: 5, enunciado: "Luis tenía 30 canicas y perdió 12. ¿Cuántas canicas tiene ahora?", operacion: "resta", resultado: 18 },
    { id: 6, enunciado: "Un lápiz cuesta 3 pesos. ¿Cuánto cuestan 7 lápices?", operacion: "multiplicacion", resultado: 21 },
    { id: 7, enunciado: "En una caja había 10 pelotas y pusieron 15 más. ¿Cuántas hay ahora?", operacion: "suma", resultado: 25 },
    { id: 8, enunciado: "Carlos tenía 18 chocolates y regaló 9. ¿Cuántos chocolates le quedan?", operacion: "resta", resultado: 9 },
    { id: 9, enunciado: "Una mesa tiene 4 patas. ¿Cuántas patas tienen 6 mesas?", operacion: "multiplicacion", resultado: 24 },
    { id: 10, enunciado: "Laura recogió 11 flores y después recogió 13 más. ¿Cuántas flores recogió en total?", operacion: "suma", resultado: 24 },
    { id: 11, enunciado: "Andrés tenía 25 caramelos y se comió 10. ¿Cuántos le quedan?", operacion: "resta", resultado: 15 },
    { id: 12, enunciado: "Cada caja tiene 8 naranjas. ¿Cuántas naranjas hay en 5 cajas?", operacion: "multiplicacion", resultado: 40 }
  ];

  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [operacionElegida, setOperacionElegida] = useState("");
  const [proceso, setProceso] = useState("");
  const [resultado, setResultado] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  const verificar = () => {
    const ejercicio = ejercicios[ejercicioActual];
    if (operacionElegida !== ejercicio.operacion) {
      setMensaje(`❌ Elegiste la operación incorrecta. La correcta era: ${ejercicio.operacion}`);
      return;
    }

    if (parseInt(resultado) === ejercicio.resultado) {
      setMensaje("✅ ¡Muy bien! Resolviste el problema correctamente.");
    } else {
      setMensaje(`❌ El resultado es incorrecto. La respuesta correcta era: ${ejercicio.resultado}`);
    }
    setMostrarExplicacion(true);
  };

  const siguienteEjercicio = () => {
    setEjercicioActual((prev) => (prev + 1) % ejercicios.length);
    setOperacionElegida("");
    setProceso("");
    setResultado("");
    setMensaje("");
    setMostrarExplicacion(false);
  };

return (
    <div style={styles.contenedorPrincipal}>
        <h1 style={styles.titulo}>🧮 Juego de Problemas Matemáticos</h1>
        <p style={styles.instrucciones}>
            Lee el enunciado, elige la operación correcta y escribe tu proceso paso a paso junto al resultado. 
            Luego verifica tu respuesta.
        </p>

        <button
            style={{ ...styles.botonSiguiente, background: "#607d8b", marginBottom: "15px" }}
            onClick={() => window.location.href = "/clases"}
        >
            ⬅️ Regresar a Clases
        </button>

        <div style={styles.contenedorJuego}>
            <h2 style={styles.enunciado}>{ejercicios[ejercicioActual].enunciado}</h2>

            <div style={styles.botones}>
                <button style={operacionElegida === "suma" ? styles.botonActivo : styles.boton}
                    onClick={() => setOperacionElegida("suma")}>➕ Suma</button>
                <button style={operacionElegida === "resta" ? styles.botonActivo : styles.boton}
                    onClick={() => setOperacionElegida("resta")}>➖ Resta</button>
                <button style={operacionElegida === "multiplicacion" ? styles.botonActivo : styles.boton}
                    onClick={() => setOperacionElegida("multiplicacion")}>✖️ Multiplicación</button>
            </div>

            {operacionElegida && (
                <div style={styles.proceso}>
                    <input
                        type="text"
                        placeholder="Proceso (ej: 12 + 8)"
                        value={proceso}
                        onChange={(e) => setProceso(e.target.value)}
                        style={styles.input}
                    />
                    <span style={styles.igual}>=</span>
                    <input
                        type="number"
                        placeholder="Resultado"
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}
                        style={styles.inputResultado}
                    />
                </div>
            )}

            <button style={styles.botonVerificar} onClick={verificar}>Verificar</button>
            <p style={styles.mensaje}>{mensaje}</p>

            {mostrarExplicacion && (
                <p style={styles.explicacionExtra}>
                    📘 Explicación: El problema se resolvía con {ejercicios[ejercicioActual].operacion}.  
                    El resultado correcto era {ejercicios[ejercicioActual].resultado}.
                </p>
            )}

            <button style={styles.botonSiguiente} onClick={siguienteEjercicio}>➡️ Siguiente</button>
        </div>
    </div>
);
}

/** 🎨 Estilos */
const styles = {
    contenedorPrincipal: {
        background: "#e0f7fa",
        borderRadius: "20px",
        padding: "20px",
        maxWidth: "700px",
        margin: "70px auto",
        boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
        fontFamily: "Comic Sans MS, Arial, sans-serif",
    },
    titulo: { color: "#00796b", fontSize: "28px", marginBottom: "10px" },
    instrucciones: { fontSize: "16px", marginBottom: "20px", color: "#004d40" },
    contenedorJuego: {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },
    enunciado: { fontSize: "20px", marginBottom: "15px", color: "#222" },
    botones: { marginBottom: "15px" },
    boton: { margin: "5px", padding: "10px 20px", borderRadius: "10px", border: "none", background: "#4dd0e1", cursor: "pointer", fontSize: "16px" },
    botonActivo: { margin: "5px", padding: "10px 20px", borderRadius: "10px", border: "none", background: "#00acc1", color: "white", cursor: "pointer", fontSize: "16px" },
    proceso: { display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px" },
    input: { padding: "10px", fontSize: "16px", width: "200px", marginRight: "10px" },
    igual: { fontSize: "20px", margin: "0 10px" },
    inputResultado: { padding: "10px", fontSize: "16px", width: "100px" },
    botonVerificar: { margin: "10px", padding: "10px 25px", background: "#43a047", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" },
    mensaje: { fontSize: "16px", marginTop: "10px", fontWeight: "bold" },
    explicacionExtra: { marginTop: "10px", fontSize: "15px", color: "#555" },
    botonSiguiente: { marginTop: "15px", padding: "10px 25px", background: "#f57c00", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" },
    // Media queries (to be injected in a <style> tag)
    media: `
        @media (max-width: 600px) {
            .contenedorPrincipal {
                padding: 10px !important;
                max-width: 98vw !important;
                margin: 20px auto !important;
            }
            .contenedorJuego {
                padding: 10px !important;
            }
            .titulo {
                font-size: 20px !important;
            }
            .enunciado {
                font-size: 16px !important;
            }
            .input, .inputResultado {
                width: 100px !important;
                font-size: 14px !important;
                padding: 8px !important;
            }
            .boton, .botonActivo, .botonVerificar, .botonSiguiente {
                font-size: 14px !important;
                padding: 8px 15px !important;
            }
        }
        @media (max-width: 400px) {
            .titulo {
                font-size: 16px !important;
            }
            .enunciado {
                font-size: 13px !important;
            }
            .input, .inputResultado {
                width: 70px !important;
                font-size: 12px !important;
                padding: 6px !important;
            }
            .boton, .botonActivo, .botonVerificar, .botonSiguiente {
                font-size: 12px !important;
                padding: 6px 10px !important;
            }
        }
    `
};
