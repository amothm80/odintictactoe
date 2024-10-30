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
function createPlayer(name) {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const increaseScore = () => ++score;
  const resetScore = () => (score = 0);
  return { getName, getScore, increaseScore, resetScore };
}

// function gameBoard(player1,player2){
function gameBoard() {
  let currentPlayer = "X";
  let gameActive = false;
  let board = ["", "", "", "", "", "", "", "", ""];

  const resetGame = () => {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    return {
      callSuccess: true,
      winState: "",
      boardState: board,
      currentPlayer: getPlayer(),
      gameActive: getGameState(),
      message: "game started",
    };
  };

  const endGame = () => {
    currentPlayer = "X";
    gameActive = false;
    board = ["", "", "", "", "", "", "", "", ""];
    return {
      callSuccess: true,
      winState: checkWin(),
      boardState: board,
      currentPlayer: getPlayer(),
      gameActive: getGameState(),
      message: "game ended",
    };
  };

  const getPlayer = () => {
    return currentPlayer;
  };

  const getGameState = () => {
    return gameActive;
  };

  const changePlayer = () => {
    if (currentPlayer == "O") {
      currentPlayer = "X";
    } else {
      currentPlayer = "O";
    }
    return currentPlayer;
  };

  const checkWin = () => {
    let boardCopy = board.slice(0);
    for (i in boardCopy) {
      if (boardCopy[i] == "") boardCopy[i] = i;
    }
    if (boardCopy[0] == boardCopy[1] && boardCopy[1] == boardCopy[2]) {
      gameActive = false;
      return { win: true, winner: board[0] };
    } else if (boardCopy[3] == boardCopy[4] && boardCopy[4] == boardCopy[5]) {
      gameActive = false;
      return { win: true, winner: board[5] };
    } else if (boardCopy[6] == boardCopy[7] && boardCopy[7] == boardCopy[8]) {
      gameActive = false;
      return { win: true, winner: board[8] };
    } else if (boardCopy[0] == boardCopy[3] && boardCopy[3] == boardCopy[6]) {
      gameActive = false;
      return { win: true, winner: board[6] };
    } else if (boardCopy[1] == boardCopy[4] && boardCopy[4] == boardCopy[7]) {
      gameActive = false;
      return { win: true, winner: board[7] };
    } else if (boardCopy[2] == boardCopy[5] && boardCopy[5] == boardCopy[8]) {
      gameActive = false;
      return { win: true, winner: board[8] };
    } else if (boardCopy[0] == boardCopy[4] && boardCopy[4] == boardCopy[8]) {
      gameActive = false;
      return { win: true, winner: board[8] };
    } else if (boardCopy[2] == boardCopy[4] && boardCopy[4] == boardCopy[6]) {
      gameActive = false;
      return { win: true, winner: board[6] };
    } else {
      return { win: false, winner: "" };
    }
  };

  const playTurn = (location) => {
    let turnResult = {};
    if (gameActive == true) {
      if (location < 0 || location > 8) {
        turnResult = {
          callSuccess: false,
          winState: "",
          boardState: board,
          currentPlayer: getPlayer(),
          gameActive: getGameState(),
          message: "location invalid",
        };
      } else {
        if (board[location] != "") {
          turnResult = {
            callSuccess: false,
            winState: "",
            boardState: board,
            currentPlayer: getPlayer(),
            gameActive: getGameState(),
            message: "location taken",
          };
        } else {
          board[location] = getPlayer();
          turnResult = {
            callSuccess: true,
            winState: checkWin(),
            boardState: board,
            currentPlayer: changePlayer(),
            gameActive: getGameState(),
            message: "",
          };
        }
      }
    } else {
      turnResult = {
        callSuccess: false,
        winState: "",
        boardState: "",
        currentPlayer: "",
        gameActive: getGameState(),
        message: "game inactive",
      };
    }
    return turnResult;
  };

  const gameStatus = () => {
    return {
      callSuccess: true,
      winState: checkWin(),
      boardState: board,
      currentPlayer: getPlayer(),
      gameActive: getGameState(),
      message: "",
    };
  };

  return { resetGame, playTurn, gameStatus, endGame };
}

function gameController(player1,player2){
  let playerx = player1;
  let playero = player2;
  let tttBoard = gameBoard();
  return{playerx,playero,tttBoard}
}

let game = ''

let newGameButton = document.querySelector("#newGame");
let xocells = document.querySelectorAll(".ttt-cell");

function displayBoardHTML(tttBoard){
  tttBoardVar = tttBoard.gameStatus().boardState;
  for (cell of xocells){
    cellid = cell.getAttribute('id')
    if (tttBoard[parseInt(cellid[9]) == '']){
      cell.innerHTML = ``;
    }
    if (tttBoard[parseInt(cellid[9]) == 'X']){
      cell.innerHTML = `<img src="images/alpha-x.png">`;
    }
    if (tttBoard[parseInt(cellid[9]) == 'O']){
      cell.innerHTML = `<img src="images/alpha-O.png">`;
    }   
  }
}

newGameButton.addEventListener("click", ()=>{
  player1name = document.querySelector("#playerXInput").value
  player2name = document.querySelector("#playerOInput").value

  game = gameController(createPlayer(player1name),createPlayer(player2name));
  game.tttBoard.resetGame();
  game.tttBoard.playTurn(1);
  game.tttBoard.playTurn(2);
  game.tttBoard.playTurn(3);
  displayBoardHTML(game.tttBoard)
})



for (const cell of xocells){
  cell.addEventListener("click", () =>{
    if (game.gameStatus().currentPlayer == 'X')
     { cell.innerHTML = `<img src="images/alpha-x.png">`;}
    else if (game.gameStatus().currentPlayer == 'O'){
      cell.innerHTML = `<img src="images/alpha-o.png">`;
    }
  })}










function displayBoard(board) {
  let b = board.slice(0);
  for (i in b) {
    if (b[i] == "") {
      b[i] = " ";
    }
  }
  console.log(`
        ${b[0]}|${b[1]}|${b[2]}
        ${b[3]}|${b[4]}|${b[5]}
        ${b[6]}|${b[7]}|${b[8]}
        `);
}
