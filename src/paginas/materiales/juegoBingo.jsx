// RuletaMatematica.jsx
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Mati from '../../componentes/Mati.png';
import './bingo.css';

const RuletaMatematica = () => {
  const [board, setBoard] = useState([]);
  const [marked, setMarked] = useState(new Set());
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [winner, setWinner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true); // Mostrar instrucciones al inicio

  // Mensajes de motivación
  const mensajesMotivacion = [
    "¡Excelente! ¡Eres un campeón!",
    "¡Así se hace! ¡Sigue así!",
    "¡Eres un genio de las matemáticas!",
    "¡Perfecto! Mati está orgulloso de ti.",
    "¡Muy bien! Cada acierto te acerca al bingo.",
    "¡Qué inteligente! ¡Otra vez bien!",
    "¡Increíble! No paras de acertar.",
    "¡Brillante! Así aprendemos jugando."
  ];

  // Generar cartón 5x5
  const generateBoard = () => {
    const nums = new Set();
    while (nums.size < 25) {
      const num = Math.floor(Math.random() * 81) + 20; // 20 a 100
      nums.add(num);
    }
    const boardArray = Array.from(nums);
    const newBoard = [];
    for (let i = 0; i < 5; i++) {
      newBoard.push(boardArray.slice(i * 5, (i + 1) * 5));
    }
    newBoard[2][2] = 'LIBRE'; // Celda libre en el centro
    setBoard(newBoard);
    setMarked(new Set());
    setWinner(false);
    setShowConfetti(false);
    setMessage('');
  };

  // Generar operación (suma o resta con llevadas)
  const generarOperacion = () => {
    setSpinning(true);
    setTimeout(() => {
      const a = Math.floor(Math.random() * 50) + 20;
      const b = Math.floor(Math.random() * 30) + 10;
      const tipo = Math.random() < 0.5 ? 'suma' : 'resta';

      let op, res;
      if (tipo === 'suma') {
        op = `${a} + ${b}`;
        res = a + b;
      } else {
        const mayor = Math.max(a, b);
        const menor = Math.min(a, b);
        op = `${mayor} - ${menor}`;
        res = mayor - menor;
      }

      setOperation({ op, res });
      setResult('');
      setMessage('');
      setSpinning(false);
    }, 1500);
  };

  // Verificar respuesta
  const verificar = () => {
    const num = parseInt(result, 10);
    if (isNaN(num)) {
      setMessage('⚠️ Escribe un número');
      return;
    }

    if (num === operation.res) {
      const nuevaMarca = new Set(marked);
      if (board.flat().includes(num)) {
        nuevaMarca.add(num);
        setMarked(nuevaMarca);

        // Mensaje aleatorio de motivación
        const mensajeAcierto = mensajesMotivacion[Math.floor(Math.random() * mensajesMotivacion.length)];
        setMessage(`✅ ¡Correcto! ${mensajeAcierto}`);
      } else {
        setMessage(`✅ ¡Correcto! ${mensajesMotivacion[Math.floor(Math.random() * mensajesMotivacion.length)]} Pero ${num} no está en tu cartón.`);
      }

      setResult('');

      // Verificar si ganó
      if (checkWinner(nuevaMarca)) {
        setWinner(true);
        setShowConfetti(true);
        setTimeout(() => {
          alert('🎉 ¡Felicidades! ¡Has ganado el Bingo Matemático!');
          setShowConfetti(false);
        }, 2000);
      }
    } else {
      setMessage(`❌ Incorrecto. El resultado era ${operation.res}. Inténtalo de nuevo.`);
    }
  };

  // Verificar si hay bingo
  const checkWinner = (markedSet) => {
    // Filas
    for (let row of board) {
      if (row.every(cell => cell === 'LIBRE' || markedSet.has(cell))) return true;
    }
    // Columnas
    for (let col = 0; col < 5; col++) {
      if (board.every(row => row[col] === 'LIBRE' || markedSet.has(row[col]))) return true;
    }
    // Diagonales
    const diag1 = [0,1,2,3,4].every(i => {
      const cell = board[i][i];
      return cell === 'LIBRE' || markedSet.has(cell);
    });
    const diag2 = [0,1,2,3,4].every(i => {
      const cell = board[i][4-i];
      return cell === 'LIBRE' || markedSet.has(cell);
    });
    return diag1 || diag2;
  };

  useEffect(() => {
    generateBoard();
  }, []);

  return (
    <div className="ruleta-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <h1>🎡 La Ruleta Matemática de Mati</h1>

      {/* Instrucciones al inicio */}
      {showInstructions ? (
        <div className="instrucciones">
          <h3>📌 ¿Cómo se juega?</h3>
          <p>1. Haz clic en <strong>"Girar Ruleta"</strong> para obtener una operación.</p>
          <p>2. Resuelve la <strong>suma o resta con llevadas</strong>.</p>
          <p>3. Escribe el resultado y haz clic en <strong>Verificar</strong>.</p>
          <p>4. Si es correcto, <strong>marca el número en tu cartón</strong>.</p>
          <p>🎯 Gana quien complete una fila, columna o diagonal.</p>
          <button onClick={() => setShowInstructions(false)} className="btn-instrucciones">
            ¡Entendido! Vamos a jugar 🚀
          </button>
        </div>
      ) : (
        <>
          <div className="mati-area">
            <img src={Mati} alt="Mati el Conejo" className="mati-img" />
            <p>¡Gira la ruleta y resuelve la operación!</p>
          </div>

          <button
            onClick={generarOperacion}
            disabled={spinning}
            className="girar-btn"
          >
            {spinning ? '🎲 Girando...' : '🎡 Girar Ruleta'}
          </button>
       <button
          onClick={() => (window.location.href = "/materiales")}
          
        >
          ◀️ Regresar a Materiales
        </button>

          {operation && (
            <div className="operacion">
              <h3>Operación:</h3>
              <p className="op-text">{operation.op}</p>
              <input
                type="number"
                placeholder="Escribe el resultado"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="input-num"
              />
              <button onClick={verificar} className="btn-verificar">
                ✅ Verificar
              </button>
            </div>
          )}

          {message && (
            <p className={`mensaje ${message.includes('Correcto') ? 'correcto' : 'incorrecto'}`}>
              {message}
            </p>
          )}

          <div className="tablero">
            {board.map((row, i) => (
              <div key={i} className="fila">
                {row.map((cell, j) => (
                  <div
                    key={j}
                    className={`celda ${marked.has(cell) ? 'marcada' : ''} ${cell === 'LIBRE' ? 'libre' : ''}`}
                  >
                    {cell === 'LIBRE' ? '★' : cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RuletaMatematica;