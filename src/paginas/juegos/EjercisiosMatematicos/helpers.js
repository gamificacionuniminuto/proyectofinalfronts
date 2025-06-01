export const generarEjercicios = (tipo, nivel) => {
  const ejercicios = [];
  const cantidad = 20;
  
  for (let i = 0; i < cantidad; i++) {
    let num1, num2, pregunta, respuestaCorrecta, explicacion;
    
    switch(nivel) {
      case 'basico':
        [num1, num2] = generarNumerosBasicos(tipo);
        break;
      case 'medio':
        [num1, num2] = generarNumerosIntermedios(tipo);
        break;
      case 'avanzado':
        [num1, num2] = generarNumerosAvanzados(tipo);
        break;
      default:
        [num1, num2] = generarNumerosBasicos(tipo);
    }
    
    switch(tipo) {
      case 'suma':
        respuestaCorrecta = num1 + num2;
        pregunta = `${num1} + ${num2}`;
        break;
      case 'resta':
        respuestaCorrecta = num1 - num2;
        pregunta = `${num1} - ${num2}`;
        // Evitar resultados negativos en básico
        if (nivel === 'basico' && respuestaCorrecta < 0) {
          [num1, num2] = [num2, num1];
          respuestaCorrecta = num1 - num2;
          pregunta = `${num1} - ${num2}`;
        }
        break;
      case 'multiplicacion':
        respuestaCorrecta = num1 * num2;
        pregunta = `${num1} × ${num2}`;
        break;
      case 'division':
        // Asegurar división exacta en básico
        if (nivel === 'basico') {
          num2 = generarDivisor(num1);
        }
        respuestaCorrecta = num1 / num2;
        pregunta = `${num1} ÷ ${num2}`;
        explicacion = `Recuerda: ${num1} ÷ ${num2} = ${respuestaCorrecta}`;
        break;
    }
    
    ejercicios.push({
      titulo: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${nivel}`,
      pregunta,
      respuestaCorrecta,
      explicacion
    });
  }
  
  return ejercicios;
};

// Funciones auxiliares
const generarNumerosBasicos = (tipo) => {
  const max = tipo === 'division' ? 100 : 10;
  const num1 = Math.floor(Math.random() * max) + 1;
  const num2 = Math.floor(Math.random() * max) + 1;
  return [num1, num2];
};

const generarNumerosIntermedios = (tipo) => {
  const max = tipo === 'division' ? 1000 : 100;
  const num1 = Math.floor(Math.random() * max) + 10;
  const num2 = Math.floor(Math.random() * max) + 10;
  return [num1, num2];
};

const generarNumerosAvanzados = (tipo) => {
  const max = 1000;
  const num1 = Math.floor(Math.random() * max) + 100;
  let num2 = Math.floor(Math.random() * max) + 100;
  
  // Para división, evitar números demasiado grandes
  if (tipo === 'division') {
    num1 = Math.floor(Math.random() * 500) + 100;
    num2 = Math.floor(Math.random() * 50) + 5;
  }
  
  return [num1, num2];
};

const generarDivisor = (dividendo) => {
  // Encontrar divisores del dividendo para divisiones exactas
  const divisores = [];
  for (let i = 1; i <= dividendo; i++) {
    if (dividendo % i === 0) divisores.push(i);
  }
  // Evitar dividir por 1 siempre que sea posible
  const divisoresFiltrados = divisores.filter(d => d !== 1);
  return divisoresFiltrados.length > 0 
    ? divisoresFiltrados[Math.floor(Math.random() * divisoresFiltrados.length)]
    : 1;
};