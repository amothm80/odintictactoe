/*

user function: 
    name
    score

game function:
    add users
    initialize game board
    operate game board
    get winner

game board function:
    initialize board array
    get users
    gameloop:
        whos turn is it
        input in a location
            collision check
        win condition check
    return winner
    
    

*/
function createPlayer(name){
    let score = 0;
    const getName = () => name;
    const getScore = () => score;
    const increaseScore = () => ++score;
    const resetScore = () => score = 0;
    return {getName,getScore,increaseScore,resetScore}
}

// function gameBoard(player1,player2){
 function gameBoard(){
    let turn = 0;
    let player = 'X';
    let board = ['','','','','','','','',''];

    const resetGame = () => {
        turn = 0;
        player = 'X';
        board = ['','','','','','','','',''];
    }

    const increaseTurn = () => turn++;

    const getTurn = () =>{
        let currentPlayer;
        if (turn % 2  == 0){
            currentPlayer = 'X';
        }
        else{
            currentPlayer = 'O';
        }
        return player;
    }

    const checkWin = () =>{
        if (board[0] == board[1] == board[2]){}
    }

    const playTurn = (location) => {
        if ( board[location] != '' ){
            return "Location is taken."
        }else{
            board[location] = player;
        }
        increaseTurn();
        return board;
    }

    return {playTurn, getTurn,resetGame}
}
