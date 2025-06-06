import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import BurbujaChat from './BurbujaChat';
import './Chatgpt.css';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [voces, setVoces] = useState([]);

  // Cargar voces disponibles al inicio
  useEffect(() => {
    const cargarVoces = () => {
      const vocesDisponibles = window.speechSynthesis.getVoices();
      setVoces(vocesDisponibles);
    };

    cargarVoces();
    // Algunos navegadores cargan las voces asincrónicamente
    window.speechSynthesis.onvoiceschanged = cargarVoces;
  }, []);

  const palabrasClave = [
    'matemática', 'matemáticas', 'calcular', 'resolver',
    'ecuación', 'álgebra', 'geometría', 'trigonometría',
    'cálculo', 'estadística', 'probabilidad', 'derivada',
    'integral', 'matriz', 'función', 'teorema', 'fórmula',
    'gráfico', 'gráfica', 'número', 'ángulo', 'área',
    'volumen', 'porcentaje', 'fracción', 'raíz', 'cuadrado',
    'cubo', 'logaritmo', 'exponente', 'variable', 'polinomio',
    'cuadrático', 'lineal', 'triángulo', 'círculo', 'esfera',
    'pitágoras', 'primo', 'factor', 'suma', 'producto',
    'resta', 'división', 'cociente', 'residuo', 'dividir',
    'multiplicar', 'sumar', 'restar', 'más', 'menos', 'por',
    'pi', 'sen', 'cos', 'tan', 'log', 'ln', 'sumo','resto','multiplico', 'divido'
  ];

  const hablarTexto = (texto) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(texto);

    // Buscar una voz infantil o femenina en español
    const vozNiño = voces.find(voz =>
      (voz.lang.startsWith('es') &&
        (voz.name.toLowerCase().includes('child') ||
         voz.name.toLowerCase().includes('niño') ||
         voz.name.toLowerCase().includes('male') ||
         voz.name.toLowerCase().includes('young')))
    ) || voces.find(voz => voz.lang.startsWith('es')) || voces[0];

    if (vozNiño) {
      utterance.voice = vozNiño;
    }

    utterance.rate = 0.9;   // velocidad un poco más lenta
    utterance.pitch = 1.3;  // tono más agudo para voz infantil

    window.speechSynthesis.speak(utterance);
  };

  const enviarMensaje = async () => {
    if (!input) {
      setRespuesta('Por favor ingresa una pregunta.');
      return;
    }

    const esPreguntaMatematica = palabrasClave.some(palabra =>
      input.toLowerCase().includes(palabra)) ||
      /\d+[\+\-\*\/\^]\d+/.test(input);

    if (!esPreguntaMatematica) {
      setRespuesta('<p class="advertencia">Por favor haz una pregunta sobre matemáticas. Este chatbot solo responde preguntas matemáticas.</p>');
      return;
    }

    setCargando(true);
    setRespuesta('Resolviendo tu problema matemático...');

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer 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',
            'HTTP-Referer': 'https://www.sitename.com',
            'X-Title': 'SiteName',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
            messages: [{
              role: 'system',
              content: 'Eres un asistente experto en matemáticas. Solo responde preguntas relacionadas con matemáticas. Si te preguntan sobre otros temas, responde que solo puedes ayudar con preguntas matemáticas.'
            }, {
              role: 'user',
              content: input
            }],
          }),
        }
      );

      const data = await response.json();
      const textoMarkdown = data.choices?.[0]?.message?.content || 'No se recibió respuesta.';
      setRespuesta(marked(textoMarkdown));

      // Leer en voz alta texto plano sin markdown
      hablarTexto(textoMarkdown.replace(/[#_*`]/g, ''));

    } catch (error) {
      setRespuesta('Error: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container-mt-5">
      <h2>¡Hola! Soy <span className="nombre-mati">Mati</span>, tu ayudante matemático 🐰✨</h2>
      <p className="text-muted">
        ¡Pregúntame cualquier cosa sobre matemáticas y juntos lo resolveremos! 📚💡
      </p>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa tu pregunta matemática"
          disabled={cargando}
        />
      </div>

      <button
        className="btn btn-success mt-2"
        onClick={enviarMensaje}
        disabled={cargando}
      >
        {cargando ? 'Procesando...' : 'Preguntar'}
      </button>

      {respuesta && (
        <div className="mt-3">
          <BurbujaChat mensaje={respuesta} />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
