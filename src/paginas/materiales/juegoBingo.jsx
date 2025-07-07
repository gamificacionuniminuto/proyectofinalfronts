import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Mati from '../../componentes/Mati.png'; // Usa tu imagen de Mati
import './bingo.css';

const Bingo = () => {
  const [numbers, setNumbers] = useState([]);
  const [calledNumber, setCalledNumber] = useState(null);
  const [markedNumbers, setMarkedNumbers] = useState([]);
  const [winner, setWinner] = useState(false);
  const [level, setLevel] = useState(0);
  const [usedResults, setUsedResults] = useState([]);

  const levels = [
    { type: 'sum', range: [1, 5] },
    { type: 'sum', range: [1, 10] },
    { type: 'sub', range: [1, 5] },
    { type: 'sub', range: [1, 10] },
    { type: 'sum', range: [10, 20] },
    { type: 'sub', range: [10, 20] },
    { type: 'mix', range: [1, 20] },
    { type: 'mix', range: [20, 50] },
  ];

  useEffect(() => {
    generateBoard();
    setUsedResults([]);
  }, [level]);

  const generatePossibleResults = () => {
    const current = levels[level];
    const min = current.range[0];
    const max = current.range[1];
    let results = new Set();

    for (let a = min; a <= max; a++) {
      for (let b = min; b <= max; b++) {
        let res;
        if (current.type === 'sum') {
          res = a + b;
        } else if (current.type === 'sub') {
          res = Math.abs(a - b);
        } else if (current.type === 'mix') {
          res = Math.random() < 0.5 ? a + b : Math.abs(a - b);
        }
        if (res >= 0) results.add(res);
      }
    }

    return Array.from(results);
  };

  const generateBoard = () => {
    const possibleResults = generatePossibleResults();

    if (possibleResults.length < 25) {
      alert('No hay suficientes resultados únicos para llenar el tablero en este nivel.');
      setNumbers(possibleResults.concat(Array(25 - possibleResults.length).fill('-')));
      return;
    }

    const shuffled = possibleResults.sort(() => Math.random() - 0.5).slice(0, 25);
    setNumbers(shuffled);
    setMarkedNumbers([]);
    setWinner(false);
    setCalledNumber(null);
  };

  const generateOperation = () => {
    const current = levels[level];
    const min = current.range[0];
    const max = current.range[1];

    let tries = 0;
    while (tries < 1000) {
      let a = Math.floor(Math.random() * (max - min + 1)) + min;
      let b = Math.floor(Math.random() * (max - min + 1)) + min;

      let operation = '';
      let result = 0;

      if (current.type === 'sum') {
        result = a + b;
        operation = `${a} + ${b}`;
      } else if (current.type === 'sub') {
        if (b > a) [a, b] = [b, a];
        result = a - b;
        operation = `${a} - ${b}`;
      } else if (current.type === 'mix') {
        if (Math.random() < 0.5) {
          result = a + b;
          operation = `${a} + ${b}`;
        } else {
          if (b > a) [a, b] = [b, a];
          result = a - b;
          operation = `${a} - ${b}`;
        }
      }

      if (!usedResults.includes(result) && numbers.includes(result)) {
        setUsedResults(prev => [...prev, result]);
        return { operation, result };
      }

      tries++;
    }

    return null;
  };

  const launchNumber = () => {
    const op = generateOperation();
    if (op) {
      setCalledNumber(op);
    } else {
      alert('¡Completaste todas las operaciones posibles en este nivel!');
      setWinner(true);
    }
  };

  const handleSelect = (num) => {
    if (!calledNumber) return;

    if (num === calledNumber.result) {
      const updatedMarked = [...markedNumbers, num];
      setMarkedNumbers(updatedMarked);
      setCalledNumber(null);

      if (checkWinner(updatedMarked)) {
        setWinner(true);
        setTimeout(() => {
          if (level < levels.length - 1) {
            alert('¡Subiste de nivel! 🎉');
            setLevel(level + 1);
          } else {
            alert('¡Completaste todos los niveles! 🎉');
          }
        }, 300);
      }
    } else {
      alert('Respuesta incorrecta. Intenta de nuevo.');
    }
  };

  const checkWinner = (marked) => {
    const size = 5;
    const board = Array(size).fill(null).map((_, i) =>
      numbers.slice(i * size, (i + 1) * size)
    );

    // Revisar filas
    for (let row of board) {
      if (row.every(n => marked.includes(n))) return true;
    }

    // Revisar columnas
    for (let col = 0; col < size; col++) {
      let column = board.map(row => row[col]);
      if (column.every(n => marked.includes(n))) return true;
    }

    // Revisar diagonales
    let diag1 = board.map((row, i) => row[i]);
    let diag2 = board.map((row, i) => row[size - 1 - i]);
    if (diag1.every(n => marked.includes(n))) return true;
    if (diag2.every(n => marked.includes(n))) return true;

    return false;
  };

  return (
    <div className="bingo-container">
      {winner && <Confetti recycle={false} numberOfPieces={300} />}

      <h1>🐰 Bingo de Mati</h1>
      <h2>Nivel: {level + 1}</h2>

      <div className="mati-launcher">
        <img src={Mati} alt="Mati el Conejo" className="mati-img" />
        <button className="launch-btn" onClick={launchNumber}>¡Mati lanza una operación!</button>
        {calledNumber && <div className="called-number">🎯 {calledNumber.operation}</div>}
      </div>

      <div className="bingo-board">
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`bingo-cell ${markedNumbers.includes(num) ? 'marked' : ''}`}
            onClick={() => handleSelect(num)}
          >
            {num}
          </div>
        ))}
      </div>

      {winner && (
        <div className="winner-message">
          🎉 ¡Bingo! ¡Mati está orgulloso de ti!
        </div>
      )}
    </div>
  );
};

export default Bingo;
