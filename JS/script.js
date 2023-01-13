const timeAllowed = 75;                                         
const timeDeduction = 15;                                      
const totalQuestions = 5;                                       
const hiddenElement = 'hidden';                                 
const visibleElement = 'visible';                               
const displayNone = 'none';                                     
const oneRemSpace = '1rem';                                     
const scoreKey ='quizscore-';                                   
const userInitialID = 'user-initial';                          
const submitButtonID= 'submit-button';                          
const goBackButtonID = 'go-back';                               
const clearScoreButtonID= 'clear-score';                        
const highscoreButtonMargin = '1rem 0.5rem 0.5rem 0.5rem';     
const questionHeadingClass = 'question-heading';                
const optionClass = 'option';                                  
const handClass = 'hand';                                       


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


let timeLeft = 0;
let timeInterval;
let quizList;                                   
let correctAnswer;                              
let questionNumber;                             


const viewScoresEl = document.getElementById('view-scores');
const timeEl = document.getElementById('time');
const timeRemainingEl = document.getElementById('time-remaining');
const startButtonEl = document.getElementById('start-button');
const contentEL = document.getElementById('content');

init();


startButtonEl.addEventListener('click', function(){

   
    removeContentElements();

  
    viewScoresEl.style.visibility = hiddenElement;

    
    timeEl.style.visibility = visibleElement;
    timeRemainingEl.textContent = timeAllowed;

    
    questionNumber = 0;

    
    startTimer();

    
    quizList = getQuizList();

    
    displayQuestionInBrowser(questionNumber);

    
    questionNumber++;
});


viewScoresEl.addEventListener('click', function(){

    
    removeContentElements();

    
    displayHighScores();
});


contentEL.addEventListener('click', function(event){

    
    let selectedOptionEl = event.target;

    
    if(selectedOptionEl.nodeName.toLowerCase() === 'li') {
        processQuestionOption(selectedOptionEl);
    }

    
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id === submitButtonID){

        
        submitResult();
    }

    
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id === goBackButtonID){
        window.location.reload();
    }

    
    else if (selectedOptionEl.nodeName.toLowerCase() === 'button' && selectedOptionEl.id === clearScoreButtonID){
        removeLocalStorage();
    }
});


function removeLocalStorage(){

    
    let keys = Object.keys(localStorage);

    
    for (let i = 0; i < keys.length; i++) localStorage.removeItem(keys[i]);

    
    let contentChilren = contentEL.children;

    
    for (let i = 0; i < contentChilren.length; i++){
        if(contentChilren[i].nodeName.toLowerCase() === 'ul') {
            contentChilren[i].remove();
            i--;
        }
    }
}


function submitResult(){

    let userInitialTBEl = document.getElementById(userInitialID);
    let userInitial = userInitialTBEl.value;
    if(userInitial === '') return null;

    
    removeContentElements();

    
    let storageCounter = getStorageCounter();

    
    storeCurrentResultToLocalStorage(storageCounter, userInitial);

    
    displayHighScores();
}

function displayHighScores(){

    
    let quizStorage = getQuizStorage();

    contentEL.style.width = 'auto';

    
    let viewScoreEl = document.createElement('h2');
    viewScoreEl.textContent = 'Highscores';
    viewScoreEl.className = questionHeadingClass;
    contentEL.appendChild(viewScoreEl);

    
    let ulEl = document.createElement('ul');

    
    
    for (let i = 0; i < quizStorage.length; i++) {

        let optionEl = document.createElement('li');
        optionEl.className = 'highscore';

        
        if(i % 2 === 0) optionEl.style.backgroundColor= 'rgb(242, 238, 248)';

        optionEl.textContent = `${i + 1}. ${quizStorage[i].initial} - ${quizStorage[i].score}`;

        ulEl.appendChild(optionEl);
    }
    
    contentEL.appendChild(ulEl);

    
    let gobackButtonEl = document.createElement('button');
    gobackButtonEl.innerHTML = 'Go Back';
    gobackButtonEl.style.border = displayNone;
    gobackButtonEl.classList.add(optionClass, handClass);
    gobackButtonEl.style.margin= highscoreButtonMargin;
    gobackButtonEl.id = goBackButtonID;
    contentEL.appendChild(gobackButtonEl);

    
    let clearScoreButtonEl = document.createElement('button');
    clearScoreButtonEl.innerHTML = 'Clear Highscores';
    clearScoreButtonEl.style.border = displayNone;
    clearScoreButtonEl.classList.add(optionClass, handClass);
    clearScoreButtonEl.style.margin= highscoreButtonMargin;
    clearScoreButtonEl.id = clearScoreButtonID;
    contentEL.appendChild(clearScoreButtonEl);
}


function getQuizStorage(){

    let quizStorage = [];

    
    let keys = Object.keys(localStorage);

    
    for (let i = 0; i < keys.length; i++) {

        
        if(keys[i].includes(scoreKey)) {

            
            let storage = JSON.parse(localStorage.getItem(keys[i]));
            if(storage !== null) quizStorage.push(storage);
        }
    }

    
    return quizStorage.sort(({score:lowScore}, {score:highScore}) => highScore-lowScore);
}


function storeCurrentResultToLocalStorage(storageCounter, userInitial){

    
    let currentResult = {
        initial: userInitial,
        score: timeLeft < 0 ? 0: timeLeft
    };

    
    let key = scoreKey + storageCounter;

    
    localStorage.setItem(key, JSON.stringify(currentResult));
}


function getStorageCounter(){

    let counter = 0;

    
    let keys = Object.keys(localStorage);

    
    for (let i = 0; i < keys.length; i++){

        
        if(keys[i].includes(scoreKey)){
            let number = parseInt(keys[i].replace(scoreKey, '', 10));

            if(number > counter) counter = number;
        }
    }

    return counter + 1;
}


function processQuestionOption(selectedOptionEl){
    
    let userAnswer = selectedOptionEl.textContent;

    
    userAnswer = userAnswer.substring(userAnswer.indexOf(' ') + 1);

    
    let resultEl = document.createElement('div');

    
    if(correctAnswer === userAnswer){
        resultEl.textContent = 'Correct!';
        resultEl.style.color ='green';
    }

    
    else{

        
        timeLeft -= timeDeduction;  
        resultEl.textContent = 'Incorrect!';
        resultEl.style.color ='red';
    }

    
    contentEL.appendChild(resultEl);

    
    setTimeout(() => {processNextQuestion()}, 500);
}


function processNextQuestion(){

    
    removeContentElements();

    
    if(questionNumber == totalQuestions || timeLeft <= 0){

        
        clearInterval(timeInterval);

       
        displayResult();
    }
    else{
        
        displayQuestionInBrowser(questionNumber);

       
        questionNumber++;
    }
}


function displayResult(){

    
    timeEl.style.display = displayNone;

    
    viewScoresEl.style.visibility = visibleElement;

    
    let resultHeadingEl = document.createElement('h2');
    resultHeadingEl.textContent = 'All done!';
    resultHeadingEl.className = questionHeadingClass;
    contentEL.appendChild(resultHeadingEl);

    
    let resultMessageEl = document.createElement('div');

    
    resultMessageEl.textContent = `Your final score: ${timeLeft < 0 ? 0: timeLeft}.`
    resultMessageEl.style.marginBottom = oneRemSpace;
    contentEL.appendChild(resultMessageEl);

    
    let initialContainerEl = document.createElement('div');

    
    let initialEl = document.createElement('div');
    initialEl.textContent = 'Enter initials: ';
    initialEl.style.display = 'inline';
    initialContainerEl.appendChild(initialEl);

    
    let initialInputEl = document.createElement('INPUT');
    initialInputEl.setAttribute('type', 'text');
    initialInputEl.id = userInitialID;
    initialContainerEl.appendChild(initialInputEl);

    
    let submitButtonEl = document.createElement('button');
    submitButtonEl.innerHTML = 'Submit';
    submitButtonEl.style.border = displayNone;
    submitButtonEl.style.marginLeft= oneRemSpace;
    submitButtonEl.classList.add(optionClass, handClass);
    submitButtonEl.id = submitButtonID;
    initialContainerEl.appendChild(submitButtonEl);

    
    contentEL.appendChild(initialContainerEl);
}


function removeContentElements(){

    
    let contentChildren = contentEL.children;

    
    for (let i = 0; i < contentChildren.length; i++){
         contentChildren[i].remove();
         i--;
    }
}


function displayQuestionInBrowser(index){

    
    let quiz = quizList[index];

    
    correctAnswer = quiz.answer;

    
    let questionEl = document.createElement('h2');
    questionEl.textContent = `${index + 1}. ${quiz.question}`;
    questionEl.className = questionHeadingClass;
    contentEL.appendChild(questionEl);

    
    let optionsEl = document.createElement('ul');

    
    for (let i = 0; i < quiz.options.length; i++) {

        let optionEl = document.createElement('li');
        optionEl.classList.add(optionClass, handClass);

        optionEl.textContent = `${i + 1}. ${quiz.options[i]}`;

        optionsEl.appendChild(optionEl);
    }

    
    contentEL.appendChild(optionsEl);
}


function getQuizList(){
    let quizList = [];

    do{
        
        let randomQuiz = allQuestions[Math.floor(Math.random() * allQuestions.length)];

        
        if(!quizList.includes(randomQuiz)){
            quizList.push(randomQuiz);
        }

    }while(quizList.length <= totalQuestions)

    return quizList;
}


function startTimer(){
    timeLeft = timeAllowed;
    
    timeInterval = setInterval(function () {

       
        timeRemainingEl.textContent = timeLeft;
        timeLeft--;
        
       
        if(timeLeft <= 0){

            
            clearInterval(timeInterval);

           
            removeContentElements();

            
            displayResult();
        }
    }, 1000);    
}


function init(){

    
    timeEl.style.visibility = hiddenElement;
}