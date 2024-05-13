const gameBoard = (function(){
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push("1");
        };
    };

    const getBoard = () => board;

    const placeMark = (column, row, playerSelected) => {
        if (!board[row][column].getValue() === 0) return;


    };

    return {getBoard, board};
})();

function game (){

    return {};
};

function player (){
    
    return {};
};

const displayController = (function(){

    return {};
})();