function Snake(){
  this.direction = 'right';
  this.body = [
    {row: 1, column:5},
    {row: 1, column:4},
    {row: 1, column:3},
    {row: 1, column:2},
    {row: 1, column:1}
  ];
}

//Method for moving the position of the body of the snake
Snake.prototype.moveForward = function (maxRows,maxColumns){
  var head = this.body[0];

  switch(this.direction){
      case 'up':
      this.body.unshift({
        row: (head.row -1 +maxRows)% maxRows,
        column:head.column
      });
      break;
      case 'down':
      this.body.unshift({
        row: (head.row + 1 )% maxRows,
        column:head.column
      });
      break;
      case 'left':
      this.body.unshift({
        row: head.row,
        column:(head.column -1 +maxColumns)% maxColumns
      });
      break;
      case 'right':
      this.body.unshift({
        row: head.row,
        column:(head.column + 1 )% maxColumns
      });
      break;

  }
  this.previousTail = this.body.pop();
};

Snake.prototype.goLeft = function (){
  if(this.direction === 'up' || this.direction === 'down'){
    this.direction = 'left';
  }
};

Snake.prototype.goRight = function (){
  if(this.direction === 'up' || this.direction === 'down'){
    this.direction = 'right';
  }
};

Snake.prototype.goUp = function (){
  if(this.direction === 'left' || this.direction === 'right'){
    this.direction = 'up';
  }
};

Snake.prototype.goDown = function (){
  if(this.direction === 'left' || this.direction === 'right'){
    this.direction = 'down';
  }
};

Snake.prototype.hasEatenFood = function(food){
  return this.body[0].row === food.row && this.body[0].column === food.column;
};

Snake.prototype.growUp = function(){
  if(this.previousTail){
    this.body.push(this.previousTail);
    this.previousTail = undefined;
  }
};

Snake.prototype.hasEatenItSelf = function(){
  return this.body.some(function (element,index,array){
    return (element.row === array[0].row && element.column === array[0].column && index != 0);
  });
};
