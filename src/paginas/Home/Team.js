import React from 'react';
import './Team.css'; // Asegúrate de importar el archivo de estilos

const Team = () => {
  return (
    <div className="team-section">
      <h1>Nuestro Equipo</h1>
      <div className="team-members">
        <div className="team-member">
          <img src="path/to/member1.jpg" alt="Miembro 1" />
          <h2>Kevin Huaza</h2>
       
        </div>
        <div className="team-member">
          <img src="path/to/member2.jpg" alt="Miembro 2" />
          <h2>Jennifer Ceballos</h2>
        
        </div>
        <div className="team-member">
          <img src="path/to/member3.jpg" alt="Miembro 3" />
          <h2>Jovanny Ocampo</h2>
         
        </div>
        {/* Agrega más miembros según sea necesario */}
      </div>
    </div>
  );
}

export default Team;
