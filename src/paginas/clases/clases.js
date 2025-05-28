import React from "react";
import { Link } from "react-router-dom"; // Importar Link de react-router-dom
import ClasesData from "./clasesData";
import "./clases.css";

const Clases = () => {
  const niveles = [...new Set(ClasesData.map((clase) => clase.nivel))];

  return (
    <div className="contenedor-niveles">
      {niveles.map((nivel) => (
        <section key={nivel} className="nivel-section">
          <h2 className="titulo-nivel">{nivel}</h2>
          <div className="tarjetas">
            {ClasesData.filter((clase) => clase.nivel === nivel).map((clase) => (
              <Link
                to={`/clase/${clase.id}`} // 👉 Ruta dinámica
                key={clase.id}
                className={`tarjeta-link`}
              >
                <div className={`tarjeta ${clase.completado ? "completado" : ""}`}>
                  <div className={`forma fondo-${clase.forma}`} />
                  <div
                    className="burbuja-icono"
                    style={{ backgroundColor: clase.color }}
                  >
                    {clase.icono}
                  </div>
                  <h3 className="nombre">{clase.nombre}</h3>
                  <p className="descripcion">{clase.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Clases;







