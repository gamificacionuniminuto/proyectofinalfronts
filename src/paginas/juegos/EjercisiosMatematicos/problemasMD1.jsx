import React, { useState } from "react";

export default function JuegoHistoriasInteractivo() {
  const preguntas = [
    // Multiplicación
    { pregunta: "1. Una señora compró 8 paquetes con seis sodas cada uno, ¿Cuántas sodas llevará a la fiesta?", opciones: [14, 42, 48, 50], respuesta: 48, tipo: "multiplicación", explicacion: ["8 paquetes × 6 sodas cada uno", "8 + 8 + 8 + 8 + 8 + 8 + 8 + 8", "Sumando todos: 48 sodas"] },
    { pregunta: "2. Pedro tiene 7 cajas con 9 lápices cada una. ¿Cuántos lápices tiene en total?", opciones: [63, 56, 70, 60], respuesta: 63, tipo: "multiplicación", explicacion: ["7 cajas × 9 lápices cada una", "9 + 9 + 9 + 9 + 9 + 9 + 9", "Total: 63 lápices"] },
    { pregunta: "3. En un huerto hay 5 árboles y cada árbol tiene 12 manzanas. ¿Cuántas manzanas hay en total?", opciones: [60, 50, 70, 55], respuesta: 60, tipo: "multiplicación", explicacion: ["5 árboles × 12 manzanas", "12 + 12 + 12 + 12 + 12", "Total: 60 manzanas"] },
    { pregunta: "4. Ana compró 9 paquetes con 10 galletas cada uno. ¿Cuántas galletas tiene en total?", opciones: [90, 80, 100, 70], respuesta: 90, tipo: "multiplicación", explicacion: ["9 paquetes × 10 galletas", "10 + 10 + ... +10 (9 veces)", "Total: 90 galletas"] },
    { pregunta: "5. Hay 6 mesas y en cada mesa caben 4 personas. ¿Cuántas personas caben en total?", opciones: [24, 20, 26, 22], respuesta: 24, tipo: "multiplicación", explicacion: ["6 mesas × 4 personas", "4 + 4 + 4 + 4 + 4 + 4", "Total: 24 personas"] },
    { pregunta: "6. Un camión transporta 15 cajas con 7 juguetes cada una. ¿Cuántos juguetes transporta?", opciones: [105, 100, 110, 120], respuesta: 105, tipo: "multiplicación", explicacion: ["15 cajas × 7 juguetes", "7 + 7 + ... + 7 (15 veces)", "Total: 105 juguetes"] },
    { pregunta: "7. Una librería vende 12 libros por paquete y compran 8 paquetes. ¿Cuántos libros compraron?", opciones: [96, 88, 100, 90], respuesta: 96, tipo: "multiplicación", explicacion: ["12 libros × 8 paquetes", "12 + 12 + ... + 12 (8 veces)", "Total: 96 libros"] },
    { pregunta: "8. Cada alumno tiene 5 lápices y hay 11 alumnos. ¿Cuántos lápices hay en total?", opciones: [55, 50, 60, 65], respuesta: 55, tipo: "multiplicación", explicacion: ["11 alumnos × 5 lápices", "5 + 5 + ... +5 (11 veces)", "Total: 55 lápices"] },
    { pregunta: "9. Hay 4 cajas y cada caja tiene 9 globos. ¿Cuántos globos hay en total?", opciones: [36, 35, 32, 30], respuesta: 36, tipo: "multiplicación", explicacion: ["4 cajas × 9 globos", "9 + 9 + 9 + 9", "Total: 36 globos"] },
    { pregunta: "10. Un granjero tiene 10 gallinas y cada gallina pone 6 huevos a la semana. ¿Cuántos huevos tiene en una semana?", opciones: [60, 50, 55, 65], respuesta: 60, tipo: "multiplicación", explicacion: ["10 gallinas × 6 huevos", "6 + 6 + ... +6 (10 veces)", "Total: 60 huevos"] },
    // División
    { pregunta: "11. Un grupo de niños reparte 36 caramelos entre 6 amigos. ¿Cuántos caramelos recibe cada uno?", opciones: [6, 5, 7, 8], respuesta: 6, tipo: "división", explicacion: ["36 caramelos ÷ 6 amigos", "36 ÷ 6 = 6", "Cada niño recibe 6 caramelos"] },
    { pregunta: "12. Una maestra tiene 48 galletas y quiere repartirlas entre 8 alumnos. ¿Cuántas galletas le tocará a cada alumno?", opciones: [6, 8, 5, 12], respuesta: 6, tipo: "división", explicacion: ["48 galletas ÷ 8 alumnos", "48 ÷ 8 = 6", "Cada alumno recibe 6 galletas"] },
    { pregunta: "13. Una caja tiene 24 crayones y se quieren repartir en 4 estuches iguales. ¿Cuántos crayones tendrá cada estuche?", opciones: [6, 5, 8, 7], respuesta: 6, tipo: "división", explicacion: ["24 crayones ÷ 4 estuches", "24 ÷ 4 = 6", "Cada estuche tiene 6 crayones"] },
    { pregunta: "14. Un maestro tiene 56 libros y quiere repartirlos entre 8 estudiantes. ¿Cuántos libros recibe cada estudiante?", opciones: [6, 7, 8, 9], respuesta: 7, tipo: "división", explicacion: ["56 libros ÷ 8 estudiantes", "56 ÷ 8 = 7", "Cada estudiante recibe 7 libros"] },
    { pregunta: "15. Una tienda tiene 72 botellas y quiere ponerlas en cajas con 9 botellas cada una. ¿Cuántas cajas se necesitan?", opciones: [7, 8, 9, 6], respuesta: 8, tipo: "división", explicacion: ["72 botellas ÷ 9 por caja", "72 ÷ 9 = 8", "Se necesitan 8 cajas"] },
    { pregunta: "16. Hay 45 manzanas que se repartirán entre 5 niños. ¿Cuántas manzanas recibe cada niño?", opciones: [9, 8, 10, 7], respuesta: 9, tipo: "división", explicacion: ["45 manzanas ÷ 5 niños", "45 ÷ 5 = 9", "Cada niño recibe 9 manzanas"] },
    { pregunta: "17. Una clase tiene 36 alumnos y se quiere formar grupos de 6. ¿Cuántos grupos se forman?", opciones: [6, 5, 7, 8], respuesta: 6, tipo: "división", explicacion: ["36 alumnos ÷ 6 por grupo", "36 ÷ 6 = 6", "Se forman 6 grupos"] },
    { pregunta: "18. Se tienen 81 lápices y se quieren repartir en paquetes de 9 lápices. ¿Cuántos paquetes se necesitan?", opciones: [9, 8, 10, 7], respuesta: 9, tipo: "división", explicacion: ["81 lápices ÷ 9 por paquete", "81 ÷ 9 = 9", "Se necesitan 9 paquetes"] },
    { pregunta: "19. Una fábrica produce 120 juguetes y los coloca en cajas de 12. ¿Cuántas cajas se necesitan?", opciones: [10, 12, 8, 9], respuesta: 10, tipo: "división", explicacion: ["120 juguetes ÷ 12 por caja", "120 ÷ 12 = 10", "Se necesitan 10 cajas"] },
    { pregunta: "20. Hay 90 caramelos y se quieren repartir entre 15 niños. ¿Cuántos caramelos recibe cada niño?", opciones: [6, 5, 7, 8], respuesta: 6, tipo: "división", explicacion: ["90 caramelos ÷ 15 niños", "90 ÷ 15 = 6", "Cada niño recibe 6 caramelos"] },
  ];

  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(false);

  const hablar = (texto) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(texto);
    utterThis.lang = "es-ES";
    synth.speak(utterThis);
  };

  const handleOpcion = (opcion) => {
    if (opcion === preguntas[indice].respuesta) {
      setFeedback("¡Correcto! 🎉");
      setAciertos(aciertos + 1);
      setMostrarExplicacion(false);
      hablar("¡Muy bien! " + preguntas[indice].explicacion.join(". "));
    } else {
      setFeedback(`Ups, la respuesta correcta era ${preguntas[indice].respuesta}`);
      setMostrarExplicacion(true);
      hablar("Incorrecto. " + preguntas[indice].explicacion.join(". "));
    }
    setShowNext(true);
  };

  const intentarDeNuevo = () => {
    setFeedback("");
    setMostrarExplicacion(false);
    setShowNext(false);
  };

  const siguientePregunta = () => {
    setFeedback("");
    setMostrarExplicacion(false);
    setShowNext(false);
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
    } 
  };

  const reiniciar = () => {
    setIndice(0);
    setFeedback("");
    setMostrarExplicacion(false);
    setShowNext(false);
    setAciertos(0);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center", backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
      <h1 style={{ color: "#0077b6" }}>Juego de Multiplicaion y Division</h1>

      {indice < preguntas.length ? (
        <div style={{ backgroundColor: "#ade8f4", padding: "20px", borderRadius: "15px", margin: "20px auto", maxWidth: "500px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
          <h3 style={{ color: "#023e8a" }}>Tipo de problema: {preguntas[indice].tipo}</h3>
          <h2 style={{ color: "#023e8a" }}>{preguntas[indice].pregunta}</h2>

          {preguntas[indice].opciones.map((opcion, i) => (
            <button key={i} onClick={() => handleOpcion(opcion)}
              style={{ display: "block", width: "80%", margin: "10px auto", padding: "10px", fontSize: "18px", borderRadius: "10px", border: "none", cursor: "pointer", backgroundColor: "#0077b6", color: "white", transition: "0.3s" }}>
              {opcion}
            </button>
          ))}

          {feedback && <p style={{ fontSize: "18px", marginTop: "15px", color: "#d00000" }}>{feedback}</p>}

          {mostrarExplicacion && (
            <div style={{ backgroundColor: "#ffd6a5", padding: "15px", borderRadius: "10px", marginTop: "10px", color: "#000", textAlign: "left" }}>
              <strong>Explicación paso a paso:</strong>
              <ul>
                {preguntas[indice].explicacion.map((linea, i) => (
                  <li key={i}>{linea}</li>
                ))}
              </ul>
            </div>
          )}

          {mostrarExplicacion && (
            <button onClick={intentarDeNuevo} style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px", borderRadius: "10px", border: "none", backgroundColor: "#ff6700", color: "white", cursor: "pointer" }}>
              Intentar de nuevo
            </button>
          )}

          {showNext && indice < preguntas.length - 1 && (
            <button onClick={siguientePregunta} style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px", borderRadius: "10px", border: "none", backgroundColor: "#00b4d8", color: "white", cursor: "pointer" }}>
              Siguiente
            </button>
          )}

          <button onClick={() => window.location.href = "/clases"} style={{ marginTop: "15px", marginLeft: "10px", padding: "10px 20px", fontSize: "16px", borderRadius: "10px", border: "none", backgroundColor: "#6a4c93", color: "white", cursor: "pointer" }}>
            Regresar a Clases
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: "#90e0ef", padding: "30px", borderRadius: "15px", margin: "20px auto", maxWidth: "500px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
          <h2>¡Felicidades! 🎉</h2>
          <p>Completaste todos los ejercicios.</p>
          <p>Aciertos: {aciertos} de {preguntas.length}</p>
          <p>Recuerda: la multiplicación es para agrupar elementos y la división es para repartirlos.</p>
          <button onClick={reiniciar} style={{ marginTop: "15px", padding: "10px 20px", fontSize: "16px", borderRadius: "10px", border: "none", backgroundColor: "#00b4d8", color: "white", cursor: "pointer" }}>Jugar de nuevo</button>
          <button onClick={() => window.location.href = "/clases"} style={{ marginTop: "15px", marginLeft: "10px", padding: "10px 20px", fontSize: "16px", borderRadius: "10px", border: "none", backgroundColor: "#6a4c93", color: "white", cursor: "pointer" }}>Regresar a Clases</button>
        </div>
      )}
    <style>
        {`
            @media (max-width: 600px) {
                .juego-container {
                    padding: 10px !important;
                }
                .juego-card {
                    max-width: 98vw !important;
                    padding: 10px !important;
                    margin: 10px auto !important;
                }
                .juego-btn {
                    width: 100% !important;
                    font-size: 16px !important;
                    padding: 8px !important;
                }
            }
        `}
    </style>
    <script>
        {`
            // Agrega clases a los elementos principales para aplicar el CSS
            document.querySelectorAll('div[style*="backgroundColor"]').forEach(el => {
                el.classList.add('juego-card');
            });
            document.querySelector('div[style*="fontFamily"]').classList.add('juego-container');
            document.querySelectorAll('button').forEach(btn => {
                btn.classList.add('juego-btn');
            });
        `}
    </script>
    </div>
  );
}
