import React from 'react';
import styled from 'styled-components';

import Tile from './Tile';
import { getPosLeft, getPosTop } from './support';

const Container = styled.div`
    width: 460px;
    height: 460px;
    padding: 20px;

    margin: 50px auto;
    background-color: #bbada0;

    border-radius: 10px;
    position: relative;
`;

const Cell = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 6px;
    background-color: #ccc0b3;

    position: absolute;
`;

const Board = ({board, transforms}) => {
    const generateCells = () => {
        const cells = [];
        for (let y = 0; y < board.length; y ++)
            for (let x = 0; x < board[y].length; x ++)
                cells.push(<Cell key={[x, y]} style={{ top: getPosTop(y), left: getPosLeft(x) }}/>);

        return cells;
    }

    const generateTiles = () => (
        board.map((row, y) => (
            row.map((col, x) => (
                <Tile
                    key={[x, y]}
                    value={col}
                    position={{x, y}}
                    transformation={transforms?.[`${y}${x}`]}/>
            ))
        ))
    );

    return (
        <Container>
            {generateCells()}
            {generateTiles()}
        </Container>
    );
};

export default Board;