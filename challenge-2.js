const bulls = [89, 120, 103];
const pistons = [116, 94, 123];
const lakers = [97, 134, 105];

const bullsAvg = bulls.reduce((total, score) => total + score) / bulls.length;
const pistonsAvg =
  pistons.reduce((total, score) => total + score) / pistons.length;
const lakersAvg =
  lakers.reduce((total, score) => total + score) / lakers.length;

if (bullsAvg > pistonsAvg && bullsAvg > lakersAvg) {
  console.log("The winner is Bulls with Average " + bullsAvg);
} else if (pistonsAvg > bullsAvg && pistonsAvg > lakersAvg) {
  console.log("The winner is Pistons with Average " + pistonsAvg);
} else if (lakersAvg > bullsAvg && lakersAvg > pistonsAvg) {
  console.log("The winner is Lakers with Average " + lakersAvg);
} else if (bullsAvg === pistonsAvg) {
  console.log("The Match has been drawn with average " + bullsAvg);
} else {
  console.log("The winner is Pistons with Average " + pistonsAvg);
}
