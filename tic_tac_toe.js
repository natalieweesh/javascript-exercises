var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Player = function(number) {
  this.number = number;
  this.player_name = this.number.toString();
};

Player.prototype.getName = function() {
  reader.question("Which is your name? ",
    function(player_name) {
      this.player_name = player_name;
  });
}

Player.prototype.getInput = function(board, cb) {
  var that = this;
  reader.question("Which position do you want? ",
    function(choiceStr) {
      var pos = choiceStr.split(",");
      pos[0] = parseInt(pos[0]) - 1;
      pos[1] = parseInt(pos[1]) - 1;
      if(pos[0] < 3 && pos[0] >= 0 && pos[1] < 3 && pos[1] >= 0 && board[pos[0]][pos[1]] == "_" )
        cb(pos);
      else {
        console.log("Invalid move!");
        that.getInput(board, cb);
      }
  });
};

var Game = function(board) {
  this.board = [["_","_","_"],["_","_","_"],["_","_","_"]];
  this.players = [new Player(0), new Player(1)];
};

Game.prototype.show = function() {
  for(var i = 0; i < this.board.length; i++) {
    console.log(this.board[i].join(" "));
  }
};

Game.prototype.gameOver = function() {
  // check rows
  for(var i = 0; i < this.board.length; i++) {
    var first = this.board[i][0];
    var same = true;
    if(first != "_") {
      for(var j = 1; j < this.board[i].length; j++) {
        if(this.board[i][j] != first)
          same = false
      }

      if(same)
        return true;
    }
  }

  // check columns
  for(var i = 0; i < this.board[0].length; i++) {
    var first = this.board[0][i];
    var same = true;
    if(first != "_") {
      for(var j = 1; j < this.board.length; j++) {
        if(this.board[j][i] != first)
          same = false
      }

      if(same)
        return true;
    }
  }
  // check diagonals
  if(this.board[0][0] != "_") {
    var first = this.board[0][0];
    if(this.board[1][1] == first && this.board[2][2] == first)
      return true;
  }

  if(this.board[0][2] != "_") {
    var first = this.board[0][2];
    if(this.board[1][1] == first && this.board[2][0] == first)
      return true;
  }

  return false;
};

Game.prototype.playGame = function(cb) {
  var that = this;

  function performTurn(player) {
    that.show();

    if(that.gameOver()) {
      console.log("Player " + (parseInt(player.number === 0 ? 1 : 0)+1) + " wins!");
      return;
    }

    console.log("Player " + (player.number+1) + "'s turn:");
    player.getInput(that.board, function(move) {
      that.board[move[0]][move[1]] = player.number === 0 ? "X" : "O";

      performTurn(that.players[player.number === 0 ? 1 : 0]);
    });
  }

  performTurn(this.players[0]);
};

var g = new Game();

g.playGame();