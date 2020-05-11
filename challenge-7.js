var Question = function (qstn, options, indexOfAnswer) {
  this.qstn = qstn;
  this.options = options;
  this.answer = indexOfAnswer;
};


var timeQuestion = new Question("what time it is?", [2, 3, 4], 3);
var nameQuestion = new Question("What is my birthdate?", [2, 4, 24], 24);

var questions = [timeQuestion, nameQuestion];

var selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
console.log(selectedQuestion.qstn);
console.table(selectedQuestion.options);

var userAnswer = prompt("Enter Index?");
if (userAnswer == selectedQuestion.answer) {
  console.log("correct answer");
} else {
  console.log("wrong answer");
}
