const timeAllowed = 75;                                         //Time allowed for the quiz.
const timeDeduction = 15;                                       //Time deduction if user chooses wrong answer.
const totalQuestions = 5;                                       //Questions to be asked.
const hiddenElement = 'hidden';                                 //Hides the element.
const visibleElement = 'visible';                               //Makes the element visible.
const displayNone = 'none';                                     //Sets the display of element to none.
const oneRemSpace = '1rem';                                     //One REM space for margin.
const scoreKey ='quizscore-';                                   //Text used to get all keys from local storage.
const userInitialID = 'user-initial';                           //ID for user initial textbox.
const submitButtonID= 'submit-button';                          //ID for submit button.
const goBackButtonID = 'go-back';                               //ID for go back button.
const clearScoreButtonID= 'clear-score';                        //ID for clear high scrore button.
const highscoreButtonMargin = '1rem 0.5rem 0.5rem 0.5rem';      //Highscore buttons margin.
const questionHeadingClass = 'question-heading';                //Question heading class name.
const optionClass = 'option';                                   //Class name for options displayed for question.
const handClass = 'hand';                                       //Class name to set cursor to hand.

//Total number of quiz from which 5 questions will be chosen randomly.
const allQuestions = [
    {
        question: 'Which built-in method calls a function for each element in the array?',
        options: ['while()', 'loop()', 'forEach()', 'None of the above'],
        answer: 'forEach()'
    },

    {
        question: 'Which of the following function of array object creates a new array with the results of calling a provided function on every element in this array?',
        options: ['push()', 'join()', 'pop()', 'map()'],
        answer: 'map()'
    },

    {
        question: 'Which of the following function of array object adds one or more elements to the front of an array and returns the new length of the array?',
        options: ['unshift()', 'sort()', 'splice()',  'toString()'],
        answer: 'unshift()'
    },

    {
        question: 'What is JavaScript?',
        options: ['JavaScript is a scripting language used to make the website interactive',  'JavaScript is an assembly language used to make the website interactive', 'JavaScript is a compiled language used to make the website interactive', 'None of the mentioned'],
        answer: 'JavaScript is a scripting language used to make the website interactive'
    },

    {
        question: 'Which of the following is not JavaScript data types?',
        options: ['Null type', 'Undefined type', 'Number type', 'All of the mentioned'],
        answer: 'All of the mentioned'
    },

    {
        question: 'Why event handlers are needed in JavaScript',
        options: ['Allows JavaScript code to alter the behaviour of windows', 'Adds innerHTML page to the code', 'Change the server location', 'Performs handling of exceptions and occurrences'],
        answer: 'Allows JavaScript code to alter the behaviour of windows'
    },

    {
        question: 'The “var” and “function” are __________',
        options: ['Keywords', 'Declaration statements', 'Data types', 'Prototypes'],
        answer: 'Declaration statements'
    },

    {
        question: 'The statement a===b refers to _________',
        options: ['Both a and b are equal in value', 'type and reference address', 'Both a and b are equal in value', 'Both a and b are equal in value and type', 'There is no such statement'],
        answer: 'Both a and b are equal in value and type'
    },

    {
        question: 'When does the function name become optional in JavaScript?',
        options: ['When the function is defined as a looping statement', 'When the function is defined as expressions', 'When the function is predefined', 'when the function is called'],
        answer: 'When the function is defined as expressions'
    },

    {
        question: 'What is the purpose of a return statement in a function?',
        options: ['Returns the value and continues executing rest of the statements if any', 'Returns the value and stops the program', 'Stops executing the function', 'Stops executing the function and returns the value'],
        answer: 'Stops executing the function and returns the value'
    },

    {
        question: 'Which keyword is used to define the function in JavaScript?',
        options: ['void', 'int', 'function', 'main'],
        answer: 'function'
    },

    {
        question: 'Which window object method is used to display a message in a dialog box?',
        options: ['alert()', 'prompt()', 'message()', 'console.log()'],
        answer: 'alert()'
    },

    {
        question: 'Which is the property that represents the content displayed in the window?',
        options: ['document', 'content', 'window', 'frame'],
        answer: 'document'
    },

    {
        question: 'How to pick a document element based on the value of its id attribute?',
        options: ['getElementsbyId()', 'getElementbyId()', 'getElementsbyId() and getElementbyId()', 'getElement()'],
        answer: 'getElementbyId()'
    },

    {
        question: 'The URL property belongs to which of the following object?',
        options: ['Document', 'Element', 'Location', 'Event'],
        answer: 'Document'
    },
];

//Global variables.
let timeLeft = 0;
let timeInterval;
let quizList;                                   //List of 5 question chosen randomly that are displayed in browser.
let correctAnswer;                              //Correct answer for the question displayed in browser.
let questionNumber;                             //Question number count.

//Gets elements from index file.
const viewScoresEl = document.getElementById('view-scores');
const timeEl = document.getElementById('time');
const timeRemainingEl = document.getElementById('time-remaining');
const startButtonEl = document.getElementById('start-button');
const contentEL = document.getElementById('content');

init();

//Event listener for start button.
startButtonEl.addEventListener('click', function(){

    // //Hides header, paragrapg and start quiz buttton.
    removeContentElements();

    //Hides view highscore text.
    viewScoresEl.style.visibility = hiddenElement;

    //Makes the remaining time text visible and sets the initial time to time allowed.
    timeEl.style.visibility = visibleElement;
    timeRemainingEl.textContent = timeAllowed;

    //Sets the initial value to 0, which displays the first question.
    questionNumber = 0;

    // Starts the timer.
    startTimer();

    //Gets list of 5 questions randomly from all questions list.
    quizList = getQuizList();

    //Displays first question in browser.
    displayQuestionInBrowser(questionNumber);

    //Increments the question counter.
    questionNumber++;
});

//Event listener when 'View Highscores' text is clicked.
viewScoresEl.addEventListener('click', function(){

    //Remove all chile elements from content element.
    removeContentElements();

    //Displays high scores from local storage.
    displayHighScores();
});

//Event listener for container element.
contentEL.addEventListener('click', function(event){

    //Gets the clicked element.
    let selectedOptionEl = event.target;

    //If clicked element is a list (option of the question), displays a result and processes next question.
    if(selectedOptionEl.nodeName.toLowerCase() === 'li') {
        processQuestionOption(selectedOptionEl);
    }

    //If sumbit button is selected then result is displayed.
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id === submitButtonID){

        //Submits the result and updates the local storage. Also displays high scores from local storage.
        submitResult();
    }

    //If go back button is clicked, reloads the page.
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id === goBackButtonID){
        window.location.reload();
    }

    //if clear high score button is clicked, removes all local storage.
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id === clearScoreButtonID){
        removeLocalStorage();
    }
});

//Removes all local storage for the game.
function removeLocalStorage(){

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);

    //Loops through all keys and removes them from local storage.
    for (let i = 0; i < keys.length; i++) localStorage.removeItem(keys[i]);

    //Gets all direct children elements of content element.
    let contentChilren = contentEL.children;

    //Loops through all children and removes high score unordered list element.
    for (let i = 0; i < contentChilren.length; i++){
        if(contentChilren[i].nodeName.toLowerCase() === 'ul') {
            contentChilren[i].remove();
            i--;
        }
    }
}

//Submits the result and updates the local storage. Also displays high scores from local storage.
function submitResult(){

    //Gets the initial typed by the user. Exits the function if textbox is blank.
    let userInitialTBEl = document.getElementById(userInitialID);
    let userInitial = userInitialTBEl.value;
    if(userInitial === '') return null;

    //Hide result elements.
    removeContentElements();

    //Gets the storage counter for current result.
    let storageCounter = getStorageCounter();

    //Stores current result to localstoraget.
    storeCurrentResultToLocalStorage(storageCounter, userInitial);

    //Displays high scores from local storage.
    displayHighScores();
}

function displayHighScores(){

    //Gets all local storage for the quiz game.
    let quizStorage = getQuizStorage();

    contentEL.style.width = 'auto';

    //Creates h2 element and set its text to 'Highscores' and class to 'question-heading' class.
    let viewScoreEl = document.createElement('h2');
    viewScoreEl.textContent = 'Highscores';
    viewScoreEl.className = questionHeadingClass;
    contentEL.appendChild(viewScoreEl);

    //Creates un-ordered list element to display high scores.
    let ulEl = document.createElement('ul');

    //Loops thorugh local storage and creates list element for each score.
    //Adds these list elements to un-ordered list element.
    for (let i = 0; i < quizStorage.length; i++) {

        let optionEl = document.createElement('li');
        optionEl.className = 'highscore';

        //Sets background color for even number elements.
        if(i % 2 === 0) optionEl.style.backgroundColor= 'rgb(242, 238, 248)';

        optionEl.textContent = `${i + 1}. ${quizStorage[i].initial} - ${quizStorage[i].score}`;

        ulEl.appendChild(optionEl);
    }
    //Appends un-ordered list element to content element.
    contentEL.appendChild(ulEl);

    //Creates go back button.
    let gobackButtonEl = document.createElement('button');
    gobackButtonEl.innerHTML = 'Go Back';
    gobackButtonEl.style.border = displayNone;
    gobackButtonEl.classList.add(optionClass, handClass);
    gobackButtonEl.style.margin= highscoreButtonMargin;
    gobackButtonEl.id = goBackButtonID;
    contentEL.appendChild(gobackButtonEl);

    //Creates clear highscores button.
    let clearScoreButtonEl = document.createElement('button');
    clearScoreButtonEl.innerHTML = 'Clear Highscores';
    clearScoreButtonEl.style.border = displayNone;
    clearScoreButtonEl.classList.add(optionClass, handClass);
    clearScoreButtonEl.style.margin= highscoreButtonMargin;
    clearScoreButtonEl.id = clearScoreButtonID;
    contentEL.appendChild(clearScoreButtonEl);
}

//Gets all local storage for the quiz game.
function getQuizStorage(){

    let quizStorage = [];

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);

    //Loops through all keys and gets the key pair.
    for (let i = 0; i < keys.length; i++) {

        //Only processes key if it includes the word 'quizscore-'.
        if(keys[i].includes(scoreKey)) {

            //Gets the key pair object and adds it to an array.
            let storage = JSON.parse(localStorage.getItem(keys[i]));
            if(storage !== null) quizStorage.push(storage);
        }
    }

    //Returns the storage in descending order by score.
    return quizStorage.sort(({score:lowScore}, {score:highScore}) => highScore-lowScore);
}

//Stores current result to localstorage and returns it as an object.
function storeCurrentResultToLocalStorage(storageCounter, userInitial){

    //Creates oject for current result.
    let currentResult = {
        initial: userInitial,
        score: timeLeft < 0 ? 0: timeLeft
    };

    //Creates key.
    let key = scoreKey + storageCounter;

    //Stores current result to local storage.
    localStorage.setItem(key, JSON.stringify(currentResult));
}

//Gets the storage counter for current result.
//This is done by getting all keys for the quiz game, finding the last counter and incrementing it.
function getStorageCounter(){

    let counter = 0;

    //Gets all keys from local storage.
    let keys = Object.keys(localStorage);

    //Loops through all keys and gets the key pair.
    for (let i = 0; i < keys.length; i++){

        //Only processes key if it includes the word 'quizscore-'.
        //Compares the localstorage counter and stores the max value.
        if(keys[i].includes(scoreKey)){
            let number = parseInt(keys[i].replace(scoreKey, '', 10));

            if(number > counter) counter = number;
        }
    }

    return counter + 1;
}

//When one of the option from question is clicked, displays the result and processes next question.
function processQuestionOption(selectedOptionEl){
    //Gets the user selected option.
    let userAnswer = selectedOptionEl.textContent;

    //Removes the option number and space.
    userAnswer = userAnswer.substring(userAnswer.indexOf(' ') + 1);

    //Creates a div element to display the result as correct or incorrect.
    let resultEl = document.createElement('div');

    //Checks whether user selected option is a correct answer or not.
    //If the option is correct, displays the result as correct in green color.
    if(correctAnswer === userAnswer){
        resultEl.textContent = 'Correct!';
        resultEl.style.color ='green';
    }

    //If the option is incorrect, displays the result as incorrect with red color.
    else{

        //Deducts 15 seconds from time remaining time if the selected option is incorrect.
        timeLeft -= timeDeduction;  
        resultEl.textContent = 'Incorrect!';
        resultEl.style.color ='red';
    }

    //Adds the div element to contect element to display it in browser.
    contentEL.appendChild(resultEl);

    //Pauses the process for half a second.
    //This will allow the user to see the result before current question elements are removed from the browser and
    //displaying the next question elements.
    setTimeout(() => {processNextQuestion()}, 500);
}

//Removes the current question elements from browser and displays next question elements in browser.
//Displays final score if all 5 questions are processed.
function processNextQuestion(){

    //Removes current question elements from browser.
    removeContentElements();

    //Displays result if all 5 questions are processed or timer reaches 0.
    if(questionNumber == totalQuestions || timeLeft <= 0){

        //Stops the timer.
        clearInterval(timeInterval);

        //Displays results.
        displayResult();
    }
    else{
        //Displays the next question in browser.
        displayQuestionInBrowser(questionNumber);

        //Increments the question counter.
        questionNumber++;
    }
}

//Displays results.
function displayResult(){

    //Hides remaining time text.
    timeEl.style.display = displayNone;

    //Makes view high score text visible.
    viewScoresEl.style.visibility = visibleElement;

    //Creates h2 header.
    let resultHeadingEl = document.createElement('h2');
    resultHeadingEl.textContent = 'All done!';
    resultHeadingEl.className = questionHeadingClass;
    contentEL.appendChild(resultHeadingEl);

    //Creates div element and dispaly result score.
    //Set bottom marning to 1rem.
    let resultMessageEl = document.createElement('div');

    //Displays score as time remaining. If the time is less than 0 then shows the score as 0.
    resultMessageEl.textContent = `Your final score: ${timeLeft < 0 ? 0: timeLeft}.`
    resultMessageEl.style.marginBottom = oneRemSpace;
    contentEL.appendChild(resultMessageEl);

    //Creates a div element that contains initial text, textbox to enter initial and submit button.
    let initialContainerEl = document.createElement('div');

    //Creates div element to show initial text.
    //Sets display style to inline.
    let initialEl = document.createElement('div');
    initialEl.textContent = 'Enter initials: ';
    initialEl.style.display = 'inline';
    initialContainerEl.appendChild(initialEl);

    //Creates textbox element to enter initial.
    let initialInputEl = document.createElement('INPUT');
    initialInputEl.setAttribute('type', 'text');
    initialInputEl.id = userInitialID;
    initialContainerEl.appendChild(initialInputEl);

    //Create buttom element for submision.
    //Sets left margin to 1rem, border to none.
    //Adds 'option' and 'hand' classes.
    let submitButtonEl = document.createElement('button');
    submitButtonEl.innerHTML = 'Submit';
    submitButtonEl.style.border = displayNone;
    submitButtonEl.style.marginLeft= oneRemSpace;
    submitButtonEl.classList.add(optionClass, handClass);
    submitButtonEl.id = submitButtonID;
    initialContainerEl.appendChild(submitButtonEl);

    //Appends the elements to parent div element.
    contentEL.appendChild(initialContainerEl);
}

//Removes all children from content element and clears the page.
function removeContentElements(){

    //Gets all direct children elements of content element.
    let contentChildren = contentEL.children;

    //Loops through all children and removed them from content element and makes the page clear.
    for (let i = 0; i < contentChildren.length; i++){
         contentChildren[i].remove();
         i--;
    }
}

//Displays question and options in browser for specified index.
function displayQuestionInBrowser(index){

    //Gets the object at specified index from all questions array.
    let quiz = quizList[index];

    //Gets the correct answer for the question.
    //This will be used to check whether user has clicked on correct option or not.
    correctAnswer = quiz.answer;

    //Creates the question as h2 element and set its text and class to 'question-heading' class.
    let questionEl = document.createElement('h2');
    questionEl.textContent = `${index + 1}. ${quiz.question}`;
    questionEl.className = questionHeadingClass;
    contentEL.appendChild(questionEl);

    //Creates un-ordered list element for options for the question.
    let optionsEl = document.createElement('ul');

    //Loops thorugh the options and creates list element for each option and set its text and class to 'option' class.
    //Adds these lis elements to un-ordered list element.
    for (let i = 0; i < quiz.options.length; i++) {

        let optionEl = document.createElement('li');
        optionEl.classList.add(optionClass, handClass);

        optionEl.textContent = `${i + 1}. ${quiz.options[i]}`;

        optionsEl.appendChild(optionEl);
    }

    //Appends un-ordered list element to content element.
    contentEL.appendChild(optionsEl);
}

//Gets list of 5 questions randomly from all questions list.
function getQuizList(){
    let quizList = [];

    do{
        //Randomly gets the question from all questions array.
        let randomQuiz = allQuestions[Math.floor(Math.random() * allQuestions.length)];

        //Checks whether current question is already added to the list or not. Only adds unique questions.
        if(!quizList.includes(randomQuiz)){
            quizList.push(randomQuiz);
        }

    }while(quizList.length <= totalQuestions)

    return quizList;
}

//Starts the timer function.
function startTimer(){
    timeLeft = timeAllowed;
    
    timeInterval = setInterval(function () {

        //Sets the new time value.
        timeRemainingEl.textContent = timeLeft;
        timeLeft--;
        
        //Stops the timer and displays score as 0.
        if(timeLeft <= 0){

            //Stops the timer.
            clearInterval(timeInterval);

            //Removes current question elements from browser.
            removeContentElements();

            //Displays results.
            displayResult();
        }
    }, 1000);    
}

// The init() function fires when the page is loaded.
function init(){

    //Hides the remaining time when page loads.
    timeEl.style.visibility = hiddenElement;
}