(function() {
    // Functions
    function buildQuiz() {
        // Variable to store the HTML output
        var output = [];

        // Using a for each loop for the quiz questions object
        quizQuestions.forEach( (currentQuestion, questionNumber) => {
            // Variable to store the list of possible answers
            var answers = [];

            // For each available answer option in the question
            for(letter in currentQuestion.answers) {
                // Adding HTML radio button
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            // Add this question and its answers to the output
            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        });
        // Combining the output list into one string of HTML and putting it on the web page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        // Gather answer containers from out quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // Keeping track of the user's answers
        var numCorrect = 0; // can delete

        // Using a for each statement to cycle through each questions
        quizQuestions.forEach( (currentQuestion, questionNumber) => {
            // Find the selected answer
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;
            console.log(userAnswer);
            // Using an if statement to check if the answer is correct
            if(userAnswer === currentQuestion.correctAnswer){
                // Adding to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });
        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    }

    function showSlide(n) {
        var previousButton = document.getElementById("previous");
        var nextButton = document.getElementById("next");
        var slides = document.querySelectorAll(".slide");

        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0) {
            previousButton.style.display = 'none';
        } 
        else {
            previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }

        previousButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    // Variables
    var body = document.body;
    var headerSelect = document.querySelector('header');
    var mainSelect = document.querySelector('main');
    var timerSelect = document.querySelector('.timer-count');
    var quizIntroSelect = document.querySelector('.quiz-intro');
    var startButtonSelect = document.querySelector('#start-button');

    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    // Creating an object with the quiz questions and its answer options
    var quizQuestions = [
        {
            question: 'What does "myFunction()" do?',
            answers: {
                a: 'Assigns a function',
                b: 'Declares a function',
                c: 'Defines a function',
                d: 'Invokes a function'
            },
            correctAnswer: 'd'
        },
        {
            question: 'How does the one target a div element with the id of "quiz" that is inside the body using Javascript',
            answers: {
                a: 'document.get("#quiz")',
                b: 'document.body.quiz',
                c: 'document.getElementById("quiz")',
                d: 'document.queryBody("quiz")'
            },
            correctAnswer: 'c'
        },
        {
            question: 'Which of the following is the correct way to start a FOR loop statement?',
            answers: {
                a: 'for i = 1 to 7',
                b: 'for (i = 0; i++)',
                c: 'for (i = 0, i <= 7; i++)',
                d: 'for (i <= 7, i++)'
            },
            correctAnswer: 'c'
        },
        {
            question: 'Which one of the below reflects the correct way to write a JavaScript array?',
            answers: {
                a: 'var primitiveDataTypes = ["String", "Number", "Boolean", "Undefined"]',
                b: 'var primitiveDataTypes = "String", "Number", "Boolean", "Undefined"',
                c: 'var primitiveDataTypes = (1:"String", 2:"Number", 3:"Boolean", 4:"Undefined")',
                d: 'var primitiveDataTypes = 1 = ("String"), 2 = ("Number"), 3 = ("Boolean"), 4 = ("Undefined")'
            },
            correctAnswer: 'a'
        },
        {
            question: 'How do you round a number UPWARDS to the nearest integer',
            answers: {
                a: 'ceil(2.4)',
                b: 'Math.ceil(2.4)',
                c: 'top(2.4)',
                d: 'Math.round(2.4)'
            },
            correctAnswer: 'b'
        }
    ];

    var sortedQuizQuestions = quizQuestions.slice().sort();
    var timeLeft = 100;

    function initiateQuiz() {
        startQuiz();

        var timeInterval = setInterval(function() {
            timeLeft--;
            timerSelect.textContent = timeLeft;

            if(timeLeft === 0) {
                clearInterval(timeInterval);
                console.log("GAME OVER");
            }
        }, 1000)


        // Displays the quiz
        buildQuiz();
        showSlide(currentSlide);

        /*var answerContainers = quizContainer.querySelectorAll('.answers');

        // Using a for each statement to cycle through each questions
        sortedQuizQuestions.forEach( (currentQuestion, questionNumber) => {
            // Find the selected answer
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // Using an if statement to check if the answer is correct
            if(userAnswer === currentQuestion.correctAnswer){
                alert("Correct");
            } else {
                console.log("Wrong");
                timeLeft -= 10;
            }
        })*/
    }

    function startQuiz() {
        quizIntroSelect.style.display = "none";
        submitButton.style.display = "block";
        /*mainSelect.setAttribute('style', 'height: 100%;');

        var quizSection = document.createElement('section');
        quizSection.setAttribute('id', 'quiz');
        body.appendChild(quizSection);

        var submitButtonSection = document.createElement('button');
        submitButtonSection.setAttribute('id', 'submit');
        submitButtonSection.textContent = "Submit Quiz";
        body.appendChild(submitButtonSection);

        var resultsSection = document.createElement('section');
        resultsSection.setAttribute('id', 'results');
        body.appendChild(resultsSection);*/

        
        // var questionSection = document.createElement('section');
        // questionSection.setAttribute('id', 'questions');
        // var questionToAnswer = JSON.parse(localStorage.getItem('question'));
        // questionSection.textContent = questionToAnswer;

        // mainSelect.append(questionSection);
        // questionSection.setAttribute('style', 'color: #3b4954; font-size: 24px; font-weight: 700; line-height: 1.4; margin: 0 auto; margin-bottom: 100px; margin-top: 100px; max-width: 800px; padding: 30px 40px; text-align: center;');

    }


    // Beginning quiz
    //buildQuiz()

    // Pagination
    /*var previousButton = document.getElementById("previous");
    var nextButton = document.getElementById("next");
    var slides = document.querySelectorAll(".slide");
    */
    var currentSlide = 0;

     // Show the first slide
    //showSlide(currentSlide);

    // Event listeners
    // On start button being clicked, the countdown timer starts and the quiz begins
    startButtonSelect.addEventListener('click', initiateQuiz);

    // On submit, show results
    submitButton.addEventListener('click', showResults);

    // On click of the respective button, the quiz will move forward or back through the questions
    //previousButton.addEventListener('click', showPreviousSlide);
    //nextButton.addEventListener('click', showNextSlide);

})();