function createPlayer(symbol){
    let wins = 0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return {symbol, getWins, addWin};
}

const gameboard = function(){
    const board = [null, null, null, null, null, null, null, null, null];
    const move = (tileValue, symbol) =>  board[tileValue] = symbol;
    const resetBoard = () => {
        for (let i = 0; i < 9; i++){
            board[i] = null;
        }
    };
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

    const draw = () => {
        for (let  i = 0; i < 9; i++){
            if (gameboard.board[i] == null ){
                return false;
            }
        }
        return true;
    }
    const checkAll = () => {
        let wins = 
            horizontal() +
            vertical() +
            majorDiagnol() +
            minorDiagnol() +
            draw();
        return wins > 0;
    };
    return {checkAll};
}();



const gameController = function() {
    const tiles = document.querySelectorAll(".tile");
    let moveCount = 0;
    const player1 = createPlayer("X");
    const player2 = createPlayer("O");
    const player1Score = document.querySelector(".player1Score");
    const player2Score = document.querySelector(".player2Score");
    const x = document.querySelector(".x").cloneNode(true);
    const o = document.querySelector(".o").cloneNode(true);
    x.style.display = "block";
    o.style.display = "block";

    const gameOver = () =>{
        if (checkWin.checkAll()){
            if (moveCount % 2 == 0){
                player2.addWin();
                player1Score.textContent = `${player1.wins}`;
            }
            else{
                player1.addWin();
            }
            resetBoard();
            if (moveCount % 8){
                resetBoard();
            }
            updateScore();
        }
        if (player1.getWins() == 3 || player2.getWins() == 3){
            alert("meow");
        }  
    }

    const updateScore = () => {
        player1Score.textContent = `${player1.getWins()}`;
        player2Score.textContent = `${player2.getWins()}`;
    }

    const resetBoard = () => {
        tiles.forEach((tile) => {
            tile.textContent = "";
        });
        gameboard.resetBoard();
    }

    const playerMoves = () =>{
        tiles.forEach((tile) => {
            tile.addEventListener("mousedown", () => { 
                if (gameboard.board[tile.id] == null){
                    if (moveCount % 2 == 0){
                        tile.appendChild(x.cloneNode(true));
                        gameboard.move(tile.id, player1.symbol);
                    }
                    else{
                        tile.appendChild(o.cloneNode(true));
                        gameboard.move(tile.id, player2.symbol);
                    }
                    console.log(gameboard.board);
                    console.log(moveCount);
                    moveCount++;
                    gameOver();
                }
            });
        });
    }

    return {playerMoves, resetBoard};
}();

gameController.playerMoves();



