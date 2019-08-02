var board = [
    [0, 0, 0, 0],   //Row 1 idx 0
    [0, 0, 0, 0],   //Row 2 idx 1
    [0, 0, 0, 0],   //Row 3 idx 2
    [0, 0, 0, 0]    //Row 4 idx 3
];


var testArr = [2, 2, 2, 4]; //bug! 24 2 2 4


//step 1. returns array of nonzeros
function reduceArr(arr) {
    function nonZeroFind(nonZero) {
       return nonZero > 0;
    }
   return arr.filter(nonZeroFind);
}

//step 2. combines like values
function combineNums(arr) {
  //Old function
    /* var repeat = 0;
    arr.forEach(function(num, idx) {
     if (repeat === num) {
         arr[idx-1] = num * 2;
         arr.splice(idx, 1);
         repeat = 0;
     } 
      else {
         repeat = num;
     }
    });
    */
   //Updated Function
   /* arr.forEach(function(num, idx) {
        if (repeat === num) {
            arr[idx-1] = num * 2;
            arr.splice(idx, 1);
            repeat = 0;
        }
        else {
            repeat = num;
        }
    });
    */
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
console.log(leftMove(testArr));
console.log(rightMove(testArr));