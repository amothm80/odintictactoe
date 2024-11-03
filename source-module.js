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

let newGameDialog = document.querySelector("#newGameDialog");
let newGameCancel = document.querySelector("#newGameCancel");
let newGameAction = document.querySelector("#newGameAction");
// let game = "";

let newGameButton = document.querySelector("#newGame");
let newRoundButton = document.querySelector("#newRound");
let endGameButton = document.querySelector("#endGame");
let xocells = document.querySelectorAll(".ttt-cell");

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
    let boardFull = true;
    for (i in boardCopy) {
      if (boardCopy[i] == "") {
        boardCopy[i] = i;
        boardFull = false;
      }
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
      if (boardFull == true) {
        return { win: true, winner: "" };
      } else {
        return { win: false, winner: "" };
      }
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

// function gameController(player1, player2) {
//   let playerx = player1;
//   let playero = player2;
//   let tttBoard = gameBoard();
//   return { playerx, playero, tttBoard };
// }

// const game = {
//   playerx: "",
//   playero: "",
//   tttBoard: gameBoard(),
//   setPlayers: function (player1, player2) {
//     this.playerx = player1;
//     this.playero = player2;
//   },
// };


//a self executing function
const game = (function(){
  //the below variables couldve been hidden but i exposed them.
  //setplayer and getplayer could have been used instead
  //all the lines of this function will be executed normally.
  playerx= "";
  playero= "";
  tttBoard = gameBoard();
  setPlayers = function (player1, player2) {
    this.playerx = player1;
    this.playero = player2;
  };
  return {playerx, playero, tttBoard, setPlayers};
})()

function displayBoardHTML(tttBoard) {
  const tttBoardState = tttBoard.gameStatus().boardState;
  for (cell of xocells) {
    cellid = cell.getAttribute("id");
    if (tttBoardState[parseInt(cellid[9])] == "") {
      cell.innerHTML = ``;
    }
    if (tttBoardState[parseInt(cellid[9])] == "X") {
      cell.innerHTML = `<img src="images/alpha-x.png">`;
    }
    if (tttBoardState[parseInt(cellid[9])] == "O") {
      cell.innerHTML = `<img src="images/alpha-o.png">`;
    }
  }
}

// function clearFlags() {
//   const flagO = document.querySelector("#turnFlagO");
//   const flagX = document.querySelector("#turnFlagX");
//   flagO.style.display = "none";
//   flagX.style.display = "none";
// }

// function changeFlag(currentPlayer) {
//   const flagO = document.querySelector("#turnFlagO");
//   const flagX = document.querySelector("#turnFlagX");
//   if (currentPlayer == "X") {
//     flagX.style.display = "block";
//     flagO.style.display = "none";
//   } else if (currentPlayer == "O") {
//     flagX.style.display = "none";
//     flagO.style.display = "block";
//   }
// }
function commentary(comment){
  const com_cell = document.querySelector("#commentary-cell");
  com_cell.innerHTML = comment;
}

function player_comment(currentPlayer){
  if (currentPlayer == "X") {
    commentary("X's Turn");
  } else if (currentPlayer == "O") {
    commentary("O's Turn");
  }
}



function displayPlayerNames(playerX, playerO) {
  const playerXname = document.querySelector("#playerXDisplay");
  const playerOname = document.querySelector("#playerODisplay");
  playerXname.innerHTML = playerX;
  playerOname.innerHTML = playerO;
}

function clearPlayerNames() {
  const playerXname = document.querySelector("#playerXDisplay");
  const playerOname = document.querySelector("#playerODisplay");
  playerXname.innerHTML = "";
  playerOname.innerHTML = "";
}

function updateScore() {
  const scoreX = document.querySelector("#scoreX");
  const scoreO = document.querySelector("#scoreO");
  scoreX.innerHTML = game.playerx.getScore();
  scoreO.innerHTML = game.playero.getScore();
}

function gameActive() {
  newGameButton.style.display = "none";
  newRoundButton.style.display = "block";
  endGameButton.style.display = "block";
}
function gameInactive() {
  newGameButton.style.display = "block";
  newRoundButton.style.display = "none";
  endGameButton.style.display = "none";
}

newGameButton.addEventListener("click", () => {
  document.getElementById("playerXName").value = "";
  document.getElementById("playerOName").value = "";
  newGameDialog.showModal();
});

newRoundButton.addEventListener("click", () => {
  const gameStatus = game.tttBoard.resetGame();
  commentary("")
  updateScore();
  displayBoardHTML(game.tttBoard);
});

endGameButton.addEventListener("click", () => {
  const gameStatus = game.tttBoard.endGame();
  // clearFlags();
  commentary("");
  updateScore();
  displayBoardHTML(game.tttBoard);
  gameInactive();
});

function handleUserInput(returnValue) {
  if (returnValue == "newGame") {
    const player1name = document.querySelector("#playerXName").value;
    const player2name = document.querySelector("#playerOName").value;

    // game = gameController(createPlayer(player1name), createPlayer(player2name));
    game.setPlayers(createPlayer(player1name), createPlayer(player2name));
    game.playerx.resetScore();
    game.playero.resetScore();
    const gameStatus = game.tttBoard.resetGame();
    // changeFlag(gameStatus.currentPlayer);
    player_comment(gameStatus.currentPlayer);
    updateScore();
    displayPlayerNames(player1name, player2name);
    displayBoardHTML(game.tttBoard);
    gameActive();
  }
}

newGameDialog.addEventListener("close", () => {
  //   openCheck(addBookDialog);
  handleUserInput(newGameDialog.returnValue);
});

newGameAction.addEventListener("click", (e) => {
  e.preventDefault();
  newGameDialog.close("newGame");
});

newGameCancel.addEventListener("click", () => {
  newGameDialog.close();
  gameInactive();
});

for (const cell of xocells) {
  cell.addEventListener("click", () => {
    const cellid = cell.getAttribute("id");
    const gameStatus = game.tttBoard.gameStatus();
    const currentPlayer = gameStatus.currentPlayer;
    if (gameStatus.gameActive) {
      turnResult = game.tttBoard.playTurn(parseInt(cellid[9]));
      if (turnResult.callSuccess) {
        if (currentPlayer == "X") {
          cell.innerHTML = `<img src="images/alpha-x.png">`;
        } else if (currentPlayer == "O") {
          cell.innerHTML = `<img src="images/alpha-o.png">`;
        }
        player_comment(turnResult.currentPlayer);
        if (turnResult.winState.win) {
          if (turnResult.winState.winner == "X") {
            game.playerx.increaseScore();
          }
          if (turnResult.winState.winner == "O") {
            game.playero.increaseScore();
          }
          updateScore();
          if (turnResult.winState.winner == "") {
            commentary("game is a tie");
          } else {
            commentary(`Winner is ${turnResult.winState.winner}`);
          }
        }
      }
    }
  });
}

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

gameInactive();
commentary("")
