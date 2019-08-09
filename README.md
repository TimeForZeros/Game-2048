# Welcome to the Game 2048
![Imgur](https://imgur.com/qRSECyn)
## What is 2048? 
2048 is a tile-sliding game where the objective is to merge like-colored tiles by using the arrow keys to slide the tiles in their respecive direction. As colored tiles merge, they'll change color away from green hues that increment analogously to warmer hues. The objective is to merge tiles that result in a red tile; the 2048 analog to my version. As one merges tiles, they will gain points relative to the value of sum of the two merged tiles (e.g. two green tiles worth two points merge to add 4 points to the score, two blue merge to add 8 etc...)

## Development

### Wireframe
![Imgur](https://i.imgur.com/RG545pY.png)

### Features
Moves (up, down, left, right) are mapped to a variant of a single function of three steps:

#### Function Breakdown

##### Step One - Identifying
A function that scans an array for zeros and splice them out leaving only array elements with positive integer values.

##### Step Two - Combining
A function that compares the remaining integer values and if they're alike in value, multiplies the latter by two and removes the former from the array. When combining occurs, the score is incremented by the resulting value and appended to the HTML.

##### Step Three - Filling
A function that pushes zero values into arrays until the array lenth is 4.

### Function Variants
The function by default is for a left shift, for the right shift, the array is first reversed, the function is run, and reversed the resulting arrays.
Top and bottom shifts required more work. They required to first transpose the matrix so that the column indices become indices for row arrays and then running the left shift for the top and the right shift variant for the bottom shift. After this is done, the array is once again transposed to its original state.

###Render Function
The render function and the initialized population of zeros and starting 2's involve assigning a randomly generated number to the column and row indices of the board array. For subsequent populations, the function first checks if the value of the contents of the array's indices is a zero before populating it with either a 2-valued tile or a 4-valued tile; there is a one in four chance that a 4 populates the board to add extra challenge to the game.

####~On the issue of invalid moves
To ensure that tiles aren't populated when a move does not change the board, a string generated from the board array before the move is made is compared with a string generated after the move is made. If the array strings do not match, meaning the board has changed appearance (i.e. 'moved'), an empty part of the board is populated with a 2 or 4 tile.

### Win Logic
A function scans the array after a render to check for the winning value, 2048. If found, it alerts the user that they have won.

### Lose Logic
This function does not fully work yet but the idea is to check the array for zeros, if there are any zeros, the function stops. If there aren't any zeros, a duplicate array is created from the board and is moved in all directions and a string of its values is created upon each move. These strings are then compared. If the compared strings are the same, this means there are no more possible moves to be done and it throws an alert to the player telling them they've lost.


## Upcoming Features

Planning to media query for mobile where the control buttons can be used to input commands since mobile devices don't have arrow keys.
Variant in colors or number descriptors for maximum accessibility.