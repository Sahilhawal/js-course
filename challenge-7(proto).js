(function () {
  var Question = function (qstn, options, indexOfAnswer) {
    this.qstn = qstn;
    this.options = options;
    this.answer = indexOfAnswer;
  };

  Question.prototype.displayQuestion = function () {
    console.log(this.qstn);
    console.table(this.options);
    var userAnswer = prompt("Enter Index?");
    console.log(userAnswer, this.answer);
    if (userAnswer == this.answer) {
      console.log("correct answer");
    } else {
      console.log("wrong answer");
    }
  };

  var timeQuestion = new Question("what time it is?", [2, 3, 4], 0);
  var nameQuestion = new Question("What is my birthdate?", [2, 4, 24], 2);

  var questions = [timeQuestion, nameQuestion];

  var selectedQuestion =
    questions[Math.floor(Math.random() * questions.length)];
  selectedQuestion.displayQuestion();
})();
