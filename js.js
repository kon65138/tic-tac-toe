const gameBoard = (function(){
    let board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell());
        };
    };

    const resetBoard = () => {
        board = [];
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(Cell());
            };
        };
    }

    const getBoard = () => board;

    const placeMark = (column, row, player) => {
        if (board[row][column].getValue() !== "") {
            console.log("INVALID MOVE!");
            return 'invalid';
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
                if (row[i] === 3) return 'win';
                if (board[j][i].getValue() === player) column[i]++;
                if (column[i] === 3) return 'win';
                if (i === 0) {
                    if (board[j][j].getValue() === player)  diagonalA[i]++;
                    if (board[2-j][j].getValue() === player) diagonalB[i]++;
                    if (diagonalA[i] === 3 || diagonalB[i] === 3) return 'win';
                };
                if (board[i][j].getValue() === 'X' || board[i][j].getValue() === 'O' ) draw++;
            };
        };
        if (draw === 9) return 'draw';
    };

    return {getBoard, placeMark, printBoard, check3Inline, resetBoard}
})();

function Cell (){
    let value = "";

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addMark, getValue}
}

const Game = (function (){
    

    let players = [
        {
            name: "X",
            mark: "X",
            active: true,
        },
        {
            name: "O",
            mark: "O",
            active: false,
        }
    ];

    const addPlayers = (playerOneName, playerTwoName) => {
        if (playerOneName === '' || playerOneName == undefined) {
            playerOneName = "X";
        };
        if (playerTwoName === '' || playerTwoName == undefined) {
            playerTwoName = "O";
        };
        players[0].name = playerOneName;
        players[1].name = playerTwoName;
    }

    

    const switchPlayerTurn = () => {
        if (players[0].active === true) {
            players[0].active = false;
            players[1].active = true;
        } else {
            players[1].active = false;
            players[0].active = true;
        }
    };

    const getActivePlayer = () => {
        if (players[0].active === true) {
            return players[0];
        } else {
            return players[1];
        };
    };

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    };

    const playRound = (row, column) => {
        console.log(`placing ${getActivePlayer().name}'s mark at row ${row} column ${column}...`);

        if (gameBoard.placeMark(column, row, getActivePlayer().mark) === 'invalid') return

        switch (gameBoard.check3Inline(getActivePlayer().mark)) {
            case 'win':
                console.log(`${getActivePlayer().name} WINS!!!!!!!!!`);
                gameBoard.printBoard();
                return 'win'
            case 'draw':
                console.log(`ITS A DRAW!!!!!!!`);
                gameBoard.printBoard();
                return 'draw'
        } 
        switchPlayerTurn();
        printNewRound();
    };

    const resetGame = () => {
        if (getActivePlayer().mark === "O") switchPlayerTurn();
        printNewRound();

    }

    printNewRound();

    return {playRound, getActivePlayer, resetGame, addPlayers};
})();

function Player (){
    
    return {};
};

const displayController = (function(){
    const boardDiv = document.querySelector(".board");
    const turnDiv = document.querySelector(".whosTurn");
    const resetButton = document.querySelector("#reset");
    const Xs_name = document.querySelector("#Xs_name");
    const Os_name = document.querySelector("#Os_name");

    const playerOneName = () => Xs_name.value;
    const playerTwoName = () => Os_name.value;

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = gameBoard.getBoard();

        turnDiv.textContent = `${Game.getActivePlayer().name}'s turn...`;

        for (let i = 0; i < 3; i++) {
            
            for (let j = 0; j < 3; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.column = j;
                cellButton.dataset.row = i;
                cellButton.textContent = board[i][j].getValue();
                boardDiv.appendChild(cellButton);
            };
        };
    };

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column; 
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn || !selectedRow) return;

        switch (Game.playRound(selectedRow, selectedColumn)) {
            case 'win':
                updateScreen();
                turnDiv.textContent = `${Game.getActivePlayer().name} WINS!!!!!!!!!`;
                setTimeout(() => {clickHandlerResetButton()}, 3000);
                break
            case 'draw':
                updateScreen();
                turnDiv.textContent = `ITS A DRAW!!!!!!!`;
                setTimeout(() => {clickHandlerResetButton()}, 3000);
                break
            default:
                updateScreen();
                break
        }
    }

    function clickHandlerResetButton(e) {
        gameBoard.resetBoard();
        Game.addPlayers(playerOneName(), playerTwoName());
        Game.resetGame();
        updateScreen();
    }
    Xs_name.addEventListener("keyup", () => {
        Game.addPlayers(playerOneName(), playerTwoName())
        turnDiv.textContent = `${Game.getActivePlayer().name}'s turn...`;
    });
    Os_name.addEventListener("keyup", () => {
        Game.addPlayers(playerOneName(), playerTwoName());
        turnDiv.textContent = `${Game.getActivePlayer().name}'s turn...`;
    });
    boardDiv.addEventListener("click", clickHandlerBoard);
    resetButton.addEventListener("click", clickHandlerResetButton);

    updateScreen();
})();