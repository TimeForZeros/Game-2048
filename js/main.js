const colors = {
    '0'   : 'white',
    '2'   : 'RGBA(0, 0, 50, 0.1)',
    '4'   : 'RGBA(0, 25, 50, 0.2)',
    '8'   : 'RGBA(0, 50, 50, 0.3)',
    '16'  : 'RGBA(0, 50, 100, 0.4)',
    '32'  : 'RGBA(0, 50, 150, 0.5)',
    '64'  : 'RGBA(0, 0, 0, 0.6)',
    '128' : 'RGBA(0, 0, 0, 0.7)',
    '256' : 'RGBA(0, 0, 0, 0.8)',
    '512' : 'RGBA(0, 0, 0, 0.9)',
    '1024': 'RGBA(150, 100, 100, 1.0)',
    '2048': 'RGBA(255, 0, 0, 1)'
}

const moves = {
    left: function shiftLeft(boardArr) {
        boardArr.forEach(function (arr, idx)
        { boardArr[idx] = leftMove(arr);
            return  boardArr[idx];
        });
        return boardArr;
    },
    right: function shiftRight(boardArr) {
        boardArr.forEach(function (arr, idx)
        { boardArr[idx] = rightMove(arr);
            return  boardArr[idx];
        });
        return boardArr;
    },
    up: function shiftUp(boardArr) {
        boardArr = colConverter(boardArr);
            boardArr.forEach(function (arr, idx)
            { boardArr[idx] = leftMove(arr);
                return  boardArr[idx];
            });
            boardArr = colConverter(boardArr);
            return boardArr;

    },
    down: function shiftDown(boardArr) {
            boardArr = colConverter(boardArr);
            boardArr.forEach(function (arr, idx)
            { boardArr[idx] = rightMove(arr);
                return  boardArr[idx];
            });
            boardArr = colConverter(boardArr);
            return boardArr;
    }
}

var board = [
    [0, 0, 0, 0],   //Row 1 idx 0
    [0, 0, 0, 0],   //Row 2 idx 1
    [0, 0, 0, 0],   //Row 3 idx 2
    [0, 0, 0, 0]    //Row 4 idx 3
];

//step 1. returns array of nonzeros
function reduceArr(arr) {
    function nonZeroFind(nonZero) {
       return nonZero > 0;
    }
   return arr.filter(nonZeroFind);
}

//step 2. combines like values
function combineNums(arr) {
     arr.forEach(function(num, idx) {
         if (arr[(idx+1)] == arr[idx]){
             arr[idx] *= 2;
             arr.splice((idx+1), 1);
             return arr[idx];
         } 
         else {
             return;
         }
     });
    
    return arr;
}


//step 3. returns a 4-length array
function fillArr(arr) {
    for ( arr.length;   arr.length < 4;) {
        arr.push(0);
    }
    return arr;
}

//alt step (right shift)
function rightMove(arr) {
    var flip = fillArr(combineNums(reduceArr(arr.reverse())));
    return flip.reverse();
}



//Moves
function leftMove(arr) { 
 return fillArr(combineNums(reduceArr(arr)));
}

//updated Col Converter

function colConverter(arr) {
var transposedArr = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]];
arr.forEach(function(rowArr, rowIdx) {
    rowArr.forEach(function(val, colIdx) {
        transposedArr[colIdx].splice(rowIdx, 1, val);
        return transposedArr;
    });
    return transposedArr;
});
return transposedArr;
}


function init() {
    render(board);
    spawnInit(board);
}




//creating the render function

function render(arr) {
    //function that goes through the board array rows
    arr.forEach(function(colArr, rowIdx) {
        //function that goes through the column index of the row arrays
        colArr.forEach(function(cell, colIdx){
            let tile = document.getElementById(`c${colIdx}r${rowIdx}`);
            tile.style.backgroundColor = colors[cell.toString()];
            
        });
    });
    return arr;
}



//document.querySelector('.grid').addEventListener('click', handleClick);

function randomNum() {
    return (Math.ceil(Math.random() * 4) - 1);
}

function renderUpdate() {
    let col = randomNum();
    let row = randomNum();
    let updateNum = null;
    let tileUpdate = document.getElementById(`c${col}r${row}`);

    if (board[row][col] === 0){
    board[row][col]
    if (randomNum() > 2){
        board[row][col] = 4;
    }
    else {
        board[row][col] = 2;
    }
    }
    else {
    renderUpdate(board);
    }
    updateNum = board[row][col];
    return tileUpdate.style.backgroundColor = colors[updateNum.toString()];
}

function spawnInit (arr) {
    for (var i = 0; i < 2;) {
        let col = randomNum();
        let row = randomNum();
        let updateNum = null;
        let tileUpdate = document.getElementById(`c${col}r${row}`);
    if (board[row][col] === 0){
        board[row][col] = 2;
        updateNum = board[row][col];
        i++;
        tileUpdate.style.backgroundColor = colors[updateNum.toString()];
        }
    }
    return arr;
}


document.onkeydown = function(e) {

    switch (e.keyCode) {
        case 37: //left
        {      
        render(moves.left(board));
        console.log(board);
    }
    break;
    case 38: //up
    {
        let tempArray = render(moves.up(board));  
        board = tempArray;      
        console.log(board);
    }
    break;
    case 39: //right
    {
    render(moves.right(board));
        console.log(board);
    }
    break;
    case 40: //down
    {
        let tempArray = render(moves.down(board));  
        board = tempArray;
        console.log(board);


    }
            break;
    }
};

init();
