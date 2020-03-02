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
    transform: translate(${transformation.x * 120}px, ${transformation.y * 120}px);
  }
`;

const animationMixin = css`
  animation: ${animation};
  animation-duration: 200ms;
`;

const Item = styled.div`
  ${({transformation}) => transformation && animationMixin};
`;

const Cell = ({value, position: {x, y}, transformation, onAnimationEnd}) => {
  return (
    <Item 
      className="number-cell"
      onAnimationEnd={onAnimationEnd}
      transformation={transformation}
      style={
        value === 0 ? {
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
        }
      }
    >{value !== 0 && value}</Item>
  );
};

export default Cell;