import React from 'react';
import { motion } from 'framer-motion';
import './Mision.css';

const Mission = () => {
  return (
    <motion.div
      className="mission"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
         Misión
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        En AprendeKids, nuestra misión es ofrecer un entorno educativo personalizado e innovador que potencie el desarrollo académico de los niños, utilizando inteligencia artificial para adaptarnos a sus necesidades y habilidades individuales, y hacer del aprendizaje una experiencia divertida y significativa.
      </motion.p>
    </motion.div>
  );
};

export default Mission;

