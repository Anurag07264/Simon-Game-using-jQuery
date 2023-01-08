var level=1;
var callCount=0;
var userClickedPattern=[];
var gamePattern=[];
var buttonColours =["red","blue","green","yellow"];

$("h1").text("Press a key to Start");

$(document).keypress(function (e) { 
    if(callCount<1)
    nextSequence();
});

$(".btn").click(function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkSequence(userClickedPattern.length-1);

});
 
function nextSequence(){
     userClickedPattern=[];
    $("h1").text("level "+level);
    level++;
    callCount++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

      
     $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomChosenColour);
       
}

function playSound(name){
    var audio=new Audio("sounds/"+name +".mp3");
    audio.play();
}

 function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
            $("#"+currentColour).removeClass('pressed');
            
    }, 100);
}

function checkSequence(currLevel){
    if(userClickedPattern[currLevel]===gamePattern[currLevel]){
        if(userClickedPattern.length===gamePattern.length)
        setTimeout(nextSequence(),1000);
       
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        playSound("wrong")
        $("h1").text("Wrong-Answer ,press any key to restart");
        startOver();
    }
   
}

function startOver(){
    level=1;
    gamePattern=[];
    userClickedPattern=[];
    callCount=0;
}