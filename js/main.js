const colors = {
    '0'   : 'white',
    '2'   : 'RGBA(0, 0, 0, 0.1)',
    '4'   : 'RGBA(0, 0, 0, 0.2)',
    '8'   : 'RGBA(0, 0, 0, 0.3)',
    '16'  : 'RGBA(0, 0, 0, 0.4)',
    '32'  : 'RGBA(0, 0, 0, 0.5)',
    '64'  : 'RGBA(0, 0, 0, 0.6)',
    '128' : 'RGBA(0, 0, 0, 0.7)',
    '256' : 'RGBA(0, 0, 0, 0.8)',
    '512' : 'RGBA(0, 0, 0, 0.9)',
    '1024': 'RGBA(0, 0, 0, 1.0)',
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

//create column arrays converter
function colConverter(arr) {
    var colOne =[], colTwo = [], colThree = [], colFour = [];
    var colArrays = [colOne, colTwo, colThree, colFour];
    arr.forEach(function(idxArr){
        colOne.push(idxArr[0]);
        colTwo.push(idxArr[1]);
        colThree.push(idxArr[2]);
        colFour.push(idxArr[3]);
        return colArrays;
    });
return colArrays;
    }
//revert column array by performing this function again

//console.log(moves.down(board));

function init() {
    render();
    spawnInit();
    console.log(board);
}




//creating the render function

function render () {
    //function that goes through the board array rows
    board.forEach(function(colArr, rowIdx) {
        //function that goes through the column index of the row arrays
        colArr.forEach(function(cell, colIdx){
            let tile = document.getElementById(`c${colIdx}r${rowIdx}`);
            tile.style.backgroundColor = colors[cell.toString()];
            
        });
    });
}



//document.querySelector('.grid').addEventListener('click', handleClick);

function randomNum() {
    return (Math.ceil(Math.random() * 4) - 1);
}
render();

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
    renderUpdate();
    }
    updateNum = board[row][col];
    return tileUpdate.style.backgroundColor = colors[updateNum.toString()];
}

function spawnInit () {
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
    else {
        return ;
        }
    }
}


document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37: //left
        {
            moves.left(board);
            renderUpdate();
            render();
            console.log(board);
        }
        break;
        case 38: //up
        {
            moves.up(board);
            renderUpdate();
            render();
            console.log(board);
        }
        break;
        case 39: //right
        {
            moves.right(board);
            renderUpdate();
            render();
            console.log(board);
        }
        break;
        case 40: //down
        {
            moves.down(board);
            renderUpdate();
            render();
            console.log(board);
        }
            break;
    }
};

init();
//event handler
//move maps
/* when button clicked, move.direction,
 render,color the dpad */