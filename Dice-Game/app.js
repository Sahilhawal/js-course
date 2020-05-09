/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let activePlayer,
  playerOneScore,
  playerTwoScore,
  playerOneScoreCurrent,
  playerTwoScoreCurrent;

const newGame = () => {
  activePlayer = "playerOne";
  playerOneScore = 0;
  playerTwoScore = 0;
  playerOneScoreCurrent = 0;
  playerTwoScoreCurrent = 0;
  const scoreElements = document.getElementsByClassName("player-score");
  const scoreElementsCurrent = document.getElementsByClassName(
    "player-current-score"
  );
  for (var i = 0; i < scoreElements.length; i++) {
    scoreElements[i].innerHTML = 0;
  }
  for (var i = 0; i < scoreElementsCurrent.length; i++) {
    scoreElementsCurrent[i].innerHTML = 0;
  }
};

newGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  const diceNumber = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".dice").src = "dice-" + diceNumber + ".png";

  if (diceNumber === 1) {
    eval(`${activePlayer}ScoreCurrent = 0`);
    document.getElementById(`${activePlayer}ScoreCurrent`).innerHTML = 0;
  } else {
    eval(`${activePlayer}ScoreCurrent += ${diceNumber}`);
    document.getElementById(`${activePlayer}ScoreCurrent`).innerHTML = eval(
      activePlayer + "ScoreCurrent"
    );
  }
  console.log(
    `${activePlayer}ScoreCurrent`,
    activePlayer,
    playerOneScore,
    playerTwoScore,
    playerOneScoreCurrent,
    playerTwoScoreCurrent
  );
  if (eval(`${activePlayer}Score`) >= 50) {
    alert(activePlayer == "playerOne" ? "Player 1 Wins" : "Player 2 Wins");
    console.log(`${activePlayer} wins`);
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  eval(`${activePlayer}Score += ${activePlayer}ScoreCurrent`);
  eval(`${activePlayer}ScoreCurrent=0`);
  document.getElementById(`${activePlayer}ScoreCurrent`).innerHTML = 0;
  document.getElementById(`${activePlayer}Score`).innerHTML = eval(
    `${activePlayer}Score`
  );
  activePlayer = activePlayer == "playerOne" ? "playerTwo" : "playerOne";
});

document.querySelector(".btn-new").addEventListener("click", newGame);
