import React, { useState } from 'react';
import EjercicioMatematicasSuma from './EjercicioMatematicasSuma';
import EjercicioMatematicasResta from './EjercicioMatematicasResta';
import EjercicioMatematicasMultiplicacion from './EjercicioMatematicasMultiplicacion';
import EjercicioMatematicasDivision from './EjercicioMatematicasDivision';
import './styles.css';  


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