var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var crazyBubbleSort = function(cb,arr) {
  sorted = true;
  performSortPass(arr, cb);
}

var compare = function(el1, el2, cb) {
  reader.question("(1) " + el1 + ", (2) " + el2 + "\nIs (1) 1 bigger, (-1) 2 bigger, or (0) the same? ", function(choiceStr) {
    var choice = parseInt(choiceStr);
    cb(choice);
  });
}

var performSortPass = function(arr, cb) {

  sorted = true;
  var i = 0;

  function performStep() {
    if(i == arr.length - 1) {
      if(sorted) {
        cb();
        return;
      }
      else {
        i = 0;
        sorted = true;
      }
    }
    compare(arr[i], arr[i+1], function(choice) {
      if(choice == 1) {
        sorted = false;
        var tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
      }
      console.log("arr: " + arr);
      i++;

      performStep();
    });
  }
  performStep();
}

var arr = [5,3,4,1,2]
crazyBubbleSort(function() {
  console.log("sorted arr: " + arr);
}, arr);