//Datatype representing the game of life board. 
//Abstraction: {two dimensional binary array} -> BoardModel
//			 1 represents a live cell.
//			 0 represents a dead cell.
//Can be initialized from any valid (!) two dimensional binary array.
//Board is a mutable object.
var BoardModel = function(boardArray, num_rows, cols){
	var that = Object.create(BoardModel.prototype);
	

	//In the case of an invalid input to this class, this exception is thrown.
    var InvalidBoardException = function(message){
		this.message = message;
	};

	//loop abstractions to avoid using the traditional loops.
	var times = function (i, f) {
		if (i === 0) return;
		f(); times (i-1, f);
	};

	var until = function(f){
		f() || until(f);
	};

	// iterates over each neighbor of a cell, and calls f with the row and column number of
	// the cell.
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	// @params function  f : a call back function called at each neighboring cell with
	// that cells row and col as input.
	var forEachNeighbor = function(row, col, f){
	  		if ((row - 1 >= 0) && (col - 1 >= 0)){
				
				f(row -1, col -1);
				
			}
			if (row - 1 >= 0){
				
				f(row-1, col);
			
			}
			if ((row - 1 >= 0) && (col + 1 < num_columns)){
				f(row-1 , col + 1);
			}

			if (col - 1 >= 0){
				f(row, col -1);
			}

			if (col + 1 < num_columns){
				f(row, col + 1);
			}

			if ((row + 1 < num_rows) && (col - 1 >= 0)){
				f(row + 1, col-1);
			}

			if( (row + 1 < num_rows)){
				f(row + 1, col);
			}

			if ((row + 1 < num_rows) && (col + 1 < num_columns)){
	      		f(row + 1, col + 1);
			}
	  
		}
	// iterates over each cell on the board, and calls f with the row and column number of
	// the cell and the value of that particular cell
	// @params function f : a call back function called at each cell with
	// that cells row and col and value input.
	that.forEachCell = function(f){
		board.forEach(function(line, line_index){
			line.forEach(function(cell, cell_index){
				f(line_index, cell_index, board[line_index][cell_index]);
			});
		});
	}

	//returns true if all the cells of this board are of value '0'.
	var isEmptyBoard = function(){
		var isEmpty = true;
		that.forEachCell(function(i, j){
			if(that.isAlive(i, j)){
				isEmpty = false;
			}
		});
		return isEmpty;
	};

	//internal function to validate the boardArray
	//A valid board should meet the following criteria:
	//        should be rectangular
	//		  should only contain 1's and 0's	
	//if the input constitutes a valid board, returns a board. 
	//else throws an invalid board exception
	var validBoardFromInput = function(){
		var lineLength = boardArray[0].length;
		boardArray.forEach(function(line){
			if (line.length == lineLength){
				line.forEach(function(cell){
					if (!((cell == 0)||(cell == 1))){
						throw new InvalidBoardException('Invalid cell state. All cell states should be 0 or 1');
					}
				});
			}
			else{
				throw new InvalidBoardException('Invalid board dimensions. Board should be rectangular');
			}
		});
		return boardArray;
	}
	
	//internal function to initialize a board from a valid input. If board array  
	//is given, will initialize an empty 50 x 50 board.
	//if board function was initialized before, it uses that value (to avoid reinitialization
	// every time board is called)
	var board = board || (function(args){
		
		if(args.length == 1){
			try{
				return validBoardFromInput();
			}
			catch(ex){
				throw new InvalidBoardException(ex);
			}
		}
		else {
			var board = [];
			times(50, function(){
				row = []
				times(50, function(){
					row.push(0);
				});
				board.push(row);
			});
			return board;

		}
	})(arguments);


	var num_rows = board.length;
	var num_columns = board.length;

	//returns a copy of the 2d array representation of this object. This will be how users of this
	//object can gain access to the internals of this board.
	that.getBoard = function(){
		return board.map(function(arr) {
		    return arr.slice();
		});
	}



	//overload toString method to give a better representation of the board state
	//mainly for testing and debugging
	BoardModel.prototype.toString = function(){
		//console.log("to string called");
		var _board = "["
		board.forEach(function(line){
			var _line = "[";
			line.forEach(function(cell){
				_line += cell + " "; 
			});
			_line += "]";
			_board += _line;
		});
		_board += "]";
		return _board;
	}

	//Changes the state of a cell from '0' to '1'
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	that.turnOn = function(row, col){
		//console.log("called with board arrray  " + that.toString());
		board[row][col] = 1;
		
	}
	//Changes the state of a cell from '1' to '0'
	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	that.turnOff = function(row, col){
		//console.log("called with board arrray  " + that.toString());
		board[row][col] = 0;
		
	}

	//Fetches the state of a cell. If the cell's value is '1', returns 'true', 'false' otherwise 
   	// @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	// @return boolean : weather the board is alive
    that.isAlive = function(row, col){
    	
		return board[row][col] == 1;
	};

    //Given a cell row and col, returns how many of the neighboring cells are alive.
    // @params integer row : the row value of the cell
	// @params integer col : the column value of the cell
	// @return integer count : the number of alive cells around this cell.
	that.countLiveNeighbors = function(row, col){
		
		var count = 0;
		var counter = function(row, col){
			if(that.isAlive(row, col)){
				count++;
			}
		};

		forEachNeighbor(row, col, counter);
		return count;
		
	};
	//calculates the next state of the board. Applies the rules 
	//stated in John Conway's game of life.
	//@return boolean isEmpty : returns true if the board is empty.
    that.step = function(){
    	//Create a copy of this board and use as a reference so that mutating the board doesn't change the behaviour of the functions.
		var new_board = BoardModel(that.getBoard());
		
		var update_board = function(i, j){
				//Any live cell with fewer than two live neighbours dies, as if caused by under-population.
				
				if (new_board.countLiveNeighbors(i,j) < 2){
					that.turnOff(i,j);
					//callBack(i, j, "off");
				}
				//Any live cell with more than three live neighbours dies, as if by overcrowding.
				else if (new_board.countLiveNeighbors(i,j) >3){
					that.turnOff(i,j);
					//callBack(i, j, "off");
				}
				//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
				else if(new_board.countLiveNeighbors(i,j) == 3){
					that.turnOn(i,j);
					//callBack(i, j, "on");
				}
			}

	    that.forEachCell(update_board);
	    
	    return isEmptyBoard();
    };



	return that;
}
