import React from 'react';

import './home.css'; // Importación de un archivo CSS
import logo from './logosinfondo.png';

function Home() {
  return (
    <div>
      <logo /> {/* Usa el componente Hola */}
       <svg className="logo" width="300" height="300" viewBox="0 0 300 300">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Aquí puedes agregar más elementos SVG si es necesario */}
      </svg>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default Home; // Exportación por defecto



