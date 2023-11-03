# platformerGame
A little one-page platformer game for fun

I've made a few quick 1-page mini platformer games, but I'm trying something new with this one.
I'm using css percentage values instead of pixel for collision detection.

When the player moves, it moves in percentage increments.

Normally I'd store all the necessary values in separate arrays, such as an X&Y array containing both the position + its respective width and height.
But this time, I'm only using one array for the platforms the player interacts with.
The rest of the values I need can be pulled straight from the object's css.

Also the game will be able to be resized in real-time by moving the window's width or height, and it should still work perfectly.
I think this will create a cool effect, as the width and height are not aspect-ratio locked. 
I might turn this into an automatic feature at some point by having the board change size,  to display this effect.

This isn't a serious project, it's just a fun little project to test this method of collision.
