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
var timeValue = 100;
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
    question: 'Which of the following is the correct way to start a FOR loop statement?',
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
    question: 'Which one of the below reflects the correct way to write a JavaScript array?',
    answer: 'var colours = ["Red", "Orange", "Yellow"]',
    options: [
        'var colours = ["Red", "Orange", "Yellow"]',
        'var colours = "Red", "Orange", "Yellow"',
        'var colours = (1:"Red", 2:"Orange", 3:"Yellow")',
        'var colours = 1 = ("Red"), 2 = ("Orange"), 3 = ("Yellow")'
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
    highscoreList.innerHTML = "";
    console.log(highscoreList);
    for (var i = 0; i < highscores.length; i++) {
        var highscore = highscores[i];
    
        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);
    
        highscoreList.appendChild(li);
    }
    console.log(highscoreList);
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
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.remove("activeResult"); //hide result box
    highscoreBox.classList.add("activeResult"); //show highscores box
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
            timeText.textContent = "Time Off"; //change the time text to time off
            nextButton.classList.add("show"); //show the next button if user selected any option
            showResult(); 
        }
    }
}

// Getting questions and options from array
function showQuetions(index){
    const questionText = document.querySelector(".question-text");

    // Creating a new span and div tag for question and option and passing the value using array index
    let questionTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    questionText.innerHTML = questionTag; //adding new span tag inside questionTag
    answerOptionList.innerHTML = optionTag; //adding new div tag inside optionTag
    
    const option = answerOptionList.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// If user clicked on option
function optionSelected(answer){
    isPaused = true;
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[questionCount].answer; //getting correct answer from array
    const allOptions = answerOptionList.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        timeCount.textContent -= 10;
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(answerOptionList.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                answerOptionList.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                answerOptionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        answerOptionList.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    nextButton.classList.add("show"); //show the next button if user selected any option
}

function questionCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuestionCounter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function showResult(){
    quizBox.classList.remove("activeQuiz"); //hide quiz box
    resultBox.classList.add("activeResult"); //show result box
    var scoreText = resultBox.querySelector(".answer-score-text");
    timeScore = timeCount.textContent;
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congratulations! You got '+ userScore +' out of '+ questions.length +'</span>' +'<span>Your time score is '+ timeScore +'</span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        scoreText.setAttribute('style', 'text-align = center');
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>Nice! You got '+ userScore +' out of '+ questions.length +'</span>' +'<span>Your time score is '+ timeScore +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>Sorry. You got only '+ userScore +' out of '+ questions.length +'</span>' +'<span>Your time score is '+ timeScore +'</span>';
        scoreText.innerHTML = scoreTag;
    }
}

// EVENT LISTENERS
// If the Start button is clicked
startButton.onclick = ()=>{
    startButton.style.display = "none";
    instructionsSelect.style.display = "none";
    highscoreBox.classList.remove("activeResult"); //remove highscores box
    quizBox.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    questionCounter(1); //passing 1 parameter to questionCounter
    startTimer(timeValue); //calling startTimer function
}

viewHighscoresButtonSelect.addEventListener("click", function(event) {
    event.preventDefault();  
    instructionsSelect.style.display = "none";
    // The information in the highscores array is stored to the local storage
    // The information stored on the local storage is then displayed in the <li> tags - each array item gets displayed in a seperate <li>
    storeHighscores();
    showHighscores();
    renderHighscores(); 
});

// If Next Question button clicked
nextButton.onclick = ()=>{
    if(questionCount < questions.length - 1){ //if question count is less than total question length
        questionCount++; //increment the questionCount value
        questionNumber++; //increment the questionCount value
        showQuetions(questionCount); //calling showQestions function
        questionCounter(questionNumber); //passing questionNumber value to questionCounter
        isPaused = false;
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        nextButton.classList.remove("show"); //hide the next button
    }else{
        showResult(); //calling showResult function
    }
}

submitScore.addEventListener("click", function(event) {
    event.preventDefault();
    var highscoreNameText = highscoreNameInput.value.trim() + " - " + timeCount.textContent;
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

clearHighscore.addEventListener("click", function() {
    highscoreList.innerHTML = "";
    localStorage.clear();
    highscoreList.removeChild(highscoreList);
    console.log(highscoreList);
    // Remove each li item - splice?
    renderHighscores(); 
});

// If restartQuizButton button clicked
restartQuizButton.onclick = ()=>{
    window.location.reload(); //reload the current window
}

loadHighscores();