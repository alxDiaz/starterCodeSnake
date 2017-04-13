function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.snake = options.snake;

  //array that creates the grid where the snake can move.
  for(var rowIndex= 0; rowIndex < this.rows; rowIndex++){
      for(var columnsIndex = 0; columnsIndex < this.columns ; columnsIndex++){
        $('.container').append($('<div>')
        .addClass('cell board')
        .attr('data-row', rowIndex)
        .attr('data-column', columnsIndex));
      }
  }
}

//Method for printint the snake on the html File
Game.prototype.drawSnake = function(){
  this.snake.body.forEach(function(position,index){
    var selector = '[data-row=' + position.row + '][data-column=' + position.column + ']';
    $(selector).addClass('snake');
  });
};

Game.prototype.clearSnake = function(){
  $('.snake').removeClass('snake');
};

Game.prototype.start = function() {
  setInterval(this.update.bind(this), 100);
};

Game.prototype.update = function(){
  this.snake.moveForward(this.rows,this.columns);
  this.clearSnake();
  this.drawSnake();
};


$(document).ready(function(){
  console.log("hola");
  var game = new Game({
    rows: 50,
    columns: 50,
    snake: new Snake()
  });

//  game.drawSnake();
  game.start();
});
