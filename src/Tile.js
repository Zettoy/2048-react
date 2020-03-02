import React from 'react';
import {
    getPosTop,
    getPosLeft,
    getNumberBackgroundColor,
    getNumberColor
} from './support';
import styled, { keyframes, css } from 'styled-components';

const animation = ({transformation}) => keyframes`
    from {
        transform: translate(0, 0);
    }
    
    to {
        transform: translate(
            ${transformation.x * 120}px,
            ${transformation.y * 120}px
        );
    }
`;

const animationMixin = css`
    animation: ${animation};
    animation-duration: 200ms;
`;

const Tile = styled.div`
    border-radius: 6px;
    
    font-weight: bold;
    font-size: 60px;
    line-height: 100px;
    text-align: center;

    position: absolute;

    ${({transformation}) => transformation && animationMixin};
`;

export default ({value, position: {x, y}, transformation}) => {
    const style = value === 0 ? {
        width: 0,
        height: 0,
        top: getPosTop(y) + 50,
        left: getPosLeft(x) + 50,
    } : {
        width: '100px',
        height: '100px',
        top: getPosTop(y),
        left: getPosLeft(x),
        backgroundColor: getNumberBackgroundColor(value),
        color: getNumberColor(value),
    };

    return (
        <Tile style={style} transformation={transformation}>
            {value !== 0 && value}
        </Tile>
    );
};