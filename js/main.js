const colors = {
  "0": "rgb(239, 244, 250)",
  "2": "#09B5A5",
  "4": "#0994BA",
  "8": "#0A69C4",
  "16": "#0027A6",
  "32": "#0C0680",
  "64": "#200159",
  "128": "#6C2CDE",
  "256": "#A82EE8",
  "512": "#C934D1",
  "1024": "#B02371",
  "2048": "#962425"
};

const moves = {
  left: function shiftLeft(boardArr) {
    boardArr.forEach(function(arr, idx) {
      boardArr[idx] = leftMove(arr);
      return boardArr[idx];
    });
    return boardArr;
  },
  right: function shiftRight(boardArr) {
    boardArr.forEach(function(arr, idx) {
      boardArr[idx] = rightMove(arr);
      return boardArr[idx];
    });
    return boardArr;
  },
  up: function shiftUp(boardArr) {
    boardArr = colConverter(boardArr);
    boardArr.forEach(function(arr, idx) {
      boardArr[idx] = leftMove(arr);
      return boardArr[idx];
    });
    boardArr = colConverter(boardArr);
    return boardArr;
  },
  down: function shiftDown(boardArr) {
    boardArr = colConverter(boardArr);
    boardArr.forEach(function(arr, idx) {
      boardArr[idx] = rightMove(arr);
      return boardArr[idx];
    });
    boardArr = colConverter(boardArr);
    return boardArr;
  }
};



var score = 0;
var board = [
  [0, 0, 0, 0], //Row 1 idx 0
  [0, 0, 0, 0], //Row 2 idx 1
  [0, 0, 0, 0], //Row 3 idx 2
  [0, 0, 0, 0] //Row 4 idx 3
];
let scoreDisplay = document.getElementById('score');



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
    if (arr[idx + 1] == arr[idx]) {
      arr[idx] *= 2;
      score += arr[idx];
      scoreDisplay.textContent = score;
      arr.splice(idx + 1, 1);
      return arr[idx];
    } else {
      return;
    }
  });

  return arr;
}

//step 3. returns a 4-length array
function fillArr(arr) {
  for (arr.length; arr.length < 4; ) {
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
  var transposedArr = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
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
  scoreDisplay.textContent = 0;
  render(board);
  spawnInit(board);
}

//creating the render function

function render(arr) {
  //function that goes through the board array rows
  arr.forEach(function(colArr, rowIdx) {
    //function that goes through the column index of the row arrays
    colArr.forEach(function(cell, colIdx) {
      let tile = document.getElementById(`c${colIdx}r${rowIdx}`);
      tile.style.backgroundColor = colors[cell.toString()];
    });
  });
  return arr;
}

//document.querySelector('.grid').addEventListener('click', handleClick);

function randomNum() {
  return Math.floor(Math.random() * 4);
}

function renderUpdate() {
  let col = randomNum();
  let row = randomNum();
  let updateNum = null;
  let tileUpdate = document.getElementById(`c${col}r${row}`);

  if (board[row][col] === 0) {
    board[row][col];
    if (randomNum() > 2) {
      board[row][col] = 4;
    } else {
      board[row][col] = 2;
    }
  } else {
    renderUpdate(board);
  }
  updateNum = board[row][col];
  return (tileUpdate.style.backgroundColor = colors[updateNum.toString()]);
}

function spawnInit(arr) {
  for (var i = 0; i < 2; ) {
    let col = randomNum();
    let row = randomNum();
    let updateNum = null;
    let tileUpdate = document.getElementById(`c${col}r${row}`);
    if (board[row][col] === 0) {
      board[row][col] = 2;
      updateNum = board[row][col];
      i++;
      tileUpdate.style.backgroundColor = colors[updateNum.toString()];
    }
  }
  return arr;
}
Array.from
document.onkeydown = function(e) {
  const sentryArray = JSON.stringify(board);
  console.log(sentryArray)
  switch (e.keyCode) {
    case 37: //left
      {
        render(moves.left(board));
        winCheck(board);
        loseCheck(board);
        renderUpdate(board);
      }
      break;
      case 38: //up
      {
        let tempArray = render(moves.up(board));
        winCheck(board);
        board = Array.from(tempArray);
        if (sentryArray !== board) {
          loseCheck(board);
          renderUpdate(board);
        } else return;
      }
      break;
      case 39: //right
      {
        render(moves.right(board));
        winCheck(board);
        loseCheck(board);
        renderUpdate(board);
        console.log(board);
      }
      break;
      case 40: //down
      {
        let tempArray = render(moves.down(board));
        winCheck(board);
        board = tempArray;
        loseCheck(board);
        renderUpdate(board);
      }
      break;
  }
};


//check for win
function winCheck(arr){
arr.forEach(function(rowArr){  
  rowArr.forEach(function(winNumber){
    if (winNumber === 2048){
      alert('YOU WIN!!!!');
    }
  });
});
};

//check for lose
function loseCheck(arr){
  arr.forEach(function(rowArr){  
    rowArr.forEach(function(isZero){
      if ( isZero === 0 ){
        return
      }
      else{
      //function to check if moves are possible
      // if (function that checks possible moves === 0) {
      //   alert('YOU LOSE!!!');
      // }
    }
    });
  });
  };



  //score counter
init();

