import React from 'react';
import './home.css';
import logo from './logosinfondo.png';
import QuienesSomos from './QuienesSomos';
import Mision from './Mision';
import Vision from './Vision'; 
import Team from './Team';



function Home() {
  return (
    <div className="home-container">
      {/* Logo flotante */}
      <img src={logo} className="logo" alt="logo" />

      {/* Contenido principal */}
      <div className="contenido-inicio">
        <QuienesSomos />
        <Mision/>
        <Vision/>
        <Team/>
       
      </div>
    </div>
  );
}

export default Home;




