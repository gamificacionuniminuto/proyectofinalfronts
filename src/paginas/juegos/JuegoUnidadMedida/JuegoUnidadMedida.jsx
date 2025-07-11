import React, { useState, useEffect } from 'react';
import './JuegoUnidadMedida.css';
import { useNavigate } from 'react-router-dom';

const problemas = [
  {
    enunciado: 'Carlos quiere medir la longitud de su escritorio. Usa una regla y mide 120 centímetros. ¿Cuántos metros son?',
    respuesta: '1.2',
    unidad: 'metros',
  },
  {
    enunciado: 'Una botella contiene 2 litros de agua. ¿Cuántos mililitros son?',
    respuesta: '2000',
    unidad: 'mililitros',
  },
  {
    enunciado: 'Ana corrió 3 kilómetros. ¿Cuántos metros recorrió?',
    respuesta: '3000',
    unidad: 'metros',
  },
];

const JuegoUnidadMedida = () => {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');
  const navigate = useNavigate();

  const problemaActual = problemas[indice];

  const leerProblema = () => {
    const utterance = new SpeechSynthesisUtterance(problemaActual.enunciado);
    speechSynthesis.speak(utterance);
  };

  const verificarRespuesta = () => {
    if (respuesta.trim() === problemaActual.respuesta) {
      setResultado('¡Respuesta correcta! 🎉');
      const utter = new SpeechSynthesisUtterance('¡Respuesta correcta!');
      speechSynthesis.speak(utter);
    } else {
      setResultado('Respuesta incorrecta. Intenta de nuevo.');
      const utter = new SpeechSynthesisUtterance('Respuesta incorrecta. Intenta de nuevo.');
      speechSynthesis.speak(utter);
    }
  };

  const siguienteProblema = () => {
    setResultado('');
    setRespuesta('');
    if (indice < problemas.length - 1) {
      setIndice(indice + 1);
    } else {
      setResultado('¡Has completado todos los problemas!');
    }
  };

  const volverAlInicio = () => {
    navigate('/clases'); // Ajusta esta ruta según donde esté tu tarjeta principal
  };

  useEffect(() => {
    leerProblema();
  }, [indice]);

  return (
    <div className="contenedor-unidad-medida">
      <h2>Uso de unidades de medida</h2>
      <div className="problema">
        <p>{problemaActual.enunciado}</p>
        <input
          type="text"
          placeholder={`Respuesta en ${problemaActual.unidad}`}
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
        <div className="botones">
          <button onClick={verificarRespuesta}>Verificar</button>
          <button onClick={siguienteProblema}>Siguiente</button>
          <button onClick={volverAlInicio}>Regresar</button>
        </div>
        {resultado && <p className="resultado">{resultado}</p>}
      </div>
    </div>
  );
};

export default JuegoUnidadMedida;
