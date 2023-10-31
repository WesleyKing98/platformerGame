
// I'm gonna use percentage instead of pixels for collisions and movement
// This isn't a serious project; just coding for fun this evening. 10-31-2023


//ChangeLog:

//Platforms spawn in without overflowing, and CSS is pulled directly from the game board itself dynamically

//Need to make it more percentage based than PX based. 
//Or possibly keep it pixel based technically, but the pixes units are pulled from percentage on CSS stylings.



platformArray =[];
PlatformCount = 100;

platformMaxWidth = 75; 
platformMaxHeight = 75;




gameBoard = document.getElementById("gameBoard");
function main(){

}

function generatePlatforms(){

    for(i=0;i<PlatformCount;i++){

    newPlat = document.createElement('div');


    newPlat.className += "platform";

    platHeight = Math.random()*platformMaxHeight;
    platWidth = Math.random()*platformMaxHeight;


    newPlat.style.width =  platWidth + "px";
    newPlat.style.height = platHeight + "px";


    // I'm not sure how efficient this will be, but I'm going to try it for now. This way I can use only one array containing the objects, and pull their CSS values as needed.
    // Usually I just create 3 arrays: one for the obejects, one for their X cordinates, and one for their Y cordinates.

    gameHeight = window.getComputedStyle(gameBoard).height; // This returns the board size as a string, as a decimal number + "px" value
    gameHeight = gameHeight.replace("px",""); // This replaces the "px" with nothing.
    gameHeight = parseInt(gameHeight); // This parses the string into an integer
   
    gameWidth = window.getComputedStyle(gameBoard).width;
    gameWidth = gameWidth.replace("px","");
    gameWidth =parseInt(gameWidth);
    

    newPlat.style.top = Math.random()*(gameHeight-platHeight*2) + "px"; //Makes the random range anywhere on the board, without overflowing
    newPlat.style.left= Math.random()*(gameWidth-platWidth*2) +"px";
    
    
    newPlat.style.backgroundColor= "green";
    gameBoard.appendChild(newPlat);
    
    //alert(style);
    }
}

generatePlatforms();

setInterval (main,1000/30); // Sets the main function to run at 30fps