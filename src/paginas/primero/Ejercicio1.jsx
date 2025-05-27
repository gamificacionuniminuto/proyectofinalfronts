// Ejercicio1.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Ejercicio1.css';

// Componente para ejercicios de suma
const EjercicioMatematicasSuma = () => {
  const ejercicios = [
    { titulo: 'Suma Básica 1', pregunta: 'Resuelve: 7 + 5 = ?', respuestaCorrecta: 12 },
    { titulo: 'Suma Básica 2', pregunta: 'Resuelve: 2 + 9 = ?', respuestaCorrecta: 11 },
    { titulo: 'Suma Básica 3', pregunta: 'Resuelve: 5 + 4 = ?', respuestaCorrecta: 9 },
    { titulo: 'Suma Básica 4', pregunta: 'Resuelve: 3 + 2 = ?', respuestaCorrecta: 5 },
    { titulo: 'Suma Básica 5', pregunta: 'Resuelve: 4 + 3 = ?', respuestaCorrecta: 7 },
  ];

  const [respuesta, setRespuesta] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [ejercicioActual, setEjercicioActual] = useState(
    ejercicios[Math.floor(Math.random() * ejercicios.length)]
  );

  const intentarOtroRef = useRef(null);
  const inputRespuestaRef = useRef(null);

  const verificarRespuesta = () => {
    const respuestaUsuario = parseFloat(respuesta);
    if (isNaN(respuestaUsuario)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }
    const correcto = Math.abs(respuestaUsuario - ejercicioActual.respuestaCorrecta) < 0.0001;
    setEsCorrecto(correcto);
    setMostrarResultado(true);
  };

  const reiniciarEjercicio = () => {
    setRespuesta('');
    setMostrarResultado(false);
    setEsCorrecto(false);
    setEjercicioActual(ejercicios[Math.floor(Math.random() * ejercicios.length)]);
    
    if (inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !mostrarResultado) {
      e.preventDefault();
      if (respuesta) {
        verificarRespuesta();
      }
    }
  };

  useEffect(() => {
    if (mostrarResultado && intentarOtroRef.current) {
      intentarOtroRef.current.focus();
    }
  }, [mostrarResultado]);

  useEffect(() => {
    if (!mostrarResultado && inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  }, [mostrarResultado]);

  return (
    <div className="ejercicio-matematicas">
      <h1 className="titulo-ejercicio">{ejercicioActual.titulo}</h1>
      <p className="enunciado">{ejercicioActual.pregunta}</p>

      <div className="contenedor-respuesta">
        <input
          ref={inputRespuestaRef}
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          onKeyDown={manejarTecla}
          placeholder="Escribe tu respuesta"
          className="campo-respuesta"
          disabled={mostrarResultado}
        />

        {!mostrarResultado ? (
          <button
            onClick={verificarRespuesta}
            className="boton-verificar"
            disabled={!respuesta}
          >
            Verificar
          </button>
        ) : (
          <button
            ref={intentarOtroRef}
            onClick={reiniciarEjercicio}
            className="boton-reiniciar"
          >
            Intentar otro
          </button>
        )}
      </div>

      {mostrarResultado && (
        <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
          {esCorrecto ? (
            <p>¡Correcto! {ejercicioActual.pregunta} {ejercicioActual.respuestaCorrecta}</p>
          ) : (
            <p>Incorrecto. La respuesta correcta es {ejercicioActual.respuestaCorrecta}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Componente para ejercicios de resta
const EjercicioMatematicasResta = () => {
  const ejercicios = [
    { titulo: 'Resta Básica 1', pregunta: 'Resuelve: 10 - 3 = ?', respuestaCorrecta: 7 },
    { titulo: 'Resta Básica 2', pregunta: 'Resuelve: 15 - 6 = ?', respuestaCorrecta: 9 },
    { titulo: 'Resta Básica 3', pregunta: 'Resuelve: 12 - 4 = ?', respuestaCorrecta: 8 },
    { titulo: 'Resta Básica 4', pregunta: 'Resuelve: 9 - 5 = ?', respuestaCorrecta: 4 },
    { titulo: 'Resta Básica 5', pregunta: 'Resuelve: 8 - 2 = ?', respuestaCorrecta: 6 },
  ];

  const [respuesta, setRespuesta] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [ejercicioActual, setEjercicioActual] = useState(
    ejercicios[Math.floor(Math.random() * ejercicios.length)]
  );

  const intentarOtroRef = useRef(null);
  const inputRespuestaRef = useRef(null);

  const verificarRespuesta = () => {
    const respuestaUsuario = parseFloat(respuesta);
    if (isNaN(respuestaUsuario)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }
    const correcto = Math.abs(respuestaUsuario - ejercicioActual.respuestaCorrecta) < 0.0001;
    setEsCorrecto(correcto);
    setMostrarResultado(true);
  };

  const reiniciarEjercicio = () => {
    setRespuesta('');
    setMostrarResultado(false);
    setEsCorrecto(false);
    setEjercicioActual(ejercicios[Math.floor(Math.random() * ejercicios.length)]);
    
    if (inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !mostrarResultado) {
      e.preventDefault();
      if (respuesta) {
        verificarRespuesta();
      }
    }
  };

  useEffect(() => {
    if (mostrarResultado && intentarOtroRef.current) {
      intentarOtroRef.current.focus();
    }
  }, [mostrarResultado]);

  useEffect(() => {
    if (!mostrarResultado && inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  }, [mostrarResultado]);

  return (
    <div className="ejercicio-matematicas">
      <h1 className="titulo-ejercicio">{ejercicioActual.titulo}</h1>
      <p className="enunciado">{ejercicioActual.pregunta}</p>

      <div className="contenedor-respuesta">
        <input
          ref={inputRespuestaRef}
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          onKeyDown={manejarTecla}
          placeholder="Escribe tu respuesta"
          className="campo-respuesta"
          disabled={mostrarResultado}
        />

        {!mostrarResultado ? (
          <button
            onClick={verificarRespuesta}
            className="boton-verificar"
            disabled={!respuesta}
          >
            Verificar
          </button>
        ) : (
          <button
            ref={intentarOtroRef}
            onClick={reiniciarEjercicio}
            className="boton-reiniciar"
          >
            Intentar otro
          </button>
        )}
      </div>

      {mostrarResultado && (
        <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
          {esCorrecto ? (
            <p>¡Correcto! {ejercicioActual.pregunta} {ejercicioActual.respuestaCorrecta}</p>
          ) : (
            <p>Incorrecto. La respuesta correcta es {ejercicioActual.respuestaCorrecta}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Componente para ejercicios de multiplicación
const EjercicioMatematicasMultiplicacion = () => {
  const ejercicios = [
    { titulo: 'Multiplicación Básica 1', pregunta: 'Resuelve: 3 × 2 = ?', respuestaCorrecta: 6 },
    { titulo: 'Multiplicación Básica 2', pregunta: 'Resuelve: 5 × 4 = ?', respuestaCorrecta: 20 },
    { titulo: 'Multiplicación Básica 3', pregunta: 'Resuelve: 2 × 3 = ?', respuestaCorrecta: 6 },
    { titulo: 'Multiplicación Básica 4', pregunta: 'Resuelve: 4 × 2 = ?', respuestaCorrecta: 8 },
    { titulo: 'Multiplicación Básica 5', pregunta: 'Resuelve: 6 × 3 = ?', respuestaCorrecta: 18 },
  ];

  const [respuesta, setRespuesta] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [ejercicioActual, setEjercicioActual] = useState(
    ejercicios[Math.floor(Math.random() * ejercicios.length)]
  );

  const intentarOtroRef = useRef(null);
  const inputRespuestaRef = useRef(null);

  const verificarRespuesta = () => {
    const respuestaUsuario = parseFloat(respuesta);
    if (isNaN(respuestaUsuario)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }
    const correcto = Math.abs(respuestaUsuario - ejercicioActual.respuestaCorrecta) < 0.0001;
    setEsCorrecto(correcto);
    setMostrarResultado(true);
  };

  const reiniciarEjercicio = () => {
    setRespuesta('');
    setMostrarResultado(false);
    setEsCorrecto(false);
    setEjercicioActual(ejercicios[Math.floor(Math.random() * ejercicios.length)]);
    
    if (inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !mostrarResultado) {
      e.preventDefault();
      if (respuesta) {
        verificarRespuesta();
      }
    }
  };

  useEffect(() => {
    if (mostrarResultado && intentarOtroRef.current) {
      intentarOtroRef.current.focus();
    }
  }, [mostrarResultado]);

  useEffect(() => {
    if (!mostrarResultado && inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  }, [mostrarResultado]);

  return (
    <div className="ejercicio-matematicas">
      <h1 className="titulo-ejercicio">{ejercicioActual.titulo}</h1>
      <p className="enunciado">{ejercicioActual.pregunta}</p>

      <div className="contenedor-respuesta">
        <input
          ref={inputRespuestaRef}
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          onKeyDown={manejarTecla}
          placeholder="Escribe tu respuesta"
          className="campo-respuesta"
          disabled={mostrarResultado}
        />

        {!mostrarResultado ? (
          <button
            onClick={verificarRespuesta}
            className="boton-verificar"
            disabled={!respuesta}
          >
            Verificar
          </button>
        ) : (
          <button
            ref={intentarOtroRef}
            onClick={reiniciarEjercicio}
            className="boton-reiniciar"
          >
            Intentar otro
          </button>
        )}
      </div>

      {mostrarResultado && (
        <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
          {esCorrecto ? (
            <p>¡Correcto! {ejercicioActual.pregunta} {ejercicioActual.respuestaCorrecta}</p>
          ) : (
            <p>Incorrecto. La respuesta correcta es {ejercicioActual.respuestaCorrecta}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Componente para ejercicios de división
const EjercicioMatematicasDivision = () => {
  const ejercicios = [
    { titulo: 'División Básica 1', pregunta: 'Resuelve: 12 ÷ 3 = ?', respuestaCorrecta: 4 },
    { titulo: 'División Básica 2', pregunta: 'Resuelve: 20 ÷ 4 = ?', respuestaCorrecta: 5 },
    { titulo: 'División Básica 3', pregunta: 'Resuelve: 15 ÷ 3 = ?', respuestaCorrecta: 5 },
    { titulo: 'División Básica 4', pregunta: 'Resuelve: 18 ÷ 6 = ?', respuestaCorrecta: 3 },
    { titulo: 'División Básica 5', pregunta: 'Resuelve: 24 ÷ 4 = ?', respuestaCorrecta: 6 },
  ];

  const [respuesta, setRespuesta] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [esCorrecto, setEsCorrecto] = useState(false);
  const [ejercicioActual, setEjercicioActual] = useState(
    ejercicios[Math.floor(Math.random() * ejercicios.length)]
  );

  const intentarOtroRef = useRef(null);
  const inputRespuestaRef = useRef(null);

  const verificarRespuesta = () => {
    const respuestaUsuario = parseFloat(respuesta);
    if (isNaN(respuestaUsuario)) {
      alert('Por favor, ingresa un número válido.');
      return;
    }
    const correcto = Math.abs(respuestaUsuario - ejercicioActual.respuestaCorrecta) < 0.0001;
    setEsCorrecto(correcto);
    setMostrarResultado(true);
  };

  const reiniciarEjercicio = () => {
    setRespuesta('');
    setMostrarResultado(false);
    setEsCorrecto(false);
    setEjercicioActual(ejercicios[Math.floor(Math.random() * ejercicios.length)]);
    
    if (inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  };

  const manejarTecla = (e) => {
    if (e.key === 'Enter' && !mostrarResultado) {
      e.preventDefault();
      if (respuesta) {
        verificarRespuesta();
      }
    }
  };

  useEffect(() => {
    if (mostrarResultado && intentarOtroRef.current) {
      intentarOtroRef.current.focus();
    }
  }, [mostrarResultado]);

  useEffect(() => {
    if (!mostrarResultado && inputRespuestaRef.current) {
      inputRespuestaRef.current.focus();
    }
  }, [mostrarResultado]);

  return (
    <div className="ejercicio-matematicas">
      <h1 className="titulo-ejercicio">{ejercicioActual.titulo}</h1>
      <p className="enunciado">{ejercicioActual.pregunta}</p>

      <div className="contenedor-respuesta">
        <input
          ref={inputRespuestaRef}
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          onKeyDown={manejarTecla}
          placeholder="Escribe tu respuesta"
          className="campo-respuesta"
          disabled={mostrarResultado}
        />

        {!mostrarResultado ? (
          <button
            onClick={verificarRespuesta}
            className="boton-verificar"
            disabled={!respuesta}
          >
            Verificar
          </button>
        ) : (
          <button
            ref={intentarOtroRef}
            onClick={reiniciarEjercicio}
            className="boton-reiniciar"
          >
            Intentar otro
          </button>
        )}
      </div>

      {mostrarResultado && (
        <div className={`resultado ${esCorrecto ? 'correcto' : 'incorrecto'}`}>
          {esCorrecto ? (
            <p>¡Correcto! {ejercicioActual.pregunta} {ejercicioActual.respuestaCorrecta}</p>
          ) : (
            <p>Incorrecto. La respuesta correcta es {ejercicioActual.respuestaCorrecta}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Componente padre que renderiza la sección seleccionada
const EjercicioMatematicas = () => {
  const [operacionSeleccionada, setOperacionSeleccionada] = useState(null); // Estado para rastrear la operación seleccionada

  // Función para renderizar la caja correspondiente
  const renderizarCaja = () => {
    switch (operacionSeleccionada) {
      case 'suma':
        return <EjercicioMatematicasSuma />;
      case 'resta':
        return <EjercicioMatematicasResta />;
      case 'multiplicacion':
        return <EjercicioMatematicasMultiplicacion />;
      case 'division':
        return <EjercicioMatematicasDivision />;
      default:
        return null; // No renderizamos nada si no hay operación seleccionada
    }
  };

  return (
    <div className="contenedor-ejercicios">
      <h1 className="titulo-principal">Ejercicios de Matemáticas</h1>
      
      {/* Movemos el mensaje aquí, entre el título y el menú */}
      <p className="mensaje-seleccion">Selecciona una operación para comenzar:</p>

      {/* Botones para seleccionar la operación */}
      <div className="menu-operaciones">
        <button
          onClick={() => setOperacionSeleccionada('suma')}
          className={`boton-seleccion ${operacionSeleccionada === 'suma' ? 'activo' : ''}`}
        >
          Sumas
        </button>
        <button
          onClick={() => setOperacionSeleccionada('resta')}
          className={`boton-seleccion ${operacionSeleccionada === 'resta' ? 'activo' : ''}`}
        >
          Restas
        </button>
        <button
          onClick={() => setOperacionSeleccionada('multiplicacion')}
          className={`boton-seleccion ${operacionSeleccionada === 'multiplicacion' ? 'activo' : ''}`}
        >
          Multiplicaciones
        </button>
        <button
          onClick={() => setOperacionSeleccionada('division')}
          className={`boton-seleccion ${operacionSeleccionada === 'division' ? 'activo' : ''}`}
        >
          Divisiones
        </button>
      </div>

      {/* Renderizamos la caja seleccionada */}
      <div className="contenedor-caja">
        {renderizarCaja()}
      </div>
    </div>
  );
};

export default EjercicioMatematicas;