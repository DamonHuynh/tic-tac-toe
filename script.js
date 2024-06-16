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
            else{
                return false;
            }
        }
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
            else{
                return false;
            }
        }
    };
    const majorDiagnol = () => {

    };
    const minorDiagnol = () => {

    };
    return {horizontal, vertical, majorDiagnol, minorDiagnol};

}();

gameboard.move(1, "X");
gameboard.move(4, "X");
gameboard.move(7, "X");
console.log(gameboard.board)
console.log(checkWin.vertical());




