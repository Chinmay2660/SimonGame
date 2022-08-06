var buttonColors = ["red", "blue", "green", "yellow"]; // array of colors
var gamePattern = []; // empty the gamePattern array
var userClickedPattern = []; // empty the userClickedPattern array
var level = 0; // set the level to 0
var started = false; // set the started variable to false

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level); // set the level title to level 0
    nextSequence(); // call the nextSequence function
    started = true; // set the started variable to true
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // get the id of the button clicked
  userClickedPattern.push(userChosenColor); // push the id of the button clicked to the userClickedPattern array
  playSound(userChosenColor); // play the sound of the button clicked
  animatePress(userChosenColor); // animate the button clicked
  checkAnswer(userClickedPattern.length - 1); // check the answer
});

function nextSequence() {
  userClickedPattern = []; // empty the userClickedPattern array
  level++; // increase the level by 1
  $("#level-title").text("Level " + level); // update the h1 text to "Level " + level
  var randomNumber = Math.floor(Math.random() * 4); // 0, 1, 2, 3
  var randomChosenColor = buttonColors[randomNumber]; // 'red', 'blue', 'green', 'yellow'
  gamePattern.push(randomChosenColor); // push the randomChosenColor to the gamePattern array
  $("#" + randomChosenColor) // select the button with the same id as the randomChosenColour
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // animate the randomChosenColor
  playSound(randomChosenColor); // play the sound of the randomChosenColor
  // animatePress(randomChosenColor); // animate the randomChosenColor
  // var audio = new Audio("sounds/" + randomChosenColour + ".mp3"); // create a new audio object
  // audio.play(); // play the audio object
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // if the gamePattern and userClickedPattern are the same
    // console.log("success"); // log success
    if (userClickedPattern.length === gamePattern.length) {
      // if the userClickedPattern length is equal to the gamePattern length
      setTimeout(function () {
        nextSequence(); // call the nextSequence function
      }, 1000);
    }
  } else {
    // console.log("wrong"); // log wrong
    playSound("wrong"); // play the wrong sound
    $("body").addClass("game-over"); // add the game-over class to the body
    $("#level-title").text("Game Over, Press Any Key to Restart"); // update the h1 text to "Game Over, Press Any Key to Restart"
    setTimeout(function () {
      $("body").removeClass("game-over"); // remove the game-over class to the body
    }, 200);
    startOver(); // call the startOver function
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // create a new audio object
  audio.play(); // play the audio object
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // add the pressed class to the button clicked
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // remove the pressed class to the button clicked
  }, 100);
}

function startOver() {
  level = 0; // set the level to 0
  gamePattern = []; // empty the gamePattern array
  started = false; // set the started variable to false
}
