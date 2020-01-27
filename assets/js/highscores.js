var myObj = JSON.parse(localStorage.getItem('myObj'));
var scores = document.querySelector("#scores");
var initials = document.querySelector("#initials");

printList(myObj.highscoreInitials, initials);
printList(myObj.highscoreScores, scores);

function printList(arr, place) {
    for(i=0; i < arr.length; i++) {
        var newLi = document.createElement("li");
        newLi.innerHTML = arr[i];
        place.appendChild(newLi);

    }
}