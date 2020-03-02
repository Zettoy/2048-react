import { cloneDeep } from 'lodash';

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
        for (let col of row) {
            if (col === 0) return false;
        }
    }
    
    return true;
};

export const generateRandomPositionOnBoard = board => {
    if (isNoSpace(board)) return false;

    let [randx, randy] = [0, 0];
    while (true) {
        randx = parseInt(Math.floor((Math.random() * 4)));
        randy = parseInt(Math.floor((Math.random() * 4)));

        if (board[randx][randy] === 0) break;
    }

    let number = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = number;

    return true;
};

export const handleKeyDown = (keyCode, board) => {
    switch(keyCode) {
        case 37: // left
            return moveLeft(board);
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

export const noBlockHorizontal = (row, col1, col2, board) => {
    for (let i = col1 + 1; i < col2; i ++)
        if (board[row][i] !== 0)
            return false;

    return true;
};

export const canMoveLeft = board => {
    for (let row = 0; row < 4; row ++)
        for (let col = 1; col < 4; col ++)
            if (board[row][col] !== 0)
                if (board[row][col - 1] === 0 || board[row][col - 1] === board[row][col])
                    return true;

    return false;
};

export const moveLeft = (board) => {
    if(!canMoveLeft(board)) return null;

    const newBoard = cloneDeep(board);
    const transforms = {};

    for (let row = 0; row < 4; row ++) {
        for (let col = 1; col < 4; col ++) {
            if (newBoard[row][col] !== 0) {
                for (let i = 0; i < col; i ++) {
                    if (newBoard[row][i] === 0 && noBlockHorizontal(row, i, col, newBoard)) {
                        newBoard[row][i] = newBoard[row][col];
                        newBoard[row][col] = 0;

                        transforms[`${row}${col}`] = {x: i - col, y: 0};
                        break;

                    } else if (newBoard[row][i] === newBoard[row][col] && noBlockHorizontal(row, i, col, newBoard)) {
                        newBoard[row][i] += newBoard[row][col];
                        newBoard[row][col] = 0;

                        transforms[`${row}${col}`] = {x: i - col, y: 0};
                        break;
                    }
                }
            }
        }
    }
    
    return [newBoard, transforms];
};