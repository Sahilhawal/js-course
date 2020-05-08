/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let activePlayer, playerOneScore, playerTwoScore;

(function () {
  activePlayer = "playerOne";
  playerOneScore = 0;
  playerTwoScore = 0;
})();

document.querySelector(".btn-roll").addEventListener("click", function () {
  const diceNumber = Math.floor(Math.random() * 6 + 1);
  console.log(diceNumber);
  document.querySelector(".dice").src = "dice-" + diceNumber + ".png";

  if (diceNumber === 1) {
    eval(`${activePlayer}Score = 0`);
  } else {
    eval(`${activePlayer}Score += ${diceNumber}`);
  }
  console.log(activePlayer, playerOneScore, playerTwoScore);
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  activePlayer = activePlayer == "playerOne" ? "playerTwo" : "playerOne";
});
