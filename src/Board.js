import React from 'react';
import styled from 'styled-components';

import Tile from './Tile';
import { getPosLeft, getPosTop, SIZE } from './support';

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
        for (let row = 0; row < SIZE; row ++)
            for (let col = 0; col < SIZE; col ++)
                cells.push(
                    <Cell
                        key={[row, col]}
                        style={{
                            top: getPosTop(row),
                            left: getPosLeft(col)
                        }}
                    />
                );

        return cells;
    }

    const generateTiles = () => (
        board.map((rowOfTiles, row) => (
            rowOfTiles.map((tile, col) => (
                <Tile
                    key={[row, col]}
                    value={tile}
                    position={{row, col}}
                    transformation={transforms?.[`${row}${col}`]}
                />
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