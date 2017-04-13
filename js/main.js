function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.snake = options.snake;
  this.food = undefined;

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

//Before painting the new snake position, we use this method to erase the previous position
Game.prototype.clearSnake = function(){
  $('.snake').removeClass('snake');
};

Game.prototype.start = function() {
  this.intervalID = setInterval(this.update.bind(this), 100);
};

Game.prototype.update = function(){
  this.snake.moveForward(this.rows,this.columns);
  if(this.snake.hasEatenFood(this.food)){
    this.snake.growUp();
    this.clearFood();
    this.generateFood();
    this.drawFood();
  }
  if(this.snake.hasEatenItSelf()){
    this.stop();
    alert('Game Over');
  }

  this.clearSnake();
  this.drawSnake();
};

Game.prototype.stop = function(){
  if(this.intervalID){
    clearInterval(this.intervalID);
    this.intervalID = undefined;
  }
};


//Method that catch the key taht was press, so the snake can star moving.
Game.prototype.assignControlsToKeys = function(){
  $('body').on('keydown', function(e){
    switch (e.keyCode) {
      case 37:
        this.snake.goLeft();
        break;
      case 38:
        this.snake.goUp();
        break;
      case 39:
        this.snake.goRight();
        break;
      case 40:
        this.snake.goDown();
        break;
      case 80:
        if(this.intervalID){
          this.stop();
        }
        else{
          this.start();
        }

        break;
    }
  }.bind(this));
};

//Method for generate the food on a random position of the grid.
Game.prototype.generateFood = function(){
  this.food = {
    row: Math.floor(Math.random() * this.rows),
    column: Math.floor(Math.random() * this.columns)
  };
};

//Method that draw the snake's food on the grid.
Game.prototype.drawFood = function(){
  var selector = '[data-row=' + this.food.row + '][data-column=' + this.food.column + ']';
  $(selector).addClass('food');
};

Game.prototype.clearFood = function(){
  $('.food').removeClass('food');
  this.food = undefined;
};

$(document).ready(function(){
  var game = new Game({
    rows: 50,
    columns: 50,
    snake: new Snake()
  });

//  game.drawSnake();
  game.assignControlsToKeys();
  game.generateFood();
  game.drawFood();
  game.start();
});
