import React, { useState, useEffect, useRef } from 'react';
import './Ejercicio1.css';

// Funciones para generar ejercicios dinámicos
const generarEjerciciosSuma = (cantidad = 5) => {
  const ejercicios = [];
  for (let i = 0; i < cantidad; i++) {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    ejercicios.push({
      titulo: `Suma ${i + 1}`,
      pregunta: `Resuelve: ${num1} + ${num2} = ?`,
      respuestaCorrecta: num1 + num2
    });
  }
  return ejercicios;
};

const generarEjerciciosResta = (cantidad = 5) => {
  const ejercicios = [];
  for (let i = 0; i < cantidad; i++) {
    const num1 = Math.floor(Math.random() * 10) + 5;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const mayor = Math.max(num1, num2);
    const menor = Math.min(num1, num2);
    ejercicios.push({
      titulo: `Resta ${i + 1}`,
      pregunta: `Resuelve: ${mayor} - ${menor} = ?`,
      respuestaCorrecta: mayor - menor
    });
  }
  return ejercicios;
};

const generarEjerciciosMultiplicacion = (cantidad = 5) => {
  const ejercicios = [];
  for (let i = 0; i < cantidad; i++) {
    const num1 = Math.floor(Math.random() * 5) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    ejercicios.push({
      titulo: `Multiplicación ${i + 1}`,
      pregunta: `Resuelve: ${num1} × ${num2} = ?`,
      respuestaCorrecta: num1 * num2
    });
  }
  return ejercicios;
};

const generarEjerciciosDivision = (cantidad = 5) => {
  const ejercicios = [];
  for (let i = 0; i < cantidad; i++) {
    const divisor = Math.floor(Math.random() * 5) + 1;
    const resultado = Math.floor(Math.random() * 5) + 1;
    const dividendo = divisor * resultado;
    ejercicios.push({
      titulo: `División ${i + 1}`,
      pregunta: `Resuelve: ${dividendo} ÷ ${divisor} = ?`,
      respuestaCorrecta: resultado
    });
  }
  return ejercicios;
};

// Componente para ejercicios de suma
const EjercicioMatematicasSuma = () => {
  const [ejercicios] = useState(generarEjerciciosSuma());
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
  const [ejercicios] = useState(generarEjerciciosResta());
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
  const [ejercicios] = useState(generarEjerciciosMultiplicacion());
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
  const [ejercicios] = useState(generarEjerciciosDivision());
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
  const [operacionSeleccionada, setOperacionSeleccionada] = useState(null);

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
        return null;
    }
  };

  return (
    <div className="contenedor-ejercicios">
      <h1 className="titulo-principal">Ejercicios de Matemáticas</h1>
      <p className="mensaje-seleccion">Selecciona una operación para comenzar:</p>

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

      <div className="contenedor-caja">
        {renderizarCaja()}
      </div>
    </div>
  );
};

export default EjercicioMatematicas;