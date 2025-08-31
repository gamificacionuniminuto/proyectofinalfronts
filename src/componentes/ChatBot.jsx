import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [mensaje, setMensaje] = useState('');
  const [conversacion, setConversacion] = useState([]);

  const enviarMensaje = async () => {
    if (mensaje.trim() === '') return;

    const nuevoMensaje = { role: 'user', content: mensaje };
    const nuevaConversacion = [...conversacion, nuevoMensaje];
    setConversacion(nuevaConversacion);
    setMensaje('');

    try {
      const respuesta = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: nuevaConversacion,
        },
        {
          headers: {
            Authorization: `Bearer TU_API_KEY_AQUI`, // Reemplázala
            'Content-Type': 'application/json',
          },
        }
      );

      const respuestaIA = respuesta.data.choices[0].message;
      setConversacion([...nuevaConversacion, respuestaIA]);
    } catch (error) {
      console.error('Error al obtener respuesta de IA', error);
    }
  };

  return (
    <div className="chat-bot">
      <h3>🤖 Tutor Virtual</h3>
      <div className="chat-mensajes">
        {conversacion.map((msg, index) => (
          <div key={index} className={`mensaje ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'Tú' : 'Tutor'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe tu pregunta..."
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
};

export default ChatBot;
