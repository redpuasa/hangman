var word = [
["eagles","nickleback","acdc","steelheart"],
["joker","superman","ironman","thanos","wolverine","riddler"],
["tiyah","mina","mateen","hazman","jannat","fatin"],
["nissan","toyota","jaguar","kia","mercedes","bugatti"],
["pichu","charizard","greninja","beedrill","alakazam","articuno"]
];


var hint = [
["hotel california","lullaby","highway to hell","she's gone"],

["villan from dc","strongest man ","richest man in marvel","find me the rings","a man with metal claws","you like riddles? riddle me this~"],
["Recap","Recap","one of the TA","one of the TA","we meet everyday until Friday","Recap"],
["R33? R35?","supra","one of the luxury car brand","one of car brand from south korea","one of the luxury car brand","supercar"],
["cute little yellow mouse","a pokemon with fire on his tail","ninja style pokemon","is it honey? maybe no..","psychic? let me bend that spoons","blue legendary bird"]
];

var category = ["Rock Band", "Comic Characters", "Coding.BN", "Car Brand", "Pokemon"];

var winAudio = new Audio("audio/win.mp3");
var loseAudio = new Audio("audio/lose.mp3");

let answer = "";
let live = 5;
let question = [];
let wordStatus = null;
  
function randomWord(){
  let scate = [Math.floor(Math.random() * category.length)];
  let shint = [Math.floor(Math.random() * hint[scate].length)];
  let test = [Math.floor(Math.random() * word[scate].length)];
  answer = word[scate][test].toUpperCase();
    
  //console.log(word[scate][test]);
  //console.log(hint[scate][test]);
  
  //display the category and hint
  document.getElementById("category").innerHTML = category[scate].toUpperCase();
  
  document.getElementById("hint").innerHTML = hint[scate][test].toUpperCase();
}

//QWERTYUIOPASDFGHJKLZXCVBNM || ABCDEFGHIJKLMNOPQRSTUVWXYZ
function alphaButton() {
  let button = "QWERTYUIOPASDFGHJKLZXCVBNM".split("").map(chars =>
    `
      <button
        class="btn m-2 text-center"
        id='` + chars + `'
        onClick="handleGuess('` + chars + `')"
      >
        ` + chars + `
      </button>
    `).join("");

  document.getElementById("button").innerHTML = button;
}

function handleGuess(chosenLetter) {
  question.indexOf(chosenLetter) === -1 ? question.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute("disable", true);
  
  if (answer.indexOf(chosenLetter) >= 0) {
    document.getElementById(chosenLetter).style.backgroundColor = "rgb(0, 153, 51)";
    guessedWord();
    gameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    document.getElementById(chosenLetter).style.backgroundColor = "rgb(153, 0, 0)";
    live--;
    chances();
    gameLost();
    
  }
}

function gameWon() {
  if (wordQuest === answer) {
    document.getElementById("button").innerHTML = "You Win!";
    winAudio.play();
  }
}

function gameLost() {
  if (live === 0) {
    document.getElementById("word").innerHTML = "The answer was: " + answer;
    document.getElementById("button").innerHTML = "You Lost!";
    loseAudio.play();
  }
}

function guessedWord() {
  wordQuest = answer.split("").map(letter => (question.indexOf(letter) >= 0 ? letter : " _ ")).join("");
  document.getElementById("word").innerHTML = wordQuest; 
}

function chances() {
  document.getElementById("liveDisplay").innerHTML = live;
}

let clear = document.getElementById("clear");
function reset() {
  live = 5;
  question = [];
  randomWord();
  guessedWord();
  chances();
  alphaButton();
}

clear.addEventListener("click",reset);
randomWord();
alphaButton();
guessedWord();