export function gameBoard() {
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
      for (let i in boardCopy) {
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

