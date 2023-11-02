
// I'm gonna use percentage instead of pixels for collisions and movement
// This isn't a serious project; just coding for fun this evening. 10-31-2023


//ChangeLog:

//Platforms spawn in without overflowing, and CSS is pulled directly from the game board itself dynamically

// Update:
// Elemenents will be assigned percentage position values in CSS rather than pixels.
// These percentage values will be pulled and compared in pixel format in JS however.


platformArray =[];
PlatformCount = 20;



platformMinWidth = 1;
platformMinHeight = 1;

platformMaxWidth = 10 - platformMinWidth; 
platformMaxHeight = 10 - platformMinHeight;

gravity = 0.3; // speed that the player falls at.
playerVelocity = 0.3; // speed that the player walks at.

player = ""; // Will store the player object

playerX = 0;
playerY = 0;

jumpMax = 8; // The starting jump velocity for each jump

jumpVelocity = jumpMax; // The initial strength of the jump. To be decreased each frame.


gameBoard = document.getElementById("gameBoard");

movingLeft = false;
movingRight = false;






function generatePlayer(){

    newPlayer = document.createElement("div");
    newPlayer.className += "player";

    player = newPlayer;
    gameBoard.appendChild(newPlayer);
}

function generatePlatforms(){

    for(i=0;i<PlatformCount;i++){

    newPlat = document.createElement('div');


    newPlat.className += "platform";

    platHeight = platformMinHeight + (Math.random()*platformMaxHeight);

    platWidth = platformMinWidth + (Math.random()*platformMaxHeight);


    newPlat.style.width =  platWidth + "px";
    newPlat.style.height = platHeight + "px";





    

    newPlat.style.top = Math.random()*(100-platHeight) + "%"; //Makes the random range anywhere on the board, without overflowing
    newPlat.style.left= Math.random()*(100-platWidth) + "%";
    
    
    newPlat.style.backgroundColor= "green";
    platformArray[i] =newPlat;

    gameBoard.appendChild(newPlat);
    
    //alert(style);
    }

}


function checkCollision(){
    // I'm not sure how efficient this will be, but I'm going to try it for now. This way I can use only one array containing the objects, and pull their CSS values as needed.
    // Usually I just create 3 arrays: one for the obejects, one for their X cordinates, and one for their Y cordinates.
    // Just trying this method for fun. It may not technically be better.




            // First we get the values from CSS and cleanly make them integers
            playerHeightCompare = window.getComputedStyle(player).height; // Returns player height, but as a string with decimal and "px" on it as well.
            playerHeightCompare = playerHeightCompare.replace("px",""); // Gets rid of the "px"
            playerHeightCompare = parseInt(playerHeightCompare); // Turns it into a clean integer from a string
    
            // Do this 4 times for each; to get: Player Width, Height, X & Y values
    
            playerWidthCompare = window.getComputedStyle(player).width;
            playerWidthCompare = playerWidthCompare.replace("px","");
            playerWidthCompare = parseInt(playerWidthCompare);


            //Even though we have a "player X" and "Player Y" value already, that is in percentage. We need to grab the corresponding pixel value to get the comparison
            playerXCompare = window.getComputedStyle(player).left;
            playerXCompare = playerXCompare.replace("px","");
            playerXCompare = parseInt(playerXCompare);
    
            playerYCompare = window.getComputedStyle(player).top;
            playerYCompare = playerYCompare.replace("px","");
            playerYCompare = parseInt(playerYCompare);

    // Then we compare this to the platform's CSS values too.
    for(i=0; i<platformArray.length;i++){
           
            currentPlatform = platformArray[i];
            platformHeightCompare = window.getComputedStyle(currentPlatform).height;
            platformHeightCompare = platformHeightCompare.replace("px",""); 
            platformHeightCompare = parseInt(platformHeightCompare);
    
            platformWidthCompare = window.getComputedStyle(currentPlatform).width; // This section needs working on next, has a couple bugs
            platformWidthCompare = platformWidthCompare.replace("px","");
            platformWidthCompare = parseInt(platformWidthCompare);
    
            platformXCompare = window.getComputedStyle(currentPlatform).left;
            platformXCompare = platformXCompare.replace("px","");
            platformXCompare = parseInt(platformXCompare);
    
            platformYCompare = window.getComputedStyle(currentPlatform).top;
            platformYCompare = platformYCompare.replace("px","");
            platformYCompare = parseInt(platformYCompare);


            if(playerXCompare+playerWidthCompare>platformXCompare && playerXCompare+playerWidthCompare<platformXCompare+platformWidthCompare){
                playerY = platformYCompare;
            }

    }
}


onkeydown = function(keyPressed){
    //key = event.keyCode;

    if (keyPressed.key == "d" || keyPressed.key =="D"){movingRight = true;}
    if (keyPressed.key == "a" || keyPressed.key =="A"){movingLeft = true;}
    if (keyPressed.key == "w" || keyPressed.key =="W"){}
}

onkeyup = function(keyPressed){
    if (keyPressed.key == "d" || keyPressed.key =="D"){movingRight = false}
    if (keyPressed.key == "a" || keyPressed.key =="A"){movingLeft = false;}
    if (keyPressed.key == "w" || keyPressed.key =="W"){}

}






function main(){




    if (movingRight == true){playerX+=playerVelocity;}
    if (movingLeft == true){playerX-=playerVelocity;}
    
    playerY+=gravity;



    player.style.top = playerY + "%";
    player.style.left = playerX + "%";


    checkCollision();
}


generatePlatforms();
generatePlayer();

setInterval (main,1000/30); // Sets the main function to run at 30fps