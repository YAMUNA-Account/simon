var gamePattern=[];
var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

var i=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+i);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    $("#level-title").text("Level "+i);
    i++;
    var randomNumber=Math.floor(Math.random()*4);

    var randomChoosen=buttonColors[randomNumber];

    gamePattern.push(randomChoosen);

    playSound(randomChoosen);
    
    $("#"+randomChoosen).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);//here 1000 represents the time delay it create for showing the next colour
    }
}
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("GAME OVER, PRESS ANY KEY TO RESTART");
        startOver();
    }

}

function startOver(){
    i=0;
    gamePattern=[];
    started=false;
}