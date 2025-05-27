
import React, { useState } from 'react';
import './ejerciciosP.css';

const EjercicioMatematicas = () => {
    const [respuesta, setRespuesta] = useState('');
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [esCorrecto, setEsCorrecto] = useState(false);

    const ejercicio = {
        titulo: "Suma Básica",
        pregunta: "Resuelve: 7 + 5 = ?",
        respuestaCorrecta: 12
    };

    const verificarRespuesta = () => {
        const respuestaUsuario = parseInt(respuesta);
        const correcto = respuestaUsuario === ejercicio.respuestaCorrecta;
        setEsCorrecto(correcto);
        setMostrarResultado(true);
    };

    const reiniciarEjercicio = () => {
        setRespuesta('');
        setMostrarResultado(false);
        setEsCorrecto(false);
    };

    return (
        <div className="ejercicio-matematicas">
            <h1 className="titulo-ejercicio">{ejercicio.titulo}</h1>
            <p className="enunciado">{ejercicio.pregunta}</p>
            
            <div className="contenedor-respuesta">
                <input
                    type="number"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
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
                        <p>¡Correcto! {ejercicio.pregunta} {ejercicio.respuestaCorrecta}</p>
                    ) : (
                        <p>Incorrecto. La respuesta correcta es {ejercicio.respuestaCorrecta}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default EjercicioMatematicas;
