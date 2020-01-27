var timer = document.querySelector("#timer");
var game = document.querySelector(".game");

var q1 = {
    question: "Commonly used data types DO NOT include:",
    answers: {
        string: ["Strings", "Booleans", "Alerts", "Numbers"],
        boolean: [ false, false, true, false]   
    } 
}
var q2 = {
    question: "The condition in an if / else statement is enclosed within _________.",
    answers: {
        string: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
        boolean: [ false, false, true, false]   
    }
}
var q3 = {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: {
        string: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        boolean: [ false, false, false, true]   
    }
}
var q4 = {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: {
        string: ["Commas", "Quotes", "Curly Brackets", "Parentheses"],
        boolean: [ false, true, false, false]   
    }
}
var q5 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: {
        string: ["JavaScript", "Terminal/Bash", "For Loops", "Console.Log"],
        boolean: [ false, false, false, true]   
    }
}

var questions = [ q1, q2, q3, q4, q5 ];


var myObj = JSON.parse(localStorage.getItem('myObj'));

if(myObj===null){
    myObj = {
        highscoreInitials: [],
        highscoreScores:[]
    };
    localStorage.setItem("myObj", JSON.stringify(myObj));
}

console.log(myObj);

var questionNumber = 0;

function createQuestion(questionNumber) {
    var activeQuestion = document.createElement("h1");
    activeQuestion.innerHTML = questions[questionNumber].question;
    game.appendChild(activeQuestion);
    for(i = 0; i < 4; i++) {
        var option = document.createElement("button");
        option.setAttribute("class", "btn")
        option.innerHTML = questions[questionNumber].answers.string[i];
        if(questions[questionNumber].answers.boolean[i]) {
            option.setAttribute("data-true", true);
        } else {
            option.setAttribute("data-true", false);
        }
        game.appendChild(option);
    }
}

var welcome = document.createElement("h1");
welcome.innerHTML = "Coding Quiz Challenge";
var description = document.createElement("h3");
description.innerHTML = "Try to answer the following code-related questions within the time limit.  Keep in mind that incorrect answers will penalize you by subtracting from your remaining time.";
var startButton = document.createElement("button");
startButton.innerHTML = "Begin!";
startButton.setAttribute("class", "btn");
startButton.setAttribute("data-start", "start")
game.appendChild(welcome);
game.appendChild(description);
game.appendChild(startButton);

game.addEventListener("click", function(event) {
    if(event.target.matches("button")) {
        if(event.target.getAttribute("data-start")==="start") {
            game.innerHTML = "";
            event.preventDefault();
            createQuestion(0);
            setTime();
        }
    }
})

var wins = 0;
var score = 0;

game.addEventListener("click", function(event) {
    if(event.target.matches("button")) {
        game.innerHTML = "";
        event.preventDefault();
        if(event.target.getAttribute("data-start")!=="start") {
            questionNumber = questionNumber + 1;
        }
        var id = event.target.getAttribute("data-true");
        if(id === "true") {
            console.log("Correct!");
            wins++;
        } else if (id === "false") {
            console.log("Incorrect!");
            secondsLeft = secondsLeft - 15;
        }
        if(questionNumber < 5) {
            createQuestion(questionNumber);
        } else {
            score = (wins * 10) + secondsLeft;
            var scoreDisplay = document.createElement("h1");
            scoreDisplay.innerHTML = "Score: " + score;
            console.log(score);
            game.appendChild(scoreDisplay);
            var initials = document.createElement("form");
            var entry = document.createElement("input");
            var save = document.createElement("input");
            entry.setAttribute("type", "text");
            entry.setAttribute("name", "entry");
            entry.setAttribute("placeholder", "Initials");
            // save.setAttribute("type", "submit");
            save.setAttribute("value", "Save");
            save.setAttribute("class", "btn");
            game.appendChild(initials);
            initials.appendChild(entry);
            initials.appendChild(save);
            var userInitials = document.querySelector("input[name=entry]");
            localStorage.setItem("score", score);
            

            save.addEventListener("click", function() {
                event.preventDefault(); //this makes it not behave as default
                console.log(userInitials.value);
                var highscores = userInitials.value + score;
                localStorage.setItem("initials", userInitials.value);
                localStorage.setItem("highscores", highscores);
                myObj = JSON.parse(localStorage.getItem('myObj'));
                myObj.highscoreInitials.push(userInitials.value);
                myObj.highscoreScores.push(score);
                localStorage.setItem("myObj", JSON.stringify(myObj));
            })

            
        }
    }
    

})

var secondsLeft = 75;

function setTime() {
    if(secondsLeft > 0) {
        var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "Timer: " + secondsLeft + " seconds left";

        if(secondsLeft === 0) {
        clearInterval(timerInterval);
         }

        }, 1000);
}
}




// function setScores() {
//     myObj = JSON.parse(localStorage.getItem('myObj'));
//     myObj.highscoreInitials.push(userInitials.value);
//     myObj.highscoreScores.push(score);
//     localStorage.setItem("myObj", JSON.stringify(myObj));
// }