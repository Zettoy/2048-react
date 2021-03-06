import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Board from './Board';
import {
    transform,
    generateEmptyBoard,
    generateRandomPositionOnBoard,
} from './support';

const Header = styled.header`
    display: block;
    margin: 0 auto;
    width: 500px;
    text-align: center;
`;

const H1 = styled.h1`
    font-size: 60px;
    font-weight: bold;
`;

const P = styled.p`
    font-size: 25px;
    margin: 20px auto;
`;

const Button = styled.button`
    display: block;
    margin: 20px auto;

    width: 100px;
    padding: 10px;
    background-color: #8f7a66;
    color: white;

    border-radius: 10px;
    text-decoration: none;

    &:hover { background-color: #9f8b77; }
`;

const App = () => {
    useEffect(() => newGame(), []);

    useEffect(() => {
        const listner = event => handleKeyDown(event);
        window.addEventListener('keydown', listner);
        return () => window.removeEventListener('keydown', listner);
    });

    const [score, setScore] = useState(0);
    const [transforms, setTransforms] = useState();
    const [board, setBoard] = useState([]);

    const newGame = () => {
        const newBoard = generateEmptyBoard();

        generateRandomPositionOnBoard(newBoard);
        generateRandomPositionOnBoard(newBoard);

        setBoard(newBoard);
    };

    const handleKeyDown = event => {
        const [newBoard, newTransforms, newScore] = transform(event.keyCode, board) || [];

        if (newBoard) {
            setTransforms(newTransforms);
            setTimeout(() => {
                generateRandomPositionOnBoard(newBoard);
                setBoard(newBoard);
                setScore(score + newScore);
                setTransforms(null);
            }, 200);
        }
    };
    
    return (
        <React.Fragment>
            <Header>
                <H1>2048</H1>
                <Button onClick={newGame}>New Game</Button>
                <P>Score: {score}</P>
            </Header>
            <Board board={board} transforms={transforms}/>
        </React.Fragment>
    );
};

export default App;