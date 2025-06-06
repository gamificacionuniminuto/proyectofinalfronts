import React, { useEffect, useState } from 'react';
import './progreso.css';

const ProgresoNivel = ({ userId }) => {
  const [userData, setUserData] = useState(() => {
    // Carga inicial desde localStorage o API
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { score: 0 };
  });

  // Escucha cambios en localStorage (desde otras pestañas/componentes)
  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem('user');
      if (updated) setUserData(JSON.parse(updated));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Determina nivel y progreso
  const { nivel, progreso } = calcularNivelYProgreso(userData.score || 0);

  return (
    <div className="barra-nivel-usuario">
      <p>
        <strong>Nivel:</strong> {nivel} • ⭐ {userData.score || 0} puntos
      </p>
      <div className="barra-externa">
        <div
          className={`barra-interna ${nivel.toLowerCase()}`}
          style={{ width: `${progreso}%` }}
        />
      </div>
    </div>
  );
};

// Función auxiliar fuera del componente
const calcularNivelYProgreso = (puntos) => {
  if (puntos < 100) return { nivel: 'Básico', progreso: (puntos / 100) * 100 };
  if (puntos < 300) return { nivel: 'Medio', progreso: ((puntos - 100) / 200) * 100 };
  if (puntos < 600) return { nivel: 'Avanzado', progreso: ((puntos - 300) / 300) * 100 };
  return { nivel: 'Experto', progreso: 100 };
};

export default React.memo(ProgresoNivel);




