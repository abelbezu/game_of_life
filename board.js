// Board is an actual visual representation of game of life. It creates the board from
// any given valid array. It also creates a Board object from an html representation of a board.
// Abstraction Function:  (BoardModel, ContainerClass) -> Board 
// Board is a mutable object.
var Board = function(boardArray, boardContainer){

	var that = Object.create(Board.prototype);
	var boardModel = BoardModel(boardArray);
	var board = [];
	that.test = boardModel;
	var container = $('#' + boardContainer);

	//Looping abstraction
	var until = function(f){
		f() || until(f);
	};

	// Brings a cell to life. 
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	that.turnOn = function(row, column){
		//turn the corresponding cell in the board model on
		//if that returns true, get the board and redraw this board
		boardModel.turnOn(row, column);
		board[row][column].removeClass("dead");
		board[row][column].addClass("alive")
		
	};
	// Kills a cell.
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	that.turnOff = function(row, column){
		boardModel.turnOff(row, column);
		board[row][column].removeClass("alive");
		board[row][column].addClass("dead")
	};
	// Returns wether a cell is dead or alive;
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	that.isOn = function(row, column){
		return boardModel.isAlive(row, column);
	}

	// Nagates the state of a cell.
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	that.flip = function(row, column){
		if(that.isOn(row, column)){
			that.turnOff(row,column);
		}
		else{
			that.turnOn(row, column);
		}
	};

	//Creates the actual board based on the internal representation.
	that.installBoard = function(){
		container.empty();
		
		boardModel.getBoard().forEach(function(boardline, lineIndex){
			var boardLine = [];
			var line = $('<li class = "board_line_container"> <ul class = "board_line"></ul> </li>');
	 		boardline.forEach(function(boardCell, cellIndex){
	 			var cell = $('<li class = "board_element" square-id = "'+lineIndex+'_'+cellIndex+'"></li>');
	 			if(boardCell == 1){
	 				cell.addClass("alive");
	 			}
	 			else{
	 				cell.addClass("dead");
	 			}
	 			line.append(cell);
	 			boardLine.push(cell);
	 		});
	 		board.push(boardLine);
	 		container.append($(line));

		});
	 	
	};
	//Updates the board, applies changes, if there are any, in the model representation.
	that.updateBoard = function(){
		
		boardModel.getBoard().forEach(function(boardLine, lineIndex){
			
	 		boardLine.forEach(function(boardCell, cellIndex){
	 			
	 			if(boardCell == 1){
	 				that.turnOn(lineIndex, cellIndex);
	 			}
	 			else{
	 				that.turnOff(lineIndex, cellIndex);
	 			}
	 			
	 		});
	 		

		});
	 	
	};

	//extract a 2d array from a board view.
	//@param container : id of the container element. Expected to have '<li>' elements inside.
	//                   each '<li>' element is expected to have a '<ul>' element inside, which
	//					 in turn contains a list of '<li>' elements -- representing the cells.
	//					 Each  
	that.fromBoard = function(container){
		var container = $('#' + container);
		board_array = [];
		container.find('.board_line_container').each(function(line_index, line){
			var array_line = [];
			$(line).find('li').each(function(cell_index, cell){
				if($(cell).hasClass('dead')){
					array_line.push(0);
				}
				else if($(cell).hasClass('alive')){
					array_line.push(1);
				}
				board_array.push(array_line);
			});
		});

		boardModel = BoardModel(board_array);
		return boardModel.getBoard();

	}

	//Makes a single move. Returns true if the board's current state is empty. (No live cells)
	that.step= function(){
		var done = boardModel.step();
		that.updateBoard();
		return done;
	}
	
	return that;


}