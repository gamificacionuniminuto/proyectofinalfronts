import React, { useEffect } from 'react';
import './BurbujaChat.css';
import mati from '../componentes/Mati.png'; // Ruta de la imagen (ajústala si es diferente)

const BurbujaChat = ({ mensaje }) => {
  useEffect(() => {
    const utter = new SpeechSynthesisUtterance(mensaje.replace(/<[^>]*>?/gm, ''));
    utter.lang = 'es-ES';
    utter.rate = 1;
    speechSynthesis.speak(utter);
  }, [mensaje]);

  return (
    <div className="burbuja-contenedor">
      <img src={mati} alt="Mati el Conejo" className="imagen-mati" />
      <div
        className="burbuja-chat"
        dangerouslySetInnerHTML={{ __html: mensaje }}
      />
    </div>
  );
};

export default BurbujaChat;

