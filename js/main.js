function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;

  for(var rowIndex= 0; rowIndex < this.rows; rowIndex++){
      for(var columnsIndex = 0; columnsIndex < this.columns ; columnsIndex++){
        $(".container").append($('<div>')
        .addClass("cell board")
        .attr('data-row', rowIndex)
        .attr('data-column', columnsIndex));
      }
  }
}



$(document).ready(function(){
  console.log("hola");
  var game = new Game({
    rows: 50,
    columns: 50
  });
});
