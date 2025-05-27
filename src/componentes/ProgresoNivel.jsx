import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './progreso.css'; // Asegúrate de tener este archivo CSS para los estilos

const ProgresoNivel = ({ userId }) => {
  const [score, setScore] = useState(0);
  const [nivel, setNivel] = useState('Básico');

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/scores/${userId}`);
        const puntos = res.data.data.score;
        setScore(puntos);

        if (puntos >= 20) setNivel('Avanzado');
        else if (puntos >= 10) setNivel('Medio');
        else setNivel('Básico');
      } catch (error) {
        console.error('Error al obtener el puntaje:', error);
      }
    };

    if (userId) fetchScore();
  }, [userId]);

  return (
    <div className="barra-nivel-usuario">
      <p><strong>Nivel:</strong> {nivel} • ⭐ {score} puntos</p>
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



