import React, { useState, useEffect } from "react";
import "./App.css";

const BingoApp = () => {
  const bingoWords = [
    "Darshil", "Rajvi", "Sindoor", "Forever", "Bhai",
    "Bhen", "Om Shanti", "Mangalsutra", "Children", "Swaha",
    "Mangal", "Ganesh", "daan", "Moksh", "Hari Om",
    "Chokha", "Havan", "Fera", "Chandlo", "Kanya",
    "Love", "Ashirvad", "Family", "Celebrate", "Bhavaḥ",
    "Namaha", "Bhakti", "Payami", "Ropam", "Mandavo",
    "Bhagavan", "Gantha", "Ganthum", "Om", "Shakti"
  ];

  const generateRandomBingoNumbers = () => {
    const shuffledWords = [...bingoWords].sort(() => Math.random() - 0.5);

    const board = [];
    for (let i = 0; i < 5; i++) {
      board.push(shuffledWords.slice(i * 5, (i + 1) * 5));
    }
    return board;
  };

  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [bingoNumbers, setBingoNumbers] = useState([]);

  // Load saved game
  useEffect(() => {
    const savedPlayer = localStorage.getItem("playerName");

    if (savedPlayer) {
      setPlayerName(savedPlayer);

      const savedBoard = JSON.parse(
        localStorage.getItem(`bingoBoard_${savedPlayer}`)
      );

      const savedSelections = JSON.parse(
        localStorage.getItem(`selectedNumbers_${savedPlayer}`)
      );

      if (savedBoard) {
        setBingoNumbers(savedBoard);
      }

      if (savedSelections) {
        setSelectedNumbers(savedSelections);
      }

      setGameStarted(true);
    }
  }, []);

  // Save board
  useEffect(() => {
    if (playerName && bingoNumbers.length > 0) {
      localStorage.setItem(
        `bingoBoard_${playerName}`,
        JSON.stringify(bingoNumbers)
      );
    }
  }, [bingoNumbers, playerName]);

  // Save selections
  useEffect(() => {
    if (playerName) {
      localStorage.setItem(
        `selectedNumbers_${playerName}`,
        JSON.stringify(selectedNumbers)
      );
    }
  }, [selectedNumbers, playerName]);

  const createNewGame = () => {
    const name = prompt("Enter your name");

    if (!name) return;

    const board = generateRandomBingoNumbers();

    setPlayerName(name);
    setBingoNumbers(board);
    setSelectedNumbers([]);
    setGameStarted(true);

    localStorage.setItem("playerName", name);
    localStorage.setItem(
      `bingoBoard_${name}`,
      JSON.stringify(board)
    );
    localStorage.setItem(
      `selectedNumbers_${name}`,
      JSON.stringify([])
    );
  };

  const handleClick = (word) => {
    if (selectedNumbers.includes(word)) {
      setSelectedNumbers(
        selectedNumbers.filter((item) => item !== word)
      );
    } else {
      setSelectedNumbers([...selectedNumbers, word]);
    }
  };

  const checkBingo = () => {
    for (let i = 0; i < 5; i++) {
      if (
        bingoNumbers[i] &&
        bingoNumbers[i].every((word) => selectedNumbers.includes(word))
      ) {
        return true;
      }
    }

    for (let col = 0; col < 5; col++) {
      let complete = true;

      for (let row = 0; row < 5; row++) {
        if (!selectedNumbers.includes(bingoNumbers[row][col])) {
          complete = false;
          break;
        }
      }

      if (complete) return true;
    }

    let diagonal = true;

    for (let i = 0; i < 5; i++) {
      if (!selectedNumbers.includes(bingoNumbers[i][i])) {
        diagonal = false;
        break;
      }
    }

    if (diagonal) return true;

    diagonal = true;

    for (let i = 0; i < 5; i++) {
      if (!selectedNumbers.includes(bingoNumbers[i][4 - i])) {
        diagonal = false;
        break;
      }
    }

    return diagonal;
  };

  useEffect(() => {
    if (gameStarted && checkBingo()) {
      alert("🎉 BINGO!");
    }
  }, [selectedNumbers]);

  const renderNumberCell = (word) => (
    <div
      className={`number-cell ${
        selectedNumbers.includes(word) ? "selected" : ""
      }`}
      onClick={() => handleClick(word)}
    >
      {word}
    </div>
  );

  if (!gameStarted) {
    return (
      <div className="bingo-container">
        <h1 className="bingo-title">Maharaj Bingo</h1>

        <button
          className="new-game-button"
          onClick={createNewGame}
        >
          Create New Game
        </button>
      </div>
    );
  }

  return (
    <div className="bingo-container">
      <h1 className="bingo-title">Maharaj Bingo</h1>

      <h3>Welcome, {playerName}</h3>

      <button
        className="new-game-button"
        onClick={createNewGame}
      >
        New Game
      </button>

      <div className="bingo-card">
        {bingoNumbers.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((word, columnIndex) => (
              <div className="cell" key={columnIndex}>
                {renderNumberCell(word)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoApp;
