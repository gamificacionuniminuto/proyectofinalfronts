import React from "react";
import ClasesData from "./clasesData";
import "./clases.css";
import { Link } from "react-router-dom";

const Clases = () => {
  const niveles = [...new Set(ClasesData.map((clase) => clase.nivel))];

  return (
    <div className="contenedor-niveles">
      {niveles.map((nivel) => (
        <section key={nivel} className="nivel-section">
          <h2 className="titulo-nivel">{nivel}</h2>
          <div className="tarjetas">
            {ClasesData.filter((clase) => clase.nivel === nivel).map((clase) => (
              <div
                key={clase.id}
                className={`tarjeta ${clase.completado ? "completado" : ""}`}
              >
                <div className={`forma fondo-${clase.forma}`} />
                <div className="burbuja-icono" style={{ backgroundColor: clase.color }}>
                  {clase.icono}
                </div>
                <h3 className="nombre">{clase.nombre}</h3>
                <p className="descripcion">{clase.descripcion}</p>
                <Link to={clase.link} className="prueba">
                  {/* Aquí puedes poner el texto que quieras que aparezca en el enlace */}
                  Ver más
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Clases;






