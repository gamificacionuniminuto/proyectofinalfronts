import React, { useState, useEffect } from 'react';
import './patrones.css';
import { useNavigate } from 'react-router-dom';

const JuegoPatrones = () => {
  // Estados del juego
  const [nivel, setNivel] = useState('basico');
  const [puntaje, setPuntaje] = useState(0);
  const [serie, setSerie] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [racha, setRacha] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(30);
  const [juegoActivo, setJuegoActivo] = useState(false);
    const navigate = useNavigate();

  // Tipos de patrones
  const tiposPatron = [
    'aritmetico', 
    'geometrico', 
    'cuadrado', 
    'fibonacci', 
    'alternante'
  ];

  // Generar nueva serie
  const generarSerie = () => {
    let nuevaSerie = [];
    let patron;
    let opcionesGeneradas = [];
    
    // Seleccionar un patrón aleatorio según el nivel
    if (nivel === 'basico') {
      patron = tiposPatron[Math.floor(Math.random() * 3)]; // Solo aritmético, geométrico o cuadrado
    } else if (nivel === 'intermedio') {
      patron = tiposPatron[Math.floor(Math.random() * 4)]; // Todos excepto alternante
    } else {
      patron = tiposPatron[Math.floor(Math.random() * tiposPatron.length)]; // Todos los patrones
    }
    
    // Generar serie según el patrón
    switch(patron) {
      case 'aritmetico':
        const diferencia = nivel === 'avanzado' ? 
          Math.floor(Math.random() * 10) + 1 : 
          Math.floor(Math.random() * 5) + 1;
        let inicioArit = Math.floor(Math.random() * 20) + 1;
        nuevaSerie = [inicioArit, inicioArit + diferencia, inicioArit + diferencia * 2];
        opcionesGeneradas = [
          `Sumar ${diferencia}`,
          `Restar ${diferencia}`,
          nivel === 'avanzado' ? `Multiplicar por ${diferencia}` : `Sumar ${diferencia + 1}`,
          nivel === 'avanzado' ? `Dividir por ${diferencia}` : `Sumar ${diferencia - 1 || 1}`
        ];
        break;
        
      case 'geometrico':
        const factor = nivel === 'avanzado' ? 
          Math.floor(Math.random() * 4) + 2 : 
          Math.floor(Math.random() * 3) + 2;
        let inicioGeo = Math.floor(Math.random() * 10) + 1;
        nuevaSerie = [inicioGeo, inicioGeo * factor, inicioGeo * factor * factor];
        opcionesGeneradas = [
          `Multiplicar por ${factor}`,
          `Dividir por ${factor}`,
          `Sumar ${factor * inicioGeo}`,
          `Restar ${factor}`
        ];
        break;
        
      case 'cuadrado':
        const inicioCuad = Math.floor(Math.random() * 5) + 1;
        nuevaSerie = [inicioCuad, inicioCuad * inicioCuad, Math.pow(inicioCuad, 3)];
        opcionesGeneradas = [
          'Elevar al cuadrado',
          'Multiplicar por el índice',
          'Sumar el número anterior',
          'Raíz cuadrada'
        ];
        break;
        
      case 'fibonacci':
        const inicioFib1 = Math.floor(Math.random() * 5) + 1;
        const inicioFib2 = inicioFib1 + Math.floor(Math.random() * 3) + 1;
        nuevaSerie = [inicioFib1, inicioFib2, inicioFib1 + inicioFib2];
        opcionesGeneradas = [
          'Sumar los dos anteriores',
          'Multiplicar los dos anteriores',
          'Restar los dos anteriores',
          'Dividir los dos anteriores'
        ];
        break;
        
      case 'alternante':
        const op1 = Math.floor(Math.random() * 3) + 1;
        const op2 = Math.floor(Math.random() * 3) + 1;
        const inicioAlt = Math.floor(Math.random() * 10) + 1;
        nuevaSerie = [inicioAlt, inicioAlt + op1, inicioAlt + op1 - op2];
        opcionesGeneradas = [
          `Sumar ${op1}, restar ${op2}`,
          `Sumar ${op1}, sumar ${op2}`,
          `Restar ${op1}, restar ${op2}`,
          `Restar ${op1}, sumar ${op2}`
        ];
        break;
    }
    
    // Mezclar opciones y determinar la correcta
    const opcionCorrecta = opcionesGeneradas[0];
    setRespuestaCorrecta(opcionCorrecta);
    
    // Mezclar las opciones
    const opcionesMezcladas = [...opcionesGeneradas]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    setSerie(nuevaSerie);
    setOpciones(opcionesMezcladas.includes(opcionCorrecta) ? 
      opcionesMezcladas : 
      [...opcionesMezcladas.slice(0, 3), opcionCorrecta].sort(() => Math.random() - 0.5));
    setMostrarFeedback(false);
  };

  // Manejar selección de respuesta
  const manejarSeleccion = (opcion) => {
    if (!juegoActivo) return;
    
    const esCorrecto = opcion === respuestaCorrecta;
    
    if (esCorrecto) {
      const nuevaRacha = racha + 1;
      setRacha(nuevaRacha);
      
      // Calcular puntos (base + bonificación por racha)
      let puntos = 1;
      if (nivel === 'intermedio') puntos = 2;
      if (nivel === 'avanzado') puntos = 3;
      if (nuevaRacha >= 3) puntos *= 2;
      
      setPuntaje(puntaje + puntos);
      setFeedback(`¡Correcto! +${puntos} puntos`);
    } else {
      setRacha(0);
      setFeedback('Incorrecto');
    }
    
    setMostrarFeedback(true);
    
    // Generar nueva serie después de 1 segundo
    setTimeout(() => {
      setMostrarFeedback(false);
      generarSerie();
    }, 1000);
  };

  // Cambiar nivel
  const cambiarNivel = (nuevoNivel) => {
    setNivel(nuevoNivel);
    setPuntaje(0);
    setRacha(0);
    setJuegoActivo(false);
    setTiempoRestante(30);
  };

  // Iniciar juego
  const iniciarJuego = () => {
    setPuntaje(0);
    setRacha(0);
    setJuegoActivo(true);
    setTiempoRestante(30);
    generarSerie();
  };

  // Efecto para el temporizador
  useEffect(() => {
    let intervalo;
    
    if (juegoActivo && tiempoRestante > 0) {
      intervalo = setInterval(() => {
        setTiempoRestante(prev => prev - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      setJuegoActivo(false);
      setFeedback('¡Tiempo terminado!');
      setMostrarFeedback(true);
    }
    
    return () => clearInterval(intervalo);
  }, [juegoActivo, tiempoRestante]);

  return (
    <div className="juego-patrones">
      <button 
        className="boton-regresar"
        onClick={() => navigate('/clases')}
      >
        ← Regresar
      </button>
      <h1>Identifica el Patrón Numérico</h1>
      
      <div className="controles">
        <div className="niveles">
          <button 
            className={nivel === 'basico' ? 'activo' : ''} 
            onClick={() => cambiarNivel('basico')}
            disabled={juegoActivo}
          >
            Básico
          </button>
          <button 
            className={nivel === 'intermedio' ? 'activo' : ''} 
            onClick={() => cambiarNivel('intermedio')}
            disabled={juegoActivo}
          >
            Intermedio
          </button>
          <button 
            className={nivel === 'avanzado' ? 'activo' : ''} 
            onClick={() => cambiarNivel('avanzado')}
            disabled={juegoActivo}
          >
            Avanzado
          </button>
        </div>
        
        {!juegoActivo ? (
          <button className="iniciar" onClick={iniciarJuego}>
            {puntaje > 0 ? 'Jugar de nuevo' : 'Iniciar Juego'}
          </button>
        ) : (
          <div className="info-juego">
            <div className="puntaje">Puntos: {puntaje}</div>
            <div className="temporizador">Tiempo: {tiempoRestante}s</div>
            {racha >= 3 && <div className="racha">Racha: {racha} 🔥</div>}
          </div>
        )}
      </div>
      
      {juegoActivo && (
        <div className="juego-contenido">
          
          <div className="serie">
            {serie.map((num, index) => (
              <span key={index} className="numero">
                {num}
                {index < serie.length - 1 && <span className="separador">, </span>}
              </span>
            ))}
            <span className="pregunta">¿Cuál es el patrón?</span>
          </div>
          
          <div className="opciones">
            {opciones.map((opcion, index) => (
              <button 
                key={index} 
                onClick={() => manejarSeleccion(opcion)}
                className="opcion"
              >
                {opcion}
              </button>
            ))}
   
          </div>
        </div>
      )}
      
      {mostrarFeedback && (
        <div className={`feedback ${feedback.includes('¡Correcto') ? 'correcto' : 'incorrecto'}`}>
          {feedback}
          {feedback.includes('¡Correcto') && (
            <div className="explicacion">Patrón: {respuestaCorrecta}</div>
          )}
        </div>
      )}
      
      {!juegoActivo && puntaje > 0 && (
        <div className="resultado-final">
          <h2>Juego terminado</h2>
          <p>Puntaje final: {puntaje} puntos</p>
          <p>Nivel: {nivel}</p>
        </div>
      )}
    </div>
  );
};

export default JuegoPatrones;