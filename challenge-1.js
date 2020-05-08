const markWeight = 65;
const markHeight = 1.2;

const johnWeight = 80;
const johnHeight = 1.1;

const markBMI = markWeight / (markHeight * markHeight);
const johnBMI = johnWeight / (johnHeight * johnHeight);

const result = markBMI > johnBMI;

console.log("is Mark's BMI greater than John's? " + result);
