import React, { useEffect, useState } from "react";
import ClasesData from "./clasesData";
import "./clases.css";
import { useNavigate, useLocation } from "react-router-dom";
import ProgresoNivel from "../../componentes/ProgresoNivel.jsx"; // Asegúrate de importar el componente

const Clases = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const niveles = [...new Set(ClasesData.map((clase) => clase.nivel))];
  const [forceUpdate, setForceUpdate] = useState(false);

  // Forzar actualización cuando la ubicación cambie
  useEffect(() => {
    setForceUpdate(prev => !prev);
  }, [location.key]);

  return (
    <div className="contenedor-niveles" key={location.key}>
      <ProgresoNivel userId="id-del-usuario" key={`progreso-${location.key}`} />
      
      {niveles.map((nivel) => (
        <section key={nivel} className="nivel-section">
          <h2 className="titulo-nivel">{nivel}</h2>
          <div className="tarjetas">
            {ClasesData.filter((clase) => clase.nivel === nivel).map((clase) => (
              <div
                key={clase.id}
                className={`tarjeta ${clase.completado ? "completado" : ""}`}
                onClick={() => navigate(clase.link, { state: { fromClases: true } })}
              >
                <div className={`forma fondo-${clase.forma}`} />
                <div className="burbuja-icono" style={{ backgroundColor: clase.color }}>
                  {clase.icono}
                </div>
                <h3 className="nombre">{clase.nombre}</h3>
                <p className="descripcion">{clase.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Elementos decorativos */}
      <div className="nube nube1"></div>
      <div className="nube nube2"></div>
      <div className="nube nube3"></div>
      <div className="nube nube4"></div>
      <div className="nube nube5"></div>  
    </div>
  );
};

export default React.memo(Clases);






