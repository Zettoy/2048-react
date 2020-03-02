import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

import {
  getPosTop,
  getPosLeft,
  generateRandomPositionOnBoard,
  moveLeft,
} from './support';
import Cell from './Cell';

const A = styled.a`
  color: blue;
`;

const App = () => {
  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    const listner = event => handleKeyDown(event);
    window.addEventListener('keydown', listner);
    return () => {
      window.removeEventListener('keydown', listner);
    };
  });

  const [transforms, setTransforms] = useState();
  const [board, setBoard] = useState([]);
  const [boardTemp, setBoardTemp] = useState([]);
  
  const newGame = () => {
    const newBoard = [
      [4, 4, 4, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // generateRandomPositionOnBoard(newBoard);
    // generateRandomPositionOnBoard(newBoard);

    setBoard(newBoard);
  };

  const handleKeyDown = event => {
    switch(event.keyCode) {
      case 37: // left
          const [newBoard, newTransforms] = moveLeft(board);
          if (newBoard) {
            setBoardTemp(newBoard);
            setTransforms(newTransforms);
          }
          break;
      case 38: // right
          break;
      case 39: // up
          break;
      case 40: // down
          break;
      default:
          break;
    }
  };

  const onAnimationEnd = () => {
    if (transforms) {
      setBoard(boardTemp);
      setTransforms();
    }
  };
  
  return (
    <React.Fragment>
      <header>
        <h1>2048</h1>
        <button onClick={newGame} id="new-game-button">New Game</button>
        <p>Score: <span id="score">0</span></p>
      </header>
      <div className="grid-container">
        {board.map((row, keyRow) => (
          row.map((col, keyCol) => (
            <div 
              key={[keyRow, keyCol]}
              className="grid-cell"
              style={{
                top: getPosTop(keyRow),
                left: getPosLeft(keyCol),
              }}/>
          ))
        ))}
        {board.map((row, y) => (
          row.map((col, x) => (
            <Cell 
              key={[x, y]}
              value={col}
              position={{x, y}}
              transformation={transforms?.[`${y}${x}`]}
              onAnimationEnd={onAnimationEnd}/>
          ))
        ))}
      </div>
    </React.Fragment>
  );
};

export default App;
