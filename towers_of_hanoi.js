// Towers of Hanoi game

var towers = [[3,2,1],[],[]];

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var show = function(towers) {
  for(var i = 2; i >= 0; i--) {
    for(var j = 0; j < towers.length; j++) {
      var tmp = towers[j][i];
      if(tmp == 1)
        process.stdout.write('  -  ');
      else if(tmp == 2)
        process.stdout.write(' --- ');
      else if(tmp == 3)
        process.stdout.write('-----');
      else
        process.stdout.write('     ');

      if(j != towers.length - 1)
        process.stdout.write(' | ');
    }
    process.stdout.write('\n');
  }
};

var moveTile = function(towers, cb) {
  reader.question("Which tower do you want to move from / to? (1, 2)", function(choiceStr) {
    var from = parseInt(choiceStr.split(", ")[0])-1;
    var to = parseInt(choiceStr.split(", ")[1])-1;
    if(towers[from][towers[from].length-1] > towers[to][towers[to].length -1])
      moveTile(towers, cb);
    else {
      towers[to].push(towers[from].pop());
      cb();
    }
  });
};

var playGame = function(towers, cb) {
  function performTurn() {
    show(towers);

    if(towers[0].length === 0 && towers[1].length === 0) {
      cb();
      return;
    }
    moveTile(towers, performTurn);

  }

  performTurn();
};

playGame(towers, function() {
  console.log("You win!");
});