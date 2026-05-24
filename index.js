const GameBoard = document.querySelector("gameboard");

function gameBoard() {
    const rows = 3;
    const col = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < col; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    return {getBoard};
}

const Game = (() => { //IIFE function
    let players = []
    let currentPlayerIndex = 0;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        gameOver = false;
        
    }
    return {start};
})();

function Cell() { //0 for empty, X for player one, O for player 2
    let value = 0;
    const setValue = (marker) => {
        value = marker;
    }

    const getValue = () => {value};
    return {setValue, getValue};
}

const createPlayer = (name, mark) => { //Player factory
    return {name, mark}
}

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})