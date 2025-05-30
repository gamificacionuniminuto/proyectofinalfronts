import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './progreso.css'; // Asegúrate de tener este archivo CSS para los estilos

const ProgresoNivel = ({ userId }) => {
  const [score, setScore] = useState(0);
  const [nivel, setNivel] = useState('Básico');
  const [localUser, setLocalUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
  
  }
  )



  return (
    <div className="barra-nivel-usuario">
      <p><strong>Nivel:</strong> {nivel} • ⭐ {localUser.score} puntos</p>
      <div className="barra-externa">
        <div
             className={`barra-interna ${nivel === 'Básico' ? 'bajo' : nivel === 'Medio' ? 'medio' : 'alto'
            }`}
            style={{
            width: `${Math.min(score, 30) * 3.33}%`
  }}
/>

      </div>
    </div>
  );
};

export default ProgresoNivel;



