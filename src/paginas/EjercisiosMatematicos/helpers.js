export const generarEjerciciosSuma = (cantidad = 5) => {
    const ejercicios = [];
    for (let i = 0; i < cantidad; i++) {
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      ejercicios.push({
        //titulo: `Suma ${i + 1}`,
        pregunta: `Resuelve: ${num1} + ${num2} = ?`,
        respuestaCorrecta: num1 + num2
      });
    }
    return ejercicios;
  };
  
  export const generarEjerciciosResta = (cantidad = 5) => {
    const ejercicios = [];
    for (let i = 0; i < cantidad; i++) {
      const num1 = Math.floor(Math.random() * 10) + 5;
      const num2 = Math.floor(Math.random() * 5) + 1;
      const mayor = Math.max(num1, num2);
      const menor = Math.min(num1, num2);
      ejercicios.push({
        //titulo: `Resta ${i + 1}`,
        pregunta: `Resuelve: ${mayor} - ${menor} = ?`,
        respuestaCorrecta: mayor - menor
      });
    }
    return ejercicios;
  };
  
  export const generarEjerciciosMultiplicacion = (cantidad = 5) => {
    const ejercicios = [];
    for (let i = 0; i < cantidad; i++) {
      const num1 = Math.floor(Math.random() * 5) + 1;
      const num2 = Math.floor(Math.random() * 5) + 1;
      ejercicios.push({
        //titulo: `Multiplicación ${i + 1}`,
        pregunta: `Resuelve: ${num1} × ${num2} = ?`,
        respuestaCorrecta: num1 * num2
      });
    }
    return ejercicios;
  };
  
  export const generarEjerciciosDivision = (cantidad = 5) => {
    const ejercicios = [];
    for (let i = 0; i < cantidad; i++) {
      const divisor = Math.floor(Math.random() * 5) + 1;
      const resultado = Math.floor(Math.random() * 5) + 1;
      const dividendo = divisor * resultado;
      ejercicios.push({
        // titulo: `División ${i + 1}`,
        pregunta: `Resuelve: ${dividendo} ÷ ${divisor} = ?`,
        respuestaCorrecta: resultado
      });
    }
    return ejercicios;
  };