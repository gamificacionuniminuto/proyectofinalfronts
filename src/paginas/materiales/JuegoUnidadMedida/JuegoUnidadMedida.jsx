// JuegoUnidadMedida.jsx
import React, { useState, useEffect } from 'react';
import './JuegoUnidadMedida.css';
import { useNavigate } from 'react-router-dom';

const problemas = [
  {
    enunciado: 'Carlos quiere medir la longitud de su escritorio. Usa una regla y mide 120 centímetros. ¿Cuántos metros son?',
    respuesta: '1.2',
    unidad: 'metros',
    ejemplo: '100 cm = 1 metro',
    tipo: 'longitud',
  },
  {
    enunciado: 'Una botella contiene 2 litros de agua. ¿Cuántos mililitros son?',
    respuesta: '2000',
    unidad: 'mililitros',
    ejemplo: '1 litro = 1000 mililitros',
    tipo: 'capacidad',
  },
  {
    enunciado: 'Ana corrió 3 kilómetros. ¿Cuántos metros recorrió?',
    respuesta: '3000',
    unidad: 'metros',
    ejemplo: '1 km = 1000 metros',
    tipo: 'longitud',
  },
  {
    enunciado: 'Un saco de arroz pesa 5 kilogramos. ¿Cuántos gramos son?',
    respuesta: '5000',
    unidad: 'gramos',
    ejemplo: '1 kg = 1000 gramos',
    tipo: 'peso',
  },
  {
    enunciado: 'Una película dura 2 horas. ¿Cuántos minutos son?',
    respuesta: '120',
    unidad: 'minutos',
    ejemplo: '1 hora = 60 minutos',
    tipo: 'tiempo',
  },
  {
    enunciado: 'Un tanque tiene capacidad para 1.5 litros. ¿Cuántos mililitros son?',
    respuesta: '1500',
    unidad: 'mililitros',
    ejemplo: '1.5 L = 1500 ml',
    tipo: 'capacidad',
  },
];

const hablar = (texto) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(texto);
    msg.lang = 'es-ES';
    msg.rate = 0.9;
    msg.pitch = 1.2;
    window.speechSynthesis.speak(msg);
  }
};

const JuegoUnidadMedida = () => {
  const navigate = useNavigate();
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');
  const [mostrarEjemplo, setMostrarEjemplo] = useState(false);

  const problemaActual = problemas[indice];

  useEffect(() => {
    setResultado('');
    setRespuesta('');
    setMostrarEjemplo(false);
    hablar(`Problema ${indice + 1}: ${problemaActual.enunciado}`);
  }, [indice]);

  const mostrarAyuda = () => {
    setMostrarEjemplo(true);
    hablar(`Pista: ${problemaActual.ejemplo}`);
  };

  const verificarRespuesta = () => {
    if (respuesta.trim() === problemaActual.respuesta) {
      const texto = '¡Respuesta correcta! Muy bien hecho.';
      setResultado(texto);
      hablar(texto);
    } else {
      const texto = `Incorrecto. La respuesta es ${problemaActual.respuesta} ${problemaActual.unidad}.`;
      setResultado(texto);
      hablar(texto);
    }
  };

  const siguienteProblema = () => {
    if (indice < problemas.length - 1) {
      setIndice(indice + 1);
    } else {
      setResultado('🎉 ¡Felicidades! Has completado todos los problemas.');
      hablar('Felicidades. Has terminado el juego de unidades de medida.');
    }
  };

  const volverAlInicio = () => {
    navigate('/materiales');
  };

  return (
    <div className="contenedor-unidad-medida">
      <h2>📏 ¡Aprendemos Unidades de Medida!</h2>
      <p className="instruccion">Resuelve los problemas. ¡Mati te ayudará!</p>

      {/* Problema */}
      <div className="problema">
        <p className="enunciado">{problemaActual.enunciado}</p>

        {/* Ejemplo o ayuda */}
        {mostrarEjemplo && (
          <div className="ejemplo">
            <strong>💡 Ejemplo:</strong> {problemaActual.ejemplo}
          </div>
        )}

        {/* Input */}
        <input
          type="text"
          inputMode="numeric"
          placeholder={`Escribe tu respuesta en ${problemaActual.unidad}`}
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          className="input-respuesta"
        />

        {/* Botones */}
        <div className="botones">
          <button onClick={mostrarAyuda} className="btn-ayuda">
            ❓ ¿Necesitas ayuda?
          </button>
          <button onClick={verificarRespuesta} className="btn-verificar">
            ✅ Verificar
          </button>
          <button onClick={siguienteProblema} className="btn-siguiente">
            {indice < problemas.length - 1 ? 'Siguiente ➡️' : 'Finalizar 🎉'}
          </button>
          <button onClick={volverAlInicio} className="btn-regresar">
            ◀️ Regresar
          </button>
        </div>

        {/* Resultado */}
        {resultado && <p className={`resultado ${resultado.includes('correcta') ? 'correcto' : 'incorrecto'}`}>{resultado}</p>}
      </div>

      {/* Dato curioso */}
      <div className="curiosidad">
        <strong>💡 Dato:</strong> 
        {problemaActual.tipo === 'longitud' && 'Usamos metros para medir distancias, como la altura de una puerta.'}
        {problemaActual.tipo === 'peso' && 'Los kilogramos miden cuánto pesan las cosas, como una mochila.'}
        {problemaActual.tipo === 'capacidad' && 'Los litros miden líquidos, como el agua de una botella.'}
        {problemaActual.tipo === 'tiempo' && 'El tiempo se mide en horas, minutos y segundos.'}
      </div>
    </div>
  );
};

export default JuegoUnidadMedida;