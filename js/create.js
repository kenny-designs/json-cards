function Create(quizName) {
  this.quizName = quizName;
  this.titleField = document.getElementById('title-field');
  this.descField = document.getElementById('desc-field');
  this.createBtn = document.getElementById('create-btn');
  this.saveBtn = document.getElementById('save-btn');
}

Create.prototype.init = function() {
  this.req = new XMLHttpRequest();
  this.req.open('GET', './quiz/' + this.quizName + '.json');
  this.req.responseType = 'json';
  this.req.send();

  this.req.onload = function() {
    this.res = this.req.response;
    this.createBtn.addEventListener('click', function() {
      this.res.quiz.push({
        "question": this.titleField.value,
        "answer": this.descField.value.replace(/(\r\n\t|\n|\r\t)/gm,"") // removes new lines
      });

      // print so user can see what was added
      // chrome only
      console.clear();
      console.log(JSON.stringify(this.res, null, 2));
    }.bind(this));

    this.saveBtn.addEventListener('click', function() {
      download(JSON.stringify(this.res),
              this.quizName + '.json',
              'application/json');
    }.bind(this));
  }.bind(this);
};

/** Allows us to download the new cards */
function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

var create = new Create('ethics2');

create.init();
