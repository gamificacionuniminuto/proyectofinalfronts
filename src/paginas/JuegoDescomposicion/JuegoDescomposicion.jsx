import React, { useState } from 'react';
import './JuegoDescomposicion.css';
import { useNavigate } from 'react-router-dom';

const generarNumero = () => {
  const digitos = Math.floor(Math.random() * 3) + 3; // Entre 3 y 5 dígitos
  const max = Math.pow(10, digitos) - 1;
  const min = Math.pow(10, digitos - 1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const descomponerNumero = (numero) => {
  const descomposicion = [];
  const numStr = numero.toString().split('').reverse();
  numStr.forEach((digit, idx) => {
    if (digit !== '0') {
      descomposicion.unshift(`${digit}${'0'.repeat(idx)}`);
    }
  });
  return descomposicion.join(' + ');
};

const JuegoDescomposicion = () => {
  const navigate = useNavigate();
  const [numero, setNumero] = useState(generarNumero());
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  const verificarRespuesta = () => {
    const correcta = descomponerNumero(numero);
    if (respuesta.replace(/\s+/g, '') === correcta.replace(/\s+/g, '')) {
      setMensaje('¡Correcto!');
    } else {
      setMensaje(`Intenta de nuevo. La respuesta correcta era: ${correcta}`);
    }
  };

  const siguienteNumero = () => {
    setNumero(generarNumero());
    setRespuesta('');
    setMensaje('');
  };
  const regresarAClases = () => {
    navigate('/clases'); // <-- Redirección al presionar el botón
  };

  return (
    <div className="juego-numeros">
      <p className="intro-mensaje">
        En este juego, observa el número y descompónlo en unidades, decenas, centenas y millares.
        Por ejemplo: 1,234 se descompone en 1000 + 200 + 30 + 4.
      </p>
      <h2>¡Descompón el número!</h2>
      <div className="numero-grande">{numero}</div>
      <input
        type="text"
        placeholder="Ej: 1000 + 200 + 30 + 4"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
      />
      <div>
        <button onClick={verificarRespuesta}>Verificar</button>
        <button onClick={siguienteNumero}>Siguiente número</button>
        <button onClick={regresarAClases}>Regresar a clases</button> {/* Botón agregado */}
      </div>
      <p>{mensaje}</p>
    </div>
  );
};


export default JuegoDescomposicion;
