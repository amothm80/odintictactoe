import { gameBoard } from "./source-gameboard.js";

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

//a self executing function
const game = (function(){
  //the below variables couldve been hidden but i exposed them.
  //setplayer and getplayer could have been used instead
  //all the lines of this function will be executed normally.
  let playerx= "";
  let playero= "";
  let tttBoard = gameBoard();
  let setPlayers = function (player1, player2) {
    this.playerx = player1;
    this.playero = player2;
  };
  return {playerx, playero, tttBoard, setPlayers};
})()

function displayBoardHTML(tttBoard) {
  const tttBoardState = tttBoard.gameStatus().boardState;
  for (let cell of xocells) {
    let cellid = cell.getAttribute("id");
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
      let turnResult = game.tttBoard.playTurn(parseInt(cellid[9]));
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
