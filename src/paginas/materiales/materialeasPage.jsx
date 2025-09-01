import React from "react";
import { useNavigate } from "react-router-dom";
import Mati from "../../componentes/Mati.png"; // Tu imagen de Mati
import "./materiales.css";

// Importamos iconos de react-icons
import {
  FaCalculator,
  FaShapes,
  FaMinus,
  FaTimes,
  FaDivide,
  FaSortNumericDown,
  FaBalanceScale,
  FaChartPie,
  FaClock,
  FaRuler,
  FaPuzzlePiece,
} from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

const MaterialPage = () => {
  const navigate = useNavigate();

  const materials = [
    {
      name: "Repasa los numeros",
      category: "Números",
      icon: <FaCalculator size={50} color="#4CAF50" />,
      link: "/numeros",
    },
    {
      name: "Hojas de Sumas y Restas Básicas",
      category: "Sumas",
      icon: <FaCalculator size={50} color="#2196F3" />,
      link: "/guia",
    },
    {
      name: "Figuras",
      category: "Figuras",
      icon: <FaShapes size={50} color="#FF9800" />,
      link: "/figurasgeometricas",
    },
    {
      name: "Ruleta de Números",
      category: "Juego",
      icon: <GiPerspectiveDiceSixFacesRandom size={50} color="#9C27B0" />,
      link: "/juegobingo",
    },
    {
      name: "Ejemplo de Multiplicacion",
      category: "Guia",
      icon: <FaMinus size={50} color="#F44336" />,
      link: "/problemasMD",
    },
    {
      name: "Multiplicacion",
      category: "Guia",
      icon: <FaTimes size={50} color="#795548" />,
      link: "/multiplacacion",
    },
    {
      name: "División",
      category: "Guia",
      icon: <FaDivide size={50} color="#009688" />,
      link: "/division",
    },
    {
      name: "Números Ascendentes y Descendentes",
      category: "Guia",
      icon: <FaSortNumericDown size={50} color="#3F51B5" />,
      link: "/asendentedesendente",
    },
    {
      name: "Relación de Números",
      category: "Guia",
      icon: <FaBalanceScale size={50} color="#607D8B" />,
      link: "/relacionnumeros",
    },
    {
      name: "Fracciones",
      category: "juego",
      icon: <FaChartPie size={50} color="#E91E63" />,
      link: "/juegofracciones",
    },
    {
      name: "Juego del tiempo",
      category: "juego",
      icon: <FaClock size={50} color="#00BCD4" />,
      link: "/juegoTiempo",
    },
    {
      name: "Juego unidades de medida",
      category: "juego",
      icon: <FaRuler size={50} color="#8BC34A" />,
      link: "/juegounidadmedida",
    },
    {
      name: "Problemas Simples",
      category: "Guia",
      icon: <FaPuzzlePiece size={50} color="#FFC107" />,
      link: "/problemassimples",
    },
  ];

  return (
    <div className="material-page">
      <header className="material-header">
        <div className="mati-header">
          <img src={Mati} alt="Mati el conejo" className="mati-img" />
          <h1>📚 Material de Apoyo</h1>
        </div>
        <button className="back-btn" onClick={() => navigate("/perfil")}>
          ⬅️ Volver al Perfil
        </button>
      </header>

      <section className="material-list">
        {materials.map((item, index) => (
          <div key={index} className="material-card">
            <div className="material-icon">{item.icon}</div>
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
