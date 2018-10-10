function Quiz(quizName) {
  // name of the quiz i.e. sample.json
  this.quizName = quizName;
  this.flashcard = document.getElementById('flashcard'); // flashcard div
  this.question = document.getElementById('question');   // question div
  this.answer = document.getElementById('answer');       // answer div
  this.controls = new Controller();                      // handling user input

  this.num = 0; // quiz question we are currently on
}

// loads in our quiz and starts the exam
Quiz.prototype.start = function() {
  this.req = new XMLHttpRequest();
  this.req.open('GET', './quiz/' + this.quizName + '.json');
  this.req.responseType = 'json';
  this.req.send();

  // starts up the quiz
  this.req.onload = function() {
    // load initial question
    this.question.innerHTML = this.req.response.quiz[this.num].question;
    this.answer.innerHTML = '';

    // allow flipping through cards
    this.flashcard.addEventListener('click', function() {
      this.nextCard();
    }.bind(this));

    // set keyboard controls
    this.controls.setBinding('rightArrow', this.nextCard.bind(this));
    this.controls.setBinding('leftArrow', this.prevCard.bind(this));

    // touch listener
    // document.addEventListener('touchstart', this.touchControls.bind(this), false);
  }.bind(this);
};

// flips to the next card
Quiz.prototype.nextCard = function() {
  if (this.answer.innerHTML === '') {
    this.answer.innerHTML = this.req.response.quiz[this.num].answer;
  }
  else {
    this.question.innerHTML = this.req.response.quiz[++this.num].question;
    this.answer.innerHTML = '';
  }
};

// goes back a card
Quiz.prototype.prevCard = function() {
  this.answer.innerHTML = '';

  if (this.num > 0) {
    this.question.innerHTML = this.req.response.quiz[--this.num].question;
  }
};

// Object that handles detecting user input
function Controller() {
  // records location of touch
  this.xDown = null;
  this.yDown = null;

  // constants for keys
  this.LEFT_ARROW = 37;
  this.RIGHT_ARROW = 39;

  // object that stores key bindings
  this.bindings = {};

  // begin listening for key presses
  document.addEventListener('keydown', this.handleKeyDown.bind(this));
}

// sets a new key binding to the bindings object
Controller.prototype.setBinding = function(name, func) {
  this.bindings[name] = func;
};

// invokes the action associated with the related key
Controller.prototype.handleKeyDown = function(event) {
  switch (event.keyCode) {
    case this.RIGHT_ARROW:
      this.bindings.rightArrow();
      break;

    case this.LEFT_ARROW:
      this.bindings.leftArrow();
      break;
  }
};

// sets initial values for when a touch event is detected
Controller.prototype.handleTouchStart = function(event) {
  this.xDown = event.touches[0].clientX;
  this.yDown = event.touches[0].clientY;
};

// TODO: improve this. Very crude and offers no way to catch exceptions
// prompt the user for a quiz
var quiz = new Quiz(prompt('Enter a quiz to take:', 'progQuiz'));

// begin quiz
quiz.start();

/*
let obj = {};
obj[37] = function(){}; // holy shit yoooo!!!
console.log(obj);
*/
