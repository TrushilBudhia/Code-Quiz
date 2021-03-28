// VARIABLES
// Selecting all required elements
var viewHighscoresButtonSelect = document.querySelector("#view-highscores-btn");
var startButton = document.querySelector(".start-button button");
var instructionsSelect = document.querySelector("#instructions");
var quizBox = document.querySelector(".quiz-box");
var answerOptionList = document.querySelector(".answer-option-list");
var timeText = document.querySelector(".timer .time-left-text");
var timeCount = document.querySelector(".timer-value");
var nextButton = document.querySelector("footer .next-button");
var bottomQuestionCounter = document.querySelector("footer .question-count");
var resultBox = document.querySelector(".result-box");
var highscoreForm = document.querySelector("#highscore-form");
var highscoreNameInput = document.querySelector("#highscore-text");
var submitScore = document.querySelector(".submit");
var highscoreBox = document.querySelector(".highscore-box");
var highscoreList = document.querySelector("#highscore-list");
var restartQuizButton = document.querySelector(".buttons .restart");
var clearHighscore = document.querySelector(".buttons .clear-highscore");

// Assigning the new div tags for the correct and incorrect icons to variables
var tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

var questionCount = 0;
var questionNumber = 1;
var userScore = 0;
var counter;
var widthValue = 0;
var isPaused = false;
var timeValue = 75;
var highscores = [];

// Creating an array and passing the number, questions, options, and answers
var questions = [
    {
    numb: 1,
    question: 'How does an IF statement in Javascript begin',
    answer: 'if (i == 7)',
    options: [
        'if i = 7',
        'if.(i == 7 then)',
        'if (i == 7)',
        'if [i = 7]'
    ]
  },
    {
    numb: 2,
    question: 'What does "myFunction()" do?',
    answer: 'Invokes a function',
    options: [
        'Assigns a function',
        'Declares a function',
        'Defines a function',
        'Invokes a function'
    ]
  },
    {
    numb: 3,
    question: 'Which is the correct way to start a FOR loop statement?',
    answer: 'for (i = 0, i <= 7; i++)',
    options: [
        'for i = 1 to 7',
        'for (i = 0; i++)',
        'for (i = 0, i <= 7; i++)',
        'for (i <= 7, i++)'
    ]
  },
    {
    numb: 4,
    question: 'Which is the correct way to write a JavaScript array?',
    answer: 'var letters = ["A", "B", "C"]',
    options: [
        'var letters = ["A", "B", "C"]',
        'var letters = "A", "B", "C"',
        'letters = (1:"A", 2:"B", 3:"C")',
        'var letters = 1="A", 2="B", 3="C"'
    ]
  },
    {
    numb: 5,
    question: 'How do you round a number UPWARDS to the nearest integer',
    answer: 'Math.ceil(2.4)',
    options: [
        'ceil(2.4)',
        'Math.ceil(2.4)',
        'top(2.4)',
        'Math.round(2.4)'
    ]
  }
];

// FUNCTIONS
// Rending the highscores list on the page
function renderHighscores() {
    highscoresSort = highscores.sort().reverse();
    highscoreList.innerHTML = "";
    for (var i = 0; i < highscoresSort.length; i++) {
        var highscore = highscoresSort[i];
        var listItem = document.createElement("li");
        listItem.textContent = highscore;
        listItem.setAttribute("data-index", i);
        listItem.setAttribute("style", "list-style-type: none;");
        highscoreList.appendChild(listItem);
    }
}

function storeHighscores() {
    // The highscore object is stored to the local storage called highscores
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function loadHighscores() {
    // Getting the highscore item from the local storage
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    // If storeHighscores does not equal null, the value of storedHighscores is assigned to the highscores
    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
}

function showHighscores(){
    quizBox.classList.remove("activeQuiz"); // Hide quiz box
    resultBox.classList.remove("activeResult"); // Hide result box
    highscoreBox.classList.add("activeResult"); // Show highscores box
}

function startTimer(time){
    timeCount.textContent = time
    counter = setInterval(timer, 1000);
    function timer(){
        if(!isPaused) {
            timeLeft = timeCount.textContent--;
        }

        if(timeLeft === 1){
            clearInterval(counter);
            timeText.textContent = "Time Off"; 
            nextButton.classList.add("show"); 
            showResult(); 
        }
    }
}

// Getting questions and options from array
function showQuestions(index){
    var questionText = document.querySelector(".question-text");

    // Creating a new span and div tag for question and answer options and passing the value using array index
    var questionTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    questionText.innerHTML = questionTag; 
    answerOptionList.innerHTML = optionTag; 

    var option = answerOptionList.querySelectorAll(".option");
    // Set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// If user clicked on option, determine whether the answer is correct or incorrect
function optionSelected(answer){
    isPaused = true;
    var userAnswer = answer.textContent; 
    var correctAnswer = questions[questionCount].answer; 
    var allOptions = answerOptionList.children.length; 
    
    if(userAnswer == correctAnswer){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
    } else{
        timeCount.textContent -= 10;
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 

        // Auto highlighting the correct answer if the answer selected by the user is wrong
        for(i=0; i < allOptions; i++){
            if(answerOptionList.children[i].textContent == correctAnswer){ 
                answerOptionList.children[i].setAttribute("class", "option correct"); 
                answerOptionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
            }
        }
    }
    for(i=0; i < allOptions; i++){
        answerOptionList.children[i].classList.add("disabled"); // Disable all options after the user has selected an answer
    }
    nextButton.classList.add("show"); 
}

function questionCounter(index){
    // Creating a new span tag and passing the question number and total question
    var totalQuestionCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuestionCounter.innerHTML = totalQuestionCountTag;  
}

function showResult(){
    quizBox.classList.remove("activeQuiz"); 
    resultBox.classList.add("activeResult");
    var scoreText = resultBox.querySelector(".answer-score-text");
    timeScore = timeCount.textContent;
    if (userScore > 3){ 
        // Creating a new span tag and passing the user score number and total question number
        var scoreTag = '<span>Congratulations! You got '+ userScore +' out of '+ questions.length +'</span>' +'<span>Your time score is '+ timeScore +'</span>';
        scoreText.innerHTML = scoreTag;  
        scoreText.setAttribute('style', 'text-align = center');
    }
    else if(userScore > 1){ 
        var scoreTag = '<span>Nice! You got '+ userScore +' out of '+ questions.length +'</span>' +'<span>Your time score is '+ timeScore +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        var scoreTag = '<span>Sorry. You got only '+ userScore +' out of '+ questions.length +'</span>' +'<span>Your time score is '+ timeScore +'</span>';
        scoreText.innerHTML = scoreTag;
    }
}

// EVENT LISTENERS
// Initiates the quiz
startButton.addEventListener("click", function() {
    startButton.style.display = "none";
    instructionsSelect.style.display = "none";
    highscoreBox.classList.remove("activeResult");
    quizBox.classList.add("activeQuiz"); 
    showQuestions(0); 
    questionCounter(1); 
    startTimer(timeValue); 
});

// Opens the highscores table
viewHighscoresButtonSelect.addEventListener("click", function() {
    instructionsSelect.style.display = "none";
    // The information in the highscores array is stored to the local storage
    // The information stored on the local storage is then displayed in the <li> tags - each array item gets displayed in a seperate <li>
    storeHighscores();
    showHighscores();
    renderHighscores(); 
});

// Proceeds to the next step in the quiz
nextButton.addEventListener("click", function() {
    if(questionCount < questions.length - 1){ 
        questionCount++; 
        questionNumber++; 
        showQuestions(questionCount); 
        questionCounter(questionNumber);
        isPaused = false;
        nextButton.classList.remove("show"); 
    } else{
        showResult(); 
    }
});

// Submits the user score to the highscores list
submitScore.addEventListener("click", function(event) {
    event.preventDefault();
    var highscoreNameText = timeCount.textContent + " - " + highscoreNameInput.value.trim();
    // If no text is inputed in the highscoreNameText field, does not add list item to highscores
    if (highscoreNameInput.value == "") {
      return;
    }
    // The information inputed by the user is being pushed to the highscores array
    highscores.push(highscoreNameText);
    highscoreNameInput.value = "";
   
    // The information in the highscores array is stored to the local storage
    // The information stored on the local storage is then displayed in the <li> tags - each array item gets displayed in a seperate <li>
    storeHighscores();
    showHighscores();
    renderHighscores(); 
});

// Clears the highscore list
clearHighscore.addEventListener("click", function() {
    highscoreList.innerHTML = "";
    localStorage.clear();
    highscoreList.remove(highscoreList);
    renderHighscores(); 
});

// Restarts the Quiz
restartQuizButton.addEventListener("click", function() {
    window.location.reload(); 
});

loadHighscores();