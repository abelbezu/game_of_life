//A controller class for the board. All of the events and user inputs are handled in this
//class. 
//Different starting configurations are stored in this class. 
//Initializes the page with an empty board.
$(function(){

		var runningSim;

		var current_board;
		//Register the even handlers, give a handle to the process
 		var clickable = function(){
			$(".board_element").on('click', function(){
				var cell = $(this).attr("square-id").split("_");
				var row = cell[0];
				var col = cell[1];
				current_board.flip(row, col);
				
			});
		};
		
		//Generates an empty  array of a given size, to be used as a board to work with.
		//@return 2D array representing the board pattern
		//@return 2D array representing the board pattern
		var create_empty_grid = function(size){
		  var a = [];
		  for(var i = 0; i < size; i++){
		    var line = [];
		    for(var j = 0; j < size; j++){
		      line.push(0);
		    }
		    a.push(line);
		  }
		    return a;
		};

		//'Prints' a pattern on an empty array. 
		//@param presetPattern : an array of tuples containing indices, where the board must be on
		//@return 2D array representing the board pattern
		var preset_board = function(presetPattern){
			var a = create_empty_grid(50);
			presetPattern.forEach(function(presetElement)
			{
				console.log(presetElement);
				a[presetElement[0]][presetElement[1]] = 1;
			});
			var ret = a.map(function(arr) {
					    return arr.slice();
					});
			console.log(ret);
			return ret;

		};
		// internal function to create and load an empty board when the page loads.
		var start_empty = function(){
			current_board = Board(create_empty_grid(50), 'board_container');
			current_board.installBoard();
			clickable();
		};
		

		//Preset board values, all start with a differet board pattern, including empty.
		$(".empty").click(function(){
			start_empty();
		});
		

		$(".glider").click(function(){
			var glider_pattern = 
			current_board = Board(preset_board([[7,9], [8,10], [9,10], [9,9], [9,8]]), 'board_container');
			current_board.installBoard();
			clickable();
		});

		$(".still").click(function(){
			var glider_pattern = 
			current_board = Board(preset_board([[24,24], [24,25], [25,25], [25,24]]), 'board_container');
			current_board.installBoard();
			clickable();
		});

		$(".target").click(function(){
			var glider_pattern = 
			current_board = Board(preset_board([[25,24], [25,25], [25,26], [24,25], [26,25]]), 'board_container');
			current_board.installBoard();
			clickable();
		});
		$(".blinker").click(function(){
			var glider_pattern = 
			current_board = Board(preset_board([[25,24], [25,25], [25,26]]), 'board_container');
			current_board.installBoard();
			clickable();
		});
		$(".pulsar").click(function(){
			var glider_pattern = 
			current_board = Board(preset_board([[18,20], [18,21], [18,22], [18,26], [18,27], [18,28], [20,18], [20,23], [20, 25], [20, 30],[21,18], [21,23], [21, 25], [21, 30], [22,18], [22,23], [22, 25], [22, 30], [23,20], [23,21], [23,22], [23,26], [23,27], [23,28],[25,20], [25,21], [25,22], [25,26], [25,27], [25,28],[26,18], [26,23], [26, 25], [26, 30], [27,18], [27,23], [27, 25], [27, 30], [28,18], [28,23], [28, 25], [28, 30] ,[30,20], [30,21], [30,22], [30,26], [30,27], [30,28]]), 'board_container');
			current_board.installBoard();
			clickable();
		});

		//Load the empty board.
		start_empty();


		//Event handlers for the interface

		//Run simulation
	    $(".run_btn").click(function(){
	    	
		    
	    		$(this).addClass('hidden');
	    		$('.stop_btn').removeClass('hidden');
		    	runningSim = setInterval(function(){
		    		
		    			current_board.step();
		    		
		    	}, 100);
	    	
	    	
		   
	    });
	    // Make a single step
	     $(".step_btn").click(function(){
	     		
	     		current_board.step();

	     });
	    	
		   
	     //Stop simulation
	    $(".stop_btn").click(function(){
	    	clearInterval(runningSim);
	    	$(this).addClass('hidden');
    		$('.run_btn').removeClass('hidden');
	    	
	    });
	     //Clear the board simulation
	    $(".clear_btn").click(function(){
	    	start_empty();
	    	
	    });



});