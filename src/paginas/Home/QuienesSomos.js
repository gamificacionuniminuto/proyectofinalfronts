import React from "react";
import { motion } from "framer-motion";
import "./QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <motion.section 
      className="quienes-somos"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <h2>¿Quiénes somos?</h2>
        <p>
          AprendeKids es una academia de refuerzo escolar que utiliza inteligencia artificial para ofrecer
          una experiencia de aprendizaje personalizada, divertida e innovadora. Nuestro objetivo es apoyar
          a niños de transición a quinto grado en su proceso educativo, brindando herramientas adaptadas a
          sus necesidades y ritmo de aprendizaje.
        </p>
        <p>
          Con una interfaz amigable y contenidos diseñados por expertos en pedagogía y tecnología, buscamos
          potenciar habilidades fundamentales como la lectoescritura, matemáticas y pensamiento lógico,
          a través de juegos interactivos y seguimiento inteligente.
        </p>
        <p>
          ¡En AprendeKids, aprender es una aventura emocionante todos los días!
        </p>
      </div>
    </motion.section>
  );
};

export default QuienesSomos;

