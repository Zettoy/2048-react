import React from 'react';
import {
    getPosTop,
    getPosLeft,
    getNumberBackgroundColor,
    getNumberColor
} from './support';
import styled from 'styled-components';

const Tile = styled.div`
    border-radius: 6px;
    
    font-weight: bold;
    line-height: 100px;
    text-align: center;

    position: absolute;

    ${({transformation}) => transformation && `transition: transform 200ms`};
`;

export default ({value, position: {row, col}, transformation}) => {
    const x = transformation?.x * 120 || 0;
    const y = transformation?.y * 120 || 0;

    let fontSize = '60px';
    if (value > 100) fontSize = '42px';
    if (value > 1000) fontSize = '36px';

    const style = {
        width: value === 0 ? 0 : '100px',
        height: value === 0 ? 0 : '100px',
        fontSize: fontSize,
        left: getPosLeft(col),
        top: getPosTop(row),
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: getNumberBackgroundColor(value),
        color: getNumberColor(value),
    };

    return (
        <Tile style={style} transformation={transformation}>
            {value !== 0 && value}
        </Tile>
    );
};