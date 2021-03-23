/* ADDING HTML ELEMENTS */

// Declaring variables and assigning values of an element selected to them
var body = document.body;
var headerSelect = document.querySelector('header');
var mainSelect = document.querySelector('main');
var quizIntroSelect = document.querySelector('.quiz-intro');
var startButtonSelect = document.querySelector('.start-button');
var informationSectionSelect = document.querySelector('.information');
var linkSelect = document.querySelector('a');

// Creating and appending a FOOTER to the wrapper class in the body section of the document
var footerSection = document.createElement('footer');
footerSection.textContent = "© Created by Trushil";
body.appendChild(footerSection);

/* CHANGING THE STYLE PROPERTIES */

body.setAttribute('style', 'background-color: #f9fbfd; font-family: sans-serif;');

// Adding styling to the HEADER element
headerSelect.setAttribute('style', 'background: #fff; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 50%); font-size: 20px; color: #3b4954; padding: 20px; text-align: center;');

// Adding styling to the MAIN element
mainSelect.setAttribute('style', 'height: 83.7vh;');

// Adding styling to the information section
informationSectionSelect.setAttribute('style', 'display: flex; font-size: 18px; justify-content: space-between; margin: 10px;');
linkSelect.setAttribute('style', 'text-decoration: none;');


// Adding styling to the .quiz-intro element
quizIntroSelect.setAttribute('style', 'color: #3b4954; font-size: 18px; line-height: 1.4; margin: 0 auto; margin-bottom: 100px; margin-top: 100px; max-width: 800px; padding: 30px 40px; text-align: center;');

// Adding styling to the .start-button button
startButtonSelect.setAttribute('style', 'background: #0d4383; color: #fff; outline: none; padding: 15px 50px;');

// Adding the styling to the FOOTER element
footerSection.setAttribute('style', 'background: #313131; color: #fff; margin: 0 auto; padding: 20px; text-align: center;');