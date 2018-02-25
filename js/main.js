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
  this.req.open('GET', './quiz/' + this.quizName);
  this.req.responseType = 'json';
  this.req.send();

  // starts up the quiz
  this.req.onload = function() {
    // load initial question
    this.question.innerHTML = this.req.response.quiz[this.num].question;
    this.answer.innerHTML = '';

    // add functionality to the flashcard div
    this.flashcard.addEventListener('click', function() {
      if (this.answer.innerHTML === '') {
        this.answer.innerHTML = this.req.response.quiz[this.num].answer;
      }
      else {
        this.question.innerHTML = this.req.response.quiz[++this.num].question;
        this.answer.innerHTML = '';
      }
    }.bind(this));
  }.bind(this);
};

// begin the quiz
let quiz = new Quiz('progQuiz.json');
quiz.start();