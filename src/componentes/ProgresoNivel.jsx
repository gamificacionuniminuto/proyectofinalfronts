import React, { useEffect, useState } from 'react';
import './progreso.css';

const ProgresoNivel = ({ userId }) => {
  const [localUser, setLocalUser] = useState({});
  const [nivel, setNivel] = useState('Básico');  
  const determinarNivel = (puntos) => {
    if (puntos < 100) {
      return 'PRUEBA';
    } else if (puntos >= 100 && puntos < 300) {
      return 'Medio';
    } else if (puntos >= 300 && puntos < 600) {
      return 'Avanzado';
    } else {
      return 'Experto';
    }
  };
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setLocalUser(localUser);      
      setNivel(determinarNivel(localUser.score || 0));
    }
  }, [localUser?.score]);

  return (
    <div className="barra-nivel-usuario">
      <p>
        <strong>Nivel:</strong> {nivel} • ⭐ {localUser.score || 0} puntos
      </p>
      <div className="barra-externa">
        <div
          className={`barra-interna ${
            nivel === 'Básico' 
              ? 'bajo' 
              : nivel === 'Medio' 
                ? 'medio' 
                : nivel === 'Avanzado' 
                  ? 'alto' 
                  : 'experto'
          }`}
         // Ajusta el cálculo según tus necesidades
        />
      </div>
    </div>
  );
};

export default ProgresoNivel;



