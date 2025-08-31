import React from 'react';
import { useNavigate } from 'react-router-dom';
import Mati from '../../componentes/Mati.png'; // Tu imagen de Mati
import './materiales.css';

const MaterialPage = () => {
  const navigate = useNavigate();

  const materials = [
    {
      name: 'Repasa los numeros',
      category: 'Números',
      image: 'https://example.com/numeros.png',
      link: '/numeros',
    },
    {
      name: 'Hojas de Sumas y Restas Básicas',
      category: 'Sumas',
      image: 'https://example.com/sumas.png',
      link: '/guia',
    },

    {
      name: 'Figuras',
      category: 'Figuras',
      image: 'https://example.com/figuras.png',
      link: '/figurasgeometricas',
    },
    {
      name: 'Ruleta de Números',
      category: 'Guia',
      image: 'https://example.com/bingo.png',
      link: '/juegobingo',
    },
    {
      name: 'Ejemplo de Restas',
      category: 'Guia',
      image: 'https://example.com/restasvideo.png',
      link: '/problemasMD'
    },
    {
      name: 'Multiplicacion',
      category: 'Guia',
      image: 'https://example.com/multiplicacionvideo.png',
      link: '/multiplacacion',
    },
    {
      name: 'División',
      category: 'Guia',
      image: 'https://example.com/divisionvideo.png',
      link: '/division',
    },
    {
      name: 'Números Ascendentes y Descendentes',
      category: 'Guia',
      image: 'https://example.com/ascendentedesendente.png',
      link: '/asendentedesendente',
    },
    {
      name: 'Relación de Números',
      category: 'Guia',
      image: 'https://example.com/relaciondenumeros.png',
      link: '/relacionnumeros',
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
