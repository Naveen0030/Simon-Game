// step 1
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClicked = [];

//Step 7
var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//step 5
$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClicked.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClicked.length - 1);
});

function checkAnswer(currLevel) {
    if(gamePattern[currLevel] === userClicked[currLevel]) {
        if (userClicked.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        } , 200);

        startOver();
    }
}

function nextSequence(){
    //step 7
    userClicked = [];
    level++;
    $("#level-title").text("Level " + level);

    //step1
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //step2
    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currColour){
    $("#" + currColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currColour).removeClass("pressed");
    } , 100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }