import React, { useState } from 'react';
import {marked} from 'marked';


const ChatBot = () => {
  const [input, setInput] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);

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

  const enviarMensaje = async () => {
    if (!input) {
      setRespuesta('Por favor ingresa una pregunta.');
      return;
    }

    // Verificar si la pregunta es de matemáticas
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
    } catch (error) {
      setRespuesta('Error: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>ChatBot de Matemáticas</h2>
      <p className="text-muted">Solo responde preguntas relacionadas con matemáticas</p>
      
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
      
      <div 
        id="response"
        className="mt-3 p-3 border rounded"
        dangerouslySetInnerHTML={{ __html: respuesta }}
      />
    </div>
  );
};

export default ChatBot;