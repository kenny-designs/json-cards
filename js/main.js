function Quiz(quizName) {
  // name of the quiz i.e. sample.json
  this.quizName = quizName;
  this.flashcard = document.getElementById('flashcard'); // flashcard div
  this.question = document.getElementById('question');   // question div 
  this.answer = document.getElementById('answer');       // answer div

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

    // key listener
    document.addEventListener('keydown', this.keyControls.bind(this));
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

// sets arrow controls
Quiz.prototype.keyControls = function(event) {
  switch (event.keyCode) {
    case 39:
      this.nextCard();
      break;
    case 37:
      this.prevCard();
      break;
  }
};

// TODO: improve this. Very crude and offers no way to catch exceptions
// prompt the user for a quiz
let quiz = new Quiz(prompt('Enter a quiz to take:', 'progQuiz'));

// begin quiz
quiz.start();
