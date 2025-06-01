import React from 'react';
import Ejerciciosglobal from './Ejerciciosglobal';
import { generarEjercicios } from './helpers';

const EjercicioResta = ({ nivel = 'basico' }) => {
  return (
    <Ejerciciosglobal 
      ejercicios={generarEjercicios('resta', nivel)}
      nivelDificultad={nivel}
      tipoOperacion="resta"
    />
  );
};

export default EjercicioResta;