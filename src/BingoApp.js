import React, { useState, useEffect } from 'react';
import './App.css';

const BingoApp2 = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const generateRandomBingoNumbers = () => {
    const shuffledWords = bingoWords.sort(() => Math.random() - 0.5);
    const numberOfRows = 5;
    const numberOfColumns = 5;
    const randomizedBingoNumbers = [];
    for (let i = 0; i < numberOfRows; i++) {
      randomizedBingoNumbers.push(shuffledWords.slice(i * numberOfColumns, (i + 1) * numberOfColumns));
    }
    return randomizedBingoNumbers;
  };

  const bingoWords = [
    'Keshni', 'Anand', 'Sindhur', 'Vows', 'Forever', 'Bhai', 'Bhen', 'Shanti', 'Fera', 'Children', 'Om Shanti',
    'Chokha', 'Agni', 'Photo', 'Phera', 'Chandlo', 'Kanya',
    // Add more words here...
  ];

  const [bingoNumbers, setBingoNumbers] = useState(generateRandomBingoNumbers());

  const handleClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const checkBingo = () => {
    for (let i = 0; i < bingoNumbers.length; i++) {
      let rowCompleted = true;
      for (let j = 0; j < bingoNumbers[i].length; j++) {
        if (!selectedNumbers.includes(bingoNumbers[i][j])) {
          rowCompleted = false;
          break;
        }
      }
      if (rowCompleted) {
        return true;
      }
    }

    for (let i = 0; i < bingoNumbers.length; i++) {
      let columnCompleted = true;
      for (let j = 0; j < bingoNumbers[i].length; j++) {
        if (!selectedNumbers.includes(bingoNumbers[j][i])) {
          columnCompleted = false;
          break;
        }
      }
      if (columnCompleted) {
        return true;
      }
    }

    let diagonalCompleted = true;
    for (let i = 0; i < bingoNumbers.length; i++) {
      if (!selectedNumbers.includes(bingoNumbers[i][i])) {
        diagonalCompleted = false;
        break;
      }
    }
    if (diagonalCompleted) {
      return true;
    }

    diagonalCompleted = true;
    for (let i = 0; i < bingoNumbers.length; i++) {
      if (!selectedNumbers.includes(bingoNumbers[i][bingoNumbers.length - 1 - i])) {
        diagonalCompleted = false;
        break;
      }
    }
    if (diagonalCompleted) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const isBingo = checkBingo();
    if (isBingo) {
      alert('Bingo!');
    }
  }, [selectedNumbers]);

  const renderNumberCell = (number) => {
    const isSelected = selectedNumbers.includes(number);

    return (
      <div
        className={`number-cell ${isSelected ? 'selected' : ''}`}
        onClick={() => handleClick(number)}
      >
        {number}
      </div>
    );
  };

  return (
    
    <div className="bingo-container">
      <div className="bingo-card">
        {bingoNumbers.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((number, columnIndex) => (
              <div className="cell" key={columnIndex}>
                {renderNumberCell(number)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoApp2;
