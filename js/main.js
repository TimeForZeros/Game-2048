var board = [
    [0, 0, 0, 0],   //Row 1 idx 0
    [0, 0, 0, 0],   //Row 2 idx 1
    [0, 0, 0, 0],   //Row 3 idx 2
    [0, 0, 0, 0]    //Row 4 idx 3
];


var testArr = [20, 20, 2, 2];


//step 1. returns array of nonzeros
function reduceArr(arr) {
    function nonZeroFind(nonZero) {
       return nonZero > 0;
    }
   return arr.filter(nonZeroFind);
}

//step 2. combines like values
function combineNums(arr) {
    var repeat = 0;
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
    return arr;
}


//step 3. returns a 4-length array
function fillArr(arr) {
    for ( arr.length;   arr.length < 4;) {
        arr.push(0);
    }
    return arr;
}

function leftMove(arr) { 
 return fillArr(combineNums(reduceArr(arr)));
}