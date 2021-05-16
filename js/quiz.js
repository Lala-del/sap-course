//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");






// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    // queCounter(1); //passing 1 parameter to queCounter
    // startTimer(15); //calling startTimer function
    // startTimerLine(0); //calling startTimerLine function
}



  
  var Quiz = function() {
    this.element = document.getElementById('quiz');
    this.navElement = document.getElementsByClassName('quiz-navigation')[0];
    this.quizNav = function QuizNav(navElement, quizElement, quizObj) {
      this.currentQuestion = 0;
      this.nextBtn = document.getElementById('next');
      this.prevBtn = document.getElementById('prev');
      this.numberBtns = [];
      this.showQuestion = function(index) {
        quizObj.questions.forEach(function(q) {
          if (q.position !== index) {
            q.hide();
          }
        });
        quizObj.questions[index].show();
        this.currentQuestion = index;
      };
      this.next = function() {
        this.showQuestion(++this.currentQuestion);
      };
      this.prev = function() {
        this.showQuestion(--this.currentQuestion);
      };
      this.makeNumbers = function() {
        var self = this;
        quizObj.questions.forEach(function(q) {
          var numberBtn = document.createElement('button');
          numberBtn.textContent = q.position + 1;
          numberBtn.addEventListener('click',function() {
            self.showQuestion(q.position);
            self.checkPos();
          });
          self.numberBtns.push(numberBtn);
          navElement.insertBefore(numberBtn,self.nextBtn);
  
        });
      };
      this.checkPos = function() {
        this.numberBtns.forEach(function(btn) {
          btn.disabled = '';
        });
        this.numberBtns[this.currentQuestion].disabled = true;
        if (this.currentQuestion === 0) {
          this.prevBtn.disabled = true;
        } else {
          this.prevBtn.disabled = '';
        }
        if (this.currentQuestion === (quizObj.questions.length - 1)) {
          this.nextBtn.disabled = true;
          this.endQuizBtn.add();
        } else {
          this.nextBtn.disabled = '';
          this.endQuizBtn.remove();
        }
      };
      this.endQuizBtn = {
        element: document.createElement('button'),
        add: function() {
          var self = this;
          self.element.textContent = 'End quiz';
          navElement.appendChild(self.element);
        },
        remove: function() {
          var self = this;
          if (navElement.lastChild === self.element) {//tutaj pewnie można zrobić lepsze sprawdzenie
            navElement.removeChild(self.element);
          }
        },
        clicked: function() {
          var score = 0;
          quizObj.questions.forEach(function(q) {
            if (q.isAnswerCorrect()) {
              ++score;
            }
          });
          var content = document.createElement('div');
          content.className = 'result';
          var showScore = document.createElement('h2');
          showScore.textContent = 'Your score: ' + score;
          content.appendChild(showScore);
          quizObj.showAnswers();
          navElement.style.display = 'none';
          var tryAgainBtn = document.createElement('button');
          tryAgainBtn.textContent = 'Try again';
          content.appendChild(tryAgainBtn);
          quizElement.appendChild(content);
          tryAgainBtn.addEventListener('click',function() {
              quizObj.reset();
          });
        },
        addEvent: function() {
          var self = this;
          this.element.addEventListener('click',function() {
            self.clicked();
          });
        }
      },
      this.handleEvents = function() {
        var self = this;
        this.nextBtn.addEventListener('click',function() {
          self.next();
          self.checkPos();
        });
        this.prevBtn.addEventListener('click',function() {
          self.prev();
          self.checkPos();
        });
        this.endQuizBtn.addEvent();
      };
    },
    this.quizNavObject = new this.quizNav(this.navElement,this.element,this);
    this.questions = [];
    this.questionElement = function(QuestionObject,parentElement,questionPosition,navElement) {
      this.question = QuestionObject;
      this.position = questionPosition;
      this.element = document.createElement('div');
      this.element.className = 'question-wrapper';
      this.inputs = [];
      this.labels = [];
      this.create = function() {
        var self = this;
        this.element.innerHTML = '<h2>' + (this.position + 1) + '. ' + QuestionObject.question +'</h2>';
        QuestionObject.answers.forEach(function(answer,index) {
          var answerWrapper = document.createElement('div');
          answerWrapper.className = 'answer';
          var input = document.createElement('input');
          input.type = 'radio';
          input.id = questionPosition + '-' + index + '-num';
          input.name = 'question-' + questionPosition;
          input.value = index;
          var label = document.createElement('label');
          label.htmlFor = questionPosition + '-' + index + '-num';
          label.textContent = answer;
          answerWrapper.appendChild(input);
          answerWrapper.appendChild(label);
          self.inputs.push(input);
          self.labels.push(label);
          self.element.appendChild(answerWrapper);
          input.addEventListener('change',function() {
            self.updateAnswer();
          });
        });
      };
      this.answer = null;
      this.updateAnswer = function() {
        //lecę przez wszystkie elementy z tym samym atrybutem name i sprawdzam który zaznaczony
        var self = this;
        this.inputs.forEach(function(input) {
          if (input.checked) {
            self.answer = input.value;
          }
        });
      }
      this.isAnswerCorrect = function() {
        if (this.answer === null) {
          return false;
        }
        return this.question.correctAnswer === Number(this.answer);
      };
      this.showCorrect = function() {
        this.labels[this.question.correctAnswer].style.color = '#090';
      };
      this.hideCorrect = function() {
        this.labels[this.question.correctAnswer].style.color = 'initial';
      };
      this.showUserAnswers = function() {
        if (this.answer) {
          this.labels[this.answer].style.color = '#900';
        }
      };
      this.hideUserAnswers = function() {
        if (this.answer) {
          this.labels[this.answer].style.color = 'initial';
        }
      }
      this.append = function() {
        this.create();
        parentElement.insertBefore(this.element,navElement);
      };
      this.show = function() {
        this.element.style.display = 'block';
      };
      this.hide = function() {
        this.element.style.display = 'none';
      }
    },
    this.makeQuestions = function() {
      var self = this;
      QuestionsArray.forEach(function(q,index) {
        self.questions.push(new self.questionElement(q,self.element,index,self.navElement));
        self.questions[index].append();
      });
    };
    this.init = function() {
      this.makeQuestions();
      this.quizNavObject.showQuestion(0);
      this.quizNavObject.makeNumbers();
      this.quizNavObject.checkPos(this.questions[0]);
      this.quizNavObject.handleEvents();
      this.element.addEventListener('submit',function(e) {
        e.preventDefault();
      });
    };
    this.reset = function() {
      this.questions.forEach(function(q) {
        q.hide();
        q.hideUserAnswers();
        q.hideCorrect();
        q.answer = null;
        q.inputs.forEach(function(inp) {
          inp.disabled = '';
          inp.style.display = 'initial';
          inp.checked = '';
        });
      });
      this.quizNavObject.currentQuestion = 0;
      this.quizNavObject.showQuestion(0);
      this.quizNavObject.checkPos(this.questions[0]);
      var result = document.getElementsByClassName('result')[0];
      this.element.removeChild(result);
      this.navElement.style.display = 'block';
    },
    this.showAnswers = function() {
      this.questions.forEach(function(q) {
        q.show();
        q.showUserAnswers();
        q.showCorrect();
        q.inputs.forEach(function(inp) {
          inp.disabled = true;
          inp.style.display = 'none';
        });
      });
    }
  }
  
  var QuizObj = new Quiz();
  QuizObj.init();
  


  