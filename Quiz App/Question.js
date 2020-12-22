function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// Quiz Questions
var questions = [
    new Question("When was electronics company Nintendo founded?", ["2020", "1889", "1980", "2000"], "1889"),
    new Question("What year did the first Apple iPhone launch?", ["2005", "2006", "2007", "2008"], "2007"),
    new Question("From 2017 onwards, how many characters long can tweets be?", ["250", "260", "270", "280"], "280"),
    new Question("What is the name of the classic 1972 arcade game based on table tennis?", ["Galaga", "Pac", "Pong", "None"], "Pong"),
    new Question("In what year was the first transatlantic radio broadcast?", ["1900", "1901", "1902", "1903"], "1901")
];

// create the quiz
var quiz = new Quiz(questions);

// display the quiz window
populate();