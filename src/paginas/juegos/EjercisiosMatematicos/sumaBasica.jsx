import React from 'react';
import Ejerciciosglobal from './Ejerciciosglobal';
import { generarEjercicios } from './helpers';

const EjercicioSuma = ({ nivel = 'basico' }) => {
  return (
    <Ejerciciosglobal 
      ejercicios={generarEjercicios('suma', nivel)}
      nivelDificultad={nivel}
      tipoOperacion="suma"
    />
  );
};

export default EjercicioSuma;