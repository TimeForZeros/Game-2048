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

//move up
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
    
}




//creating the render function

function render () {
    //function that goes through the board array rows
    board.forEach(function(colArr, rowIdx) {
        //function that goes through the column index of the row arrays
        colArr.forEach(function(cell, colIdx){
            let tile = document.getElementById(`c${colIdx}r${rowIdx}`);
            
            
            
        });
    });
}



//document.querySelector('.grid').addEventListener('click', handleClick);

function spawnInit () {
    render();
    function startAssign() {
        do {
      let numOne = document.get `c${randomNum()}r${randomNum()}`;
      let numTwo =`c${randomNum()}r${randomNum()}`;}
      while (numOne !== numTwo){
      numOne.style.backgroundColor = 'black';
      numtwo.style.backgroundColor = 'black';
      }
}

function randomNum() {
return (Math.ceil(Math.random() * 4) - 1);
}