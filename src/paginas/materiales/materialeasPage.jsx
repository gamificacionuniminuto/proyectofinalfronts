import React from 'react';
import { useNavigate } from 'react-router-dom';
import Mati from '../../componentes/Mati.png'; // Tu imagen de Mati
import './materiales.css';

const MaterialPage = () => {
  const navigate = useNavigate();

  const materials = [
    {
      name: 'Hojas de Sumas Básicas',
      category: 'Sumas',
      image: 'https://example.com/sumas.png',
      link: '/material/sumas'
    },
    {
      name: 'Tarjetas de Figuras',
      category: 'Figuras',
      image: 'https://example.com/figuras.png',
      link: '/material/figuras'
    },
    {
      name: 'Bingo de Números',
      category: 'Juegos',
      image: 'https://example.com/bingo.png',
      link: '/material/bingo'
    },
    {
      name: 'Video: Aprende a Restar',
      category: 'Videos',
      image: 'https://example.com/restasvideo.png',
      link: '/material/restasvideo'
    },
  ];

  return (
    <div className="material-page">
      <header className="material-header">
        <div className="mati-header">
          <img src={Mati} alt="Mati el conejo" className="mati-img" />
          <h1>📚 Material de Apoyo</h1>
        </div>
        <button className="back-btn" onClick={() => navigate('/perfil')}>⬅️ Volver al Perfil</button>
      </header>

      <section className="material-list">
        {materials.map((item, index) => (
          <div key={index} className="material-card">
            <img src={item.image} alt={item.name} className="material-img"/>
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <button onClick={() => navigate(item.link)}>Ver Material</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MaterialPage;
