function createPlayer(symbol){
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return {symbol, getWins, addWin};
}

const gameboard = function(){
    const board = [null, null, null, null, null, null, null, null, null];
    const move = (tileValue, symbol) =>  board[tileValue] = symbol;
    const resetBoard = () => board = [null, null, null, null, null, null, null, null, null];
    return {board, move, resetBoard};
}();

const checkWin = function (){
    const horizontal = function() {
        //each row increments by 3
        for (let row = 0; row < 9; row+=3){
            let symbolCounter = 0;
            let firstSymbol = gameboard.board[row];
            for (let tile = 0; tile < 3; tile++){
                if (gameboard.board[tile + row] == null){
                    continue;
                }
                if (gameboard.board[tile + row] == firstSymbol){
                    symbolCounter++;
                }
            }
            if (symbolCounter == 3){
                return true;
            }
        }
        return false;
    };
    const vertical = () => {
        //each column incerements by 1
        for (let column = 0; column < 3; column++){
            let symbolCounter = 0;
            let firstSymbol = gameboard.board[column];
            for (let tile = 0; tile < 9; tile+=3){
                if (gameboard.board[tile + column] == null){
                    continue;
                }
                if (gameboard.board[tile + column] == firstSymbol){
                    symbolCounter++;
                }
            }
            if (symbolCounter == 3){
                return true;
            }
        }
        return false;
    };
    const majorDiagnol = () => {
        let first = gameboard.board[0];
        let second = gameboard.board[4];
        let third = gameboard.board[8];
        return first != null && (first == second && first == third);
    };
    const minorDiagnol = () => {
        let first = gameboard.board[2];
        let second = gameboard.board[4];
        let third = gameboard.board[6];
        return first != null && (first == second && first == third);
    };
    const checkAll = () => {
        let wins = 
            horizontal() +
            vertical() +
            majorDiagnol() +
            minorDiagnol();
        return wins > 0;
    };
    return {checkAll};
}();



const gameController = function() {
    const tiles = document.querySelectorAll(".tile");
    let moveCount = 0;

    const gameOver = () =>{
        if (checkWin.checkAll()){
            resetBoard();
        }
    }

    const resetBoard = () => {
        tiles.forEach((tile) => {
            tile.textContent = "";
        });
    }

    const playerMoves = () =>{
        tiles.forEach((tile) => {
            tile.addEventListener("mousedown" , function move(){ 
                if (moveCount % 2 == 0){
                    tile.textContent = "X";
                    gameboard.move(tile.id, "X");
                }
                else{
                    tile.textContent = "O";
                    gameboard.move(tile.id, "O");
                }
                moveCount++;
                tile.removeEventListener("mousedown", move);
                gameOver();
            });
        });
    }

    return {playerMoves, resetBoard};
}();



console.log(gameboard.board)
console.log(checkWin.checkAll());
gameController.playerMoves();




