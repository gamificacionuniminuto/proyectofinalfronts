import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const bancoProblemas = [
  // Sumas
  { enunciado: "Carlos tenía 19 piedras y luego recogió 9 más. ¿Cuántas piedras tiene ahora?", respuesta: 28 },
  { enunciado: "Ana tiene 12 caramelos y su mamá le dio 8 más. ¿Cuántos tiene en total?", respuesta: 20 },
  { enunciado: "Pedro encontró 5 monedas y luego encontró 13 más. ¿Cuántas monedas tiene?", respuesta: 18 },
  { enunciado: "Marta compró 7 lápices y luego compró 6 más. ¿Cuántos lápices tiene ahora?", respuesta: 13 },
  { enunciado: "Juan leyó 15 páginas y luego leyó 10 más. ¿Cuántas páginas leyó en total?", respuesta: 25 },

  // Restas
  { enunciado: "Sofía tenía 14 lápices y prestó 4. ¿Cuántos le quedan?", respuesta: 10 },
  { enunciado: "Miguel tenía 20 caramelos y se comió 5. ¿Cuántos le quedan?", respuesta: 15 },
  { enunciado: "Daniel tenía 30 pelotas y regaló 10. ¿Cuántas le quedan?", respuesta: 20 },
  { enunciado: "Lucía tenía 18 libros y prestó 3. ¿Cuántos le quedan?", respuesta: 15 },
  { enunciado: "Paula tenía 10 galletas y se comió 2. ¿Cuántas tiene ahora?", respuesta: 8 },

  // Multiplicación
  { enunciado: "En cada caja hay 7 manzanas y hay 10 cajas. ¿Cuántas manzanas hay?", respuesta: 70 },
  { enunciado: "Cada niño tiene 4 globos y hay 6 niños. ¿Cuántos globos hay en total?", respuesta: 24 },
  { enunciado: "Hay 5 filas con 8 sillas cada una. ¿Cuántas sillas hay?", respuesta: 40 },
  { enunciado: "Cada paquete tiene 9 galletas. Si tengo 3 paquetes, ¿cuántas galletas tengo?", respuesta: 27 },
  { enunciado: "Cada florero tiene 5 flores. Si hay 7 floreros, ¿cuántas flores hay?", respuesta: 35 },

  // División
  { enunciado: "Se reparten 12 galletas entre 4 niños. ¿Cuántas recibe cada uno?", respuesta: 3 },
  { enunciado: "Hay 18 lápices y se reparten en 6 estuches. ¿Cuántos lápices por estuche?", respuesta: 3 },
  { enunciado: "20 caramelos se reparten entre 5 niños. ¿Cuántos recibe cada niño?", respuesta: 4 },
  { enunciado: "24 manzanas se reparten entre 8 personas. ¿Cuántas recibe cada persona?", respuesta: 3 },
  { enunciado: "30 globos se reparten entre 10 niños. ¿Cuántos globos recibe cada uno?", respuesta: 3 },
];

const hablar = (texto) => {
  const mensaje = new SpeechSynthesisUtterance(texto);
  mensaje.lang = 'es-ES';
  window.speechSynthesis.speak(mensaje);
};

function obtenerProblemaAleatorio() {
  return bancoProblemas[Math.floor(Math.random() * bancoProblemas.length)];
}

const ProblemasSimples = () => {
  const [problema, setProblema] = useState(obtenerProblemaAleatorio());
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    hablar(problema.enunciado); // Lee el problema al cargar
  }, [problema]);

  const verificarRespuesta = () => {
    const esCorrecto = parseInt(respuestaUsuario) === problema.respuesta;
    const mensajeVoz = esCorrecto ? '¡Muy bien! La respuesta es correcta.' : 'Lo siento, esa no es la respuesta. Intenta otra vez.';
    const mensajeTexto = esCorrecto ? '✅ ¡Correcto!' : '❌ Intenta de nuevo';

    setMensaje(mensajeTexto);
    hablar(mensajeVoz);
  };

  const siguienteProblema = () => {
    const nuevoProblema = obtenerProblemaAleatorio();
    setProblema(nuevoProblema);
    setRespuestaUsuario('');
    setMensaje('');
  };

  return (
    <div className="contenedor-problemas">
      <div className="nav-buttons">
        <button className="back-button2" onClick={() => navigate(-1)}>🔙 Regresar</button>
      </div>
     <h2>🧠 Resuelve el problema</h2>
      <p className="problema-texto">{problema.enunciado}</p>
      <input
        type="number"
        placeholder="Tu respuesta"
        value={respuestaUsuario}
        onChange={(e) => setRespuestaUsuario(e.target.value)}
      />
      <div className="botones">
        <button onClick={verificarRespuesta}>Verificar</button>
        <button onClick={siguienteProblema}>Siguiente</button>
      </div>
      <p className="mensaje">{mensaje}</p>
    </div>
  );
};

export default ProblemasSimples;
