import { cloneDeep } from 'lodash';

export const SIZE = 4;

export const generateEmptyBoard = () => {
    const board = [];
    for (let row = 0; row < SIZE; row ++) {
        board[row] = [];

        for (let col = 0; col < SIZE; col ++) {
            board[row][col] = 0;
        }
    }

    return board;
}

export const getPosTop = row => (20 + row * 120);

export const getPosLeft = col => (20 + col * 120);

export const getNumberBackgroundColor = number => {
    switch (number) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#9c0";
        case 1024: return "#33b5e5";
        case 2048: return "#09c";
        case 4096: return "#a6c";
        case 8192: return "#93c";
        default: return 'black';
    }
};

export const getNumberColor = number => (number <= 4 ? '#776e65' : 'white');

export const isNoSpace = board => {
    for (let row of board) {
        for (let tile of row) {
            if (tile === 0) return false;
        }
    }
    
    return true;
};

export const generateRandomPositionOnBoard = board => {
    if (isNoSpace(board)) return false;

    let [randx, randy] = [0, 0];
    while (true) {
        randx = parseInt(Math.floor((Math.random() * SIZE)));
        randy = parseInt(Math.floor((Math.random() * SIZE)));

        if (board[randx][randy] === 0) break;
    }

    let value = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = value;

    return true;
};

export const transform = (keyCode, board) => {
    switch(keyCode) {
        case 37: // left
            return moveLeft(board);
        case 38: // up
            return moveUp(board);
        case 39: // right
            return moveRight(board);
        case 40: // down
            return moveDown(board);
        default:
            break;
    }
};

export const noBlockHorizontal = (row, col1, col2, board) => {
    for (let i = col1 + 1; i < col2; i ++)
        if (board[row][i] !== 0)
            return false;

    return true;
};

export const noBlockVertical = (col, row1, row2, board) => {
    for (let i = row1 + 1; i < row2; i ++)
        if (board[i][col] !== 0)
            return false;

    return true;
};

export const canMoveLeft = board => {
    for (let row = 0; row < SIZE; row ++) {
        for (let col = 1; col < SIZE; col ++) {
            const tile = board[row][col];
            const left = board[row][col - 1];

            if (tile !== 0 && (left === 0 || left === tile)) return true;
        }
    }

    return false;
};

export const moveLeft = (board) => {
    if(!canMoveLeft(board)) return null;

    const newBoard = cloneDeep(board);
    const transforms = {};

    for (let row = 0; row < SIZE; row ++) {
        const merged = [];

        for (let col = 1; col < SIZE; col ++) {
            if (newBoard[row][col] !== 0) {
                for (let i = 0; i < col; i ++) {
                    if (newBoard[row][i] === 0 &&
                        noBlockHorizontal(row, i, col, newBoard)) {

                        newBoard[row][i] = newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: i - col, y: 0};

                        break;

                    } else if (newBoard[row][i] === newBoard[row][col] &&
                        noBlockHorizontal(row, i, col, newBoard) &&
                        !merged.includes(i)) {
                                
                        newBoard[row][i] += newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: i - col, y: 0};

                        merged.push(i);

                        break;
                    }
                }
            }
        }
    }
    
    return [newBoard, transforms];
};

export const canMoveRight = board => {
    for (let row = 0; row < SIZE; row ++) {
        for (let col = SIZE - 2; col >= 0; col --) {
            const tile = board[row][col];
            const right = board[row][col + 1];

            if (tile !== 0 && (right === 0 || right === tile)) return true;
        }
    }

    return false;
};

export const moveRight = (board) => {
    if(!canMoveRight(board)) return null;

    const newBoard = cloneDeep(board);
    const transforms = {};

    for (let row = 0; row < SIZE; row ++) {
        const merged = [];

        for (let col = SIZE - 2; col >= 0; col --) {
            if (newBoard[row][col] !== 0) {
                for (let i = SIZE - 1; i > col; i --) {
                    if (newBoard[row][i] === 0 &&
                        noBlockHorizontal(row, col, i, newBoard)) {

                        newBoard[row][i] = newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: i - col, y: 0};

                        break;

                    } else if (newBoard[row][i] === newBoard[row][col] &&
                        noBlockHorizontal(row, col, i, newBoard) &&
                        !merged.includes(i)) {
                                
                        newBoard[row][i] += newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: i - col, y: 0};

                        merged.push(i);

                        break;
                    }
                }
            }
        }
    }
    
    return [newBoard, transforms];
};

export const canMoveUp = board => {
    for (let col = 0; col < SIZE; col ++) {
        for (let row = 1; row < SIZE; row ++) {
            const tile = board[row][col];
            const above = board[row - 1][col];

            if (tile !== 0 && (above === 0 || above === tile)) return true;
        }
    }

    return false;
};

export const moveUp = (board) => {
    if(!canMoveUp(board)) return null;

    const newBoard = cloneDeep(board);
    const transforms = {};

    for (let col = 0; col < SIZE; col ++) {
        const merged = [];

        for (let row = 1; row < SIZE; row ++) {
            if (newBoard[row][col] !== 0) {
                for (let i = 0; i < row; i ++) {
                    if (newBoard[i][col] === 0 &&
                        noBlockVertical(col, i, row, newBoard)) {

                        newBoard[i][col] = newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: 0, y: i - row};

                        break;

                    } else if (newBoard[i][col] === newBoard[row][col] &&
                        noBlockVertical(col, i, row, newBoard) &&
                        !merged.includes(i)) {
                                
                        newBoard[i][col] += newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: 0, y: i - row};

                        merged.push(i);

                        break;
                    }
                }
            }
        }
    }
    
    return [newBoard, transforms];
};

export const canMoveDown = board => {
    for (let col = 0; col < SIZE; col ++) {
        for (let row = SIZE - 2; row >= 0; row --) {
            const tile = board[row][col];
            const under = board[row + 1][col];

            if (tile !== 0 && (under === 0 || under === tile)) return true;
        }
    }

    return false;
};

export const moveDown = (board) => {
    if(!canMoveDown(board)) return null;

    const newBoard = cloneDeep(board);
    const transforms = {};

    for (let col = 0; col < SIZE; col ++) {
        const merged = [];

        for (let row = SIZE - 2; row >= 0; row --) {
            if (newBoard[row][col] !== 0) {
                for (let i = SIZE - 1; i > row; i --) {
                    if (newBoard[i][col] === 0 &&
                        noBlockVertical(col, row, i, newBoard)) {

                        newBoard[i][col] = newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: 0, y: i - row};

                        break;

                    } else if (newBoard[i][col] === newBoard[row][col] &&
                        noBlockVertical(col, row, i, newBoard) &&
                        !merged.includes(i)) {
                                
                        newBoard[i][col] += newBoard[row][col];
                        newBoard[row][col] = 0;
                        transforms[`${row}${col}`] = {x: 0, y: i - row};

                        merged.push(i);

                        break;
                    }
                }
            }
        }
    }
    
    return [newBoard, transforms];
};