const gameBoard = (function(){
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;

    const placeMark = (column, row, player) => {
        if (board[row][column].getValue() !== "") {
            console.log("INVALID MOVE!");
            return
        };

        board[row][column].addMark(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    const check3Inline = (player) => {
        let column = [0, 0, 0];
        let row = [0, 0, 0];
        let diagonalA = [0];
        let diagonalB = [0];
        let draw = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j].getValue() === player) row[i]++;
                if (row[i] === 3) return 5;
                if (board[j][i].getValue() === player) column[i]++;
                if (column[i] === 3) return 5;
                if (i === 0) {
                    if (board[j][j].getValue() === player)  diagonalA[i]++;
                    if (board[2-j][j].getValue() === player) diagonalB[i]++;
                    if (diagonalA[i] === 3 || diagonalB[i] === 3) return 5;
                };
                if (board[i][j].getValue() === 'X' || board[i][j].getValue() === 'O' ) draw++;
            };
        };
        if (draw === 9) return 2;
    };

    return {getBoard, placeMark, printBoard, check3Inline}
})();

function Cell (){
    let value = "";

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMark, getValue}
}

const Game = (function (playerOneName = 'player one', playerTwoName = 'player two'){

    const players = [
        {
            name: playerOneName,
            mark: "X",
        },
        {
            name:playerTwoName,
            mark: "O",
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (row, column) => {
        console.log(`placing ${getActivePlayer().name}'s mark at row ${row} column ${column}...`);

        gameBoard.placeMark(column, row, getActivePlayer().mark);

        switch (gameBoard.check3Inline(getActivePlayer().mark)) {
            case 5:
                console.log(`${getActivePlayer().name} WINS!!!!!!!!!`);
                gameBoard.printBoard();
                return;
            case 2:
                console.log(`ITS A DRAW!!!!!!!`);
                gameBoard.printBoard();
                return;
        } 

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {playRound, getActivePlayer};
})();

function Player (){
    
    return {};
};

const displayController = (function(){

    return {};
})();