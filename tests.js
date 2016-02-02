
test('constructor', function() {
   var b = BoardModel([[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,0]]);
   console.log(b.toString());
   ok(b.toString() == '[[0 0 0 0 ][0 0 0 0 ][0 0 1 0 ][0 0 0 0 ]]', 'constructs the BoardModel properly');

});

test('constructor', function() {
   var b = BoardModel();
   
   ok(b.getBoard().length==50);

});

// Check if getBoard works 
test('getBoard()', function(){
    var b = BoardModel([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);

    deepEqual(b.getBoard(), [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], "Correct output for single character");
});


//Check if it catches faulty inputs
test( "throws", function( assert ) {
 
 assert.throws(
    function() {
      var b = BoardModel([[0,0,0,0],[0,0,0,0],[0,0,1,0],[0,0,0,0,0]]);
    },
    "throws error when non rectangular arguement is given"
  );

});

//Thoroughly tests if countLiveNeighbors works properly. Evaluates all the possible cases
//Since there are only a finite number of them.
test('countLiveNeigbors()', function(){
  var b1 = BoardModel([[0]]);
  ok(b1.countLiveNeighbors(0,0) == 0, 'returns proper value for a 1 dimensional array');
  var b2 = BoardModel([[0,0,0,0,0],[0,1,1,1,0],[1,1,1,1,1],[0,1,1,1,0],[1,0,1,1,1]]);
  ok(b2.countLiveNeighbors(0,4) == 1, 'returns 1 for one neighbour');
  ok(b2.countLiveNeighbors(0,1) == 2, 'returns 2 for 2 neighbours');
  ok(b2.countLiveNeighbors(0,2) == 3, 'returns 3 for 3 neighbours');
  ok(b2.countLiveNeighbors(3,4) == 5, 'returns 5 for 5 neighbours');
  ok(b2.countLiveNeighbors(3,0) == 4, 'returns 4 for 4 neighbours');
  ok(b2.countLiveNeighbors(3,1) == 6, 'returns 6 for 6 neighbours');
  ok(b2.countLiveNeighbors(3,3) == 7, 'returns 7 for 7 neighbours');
  ok(b2.countLiveNeighbors(2,2) == 8, 'returns 8 for 8 neighbours');
  var b3 = BoardModel([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  ok(b3.countLiveNeighbors(0,4) == 0, 'returns 0 for no neighbour');

  var b6 = BoardModel([[0,0,1,0,0],[0,0,0,0,0],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]]);
  ok(b6.countLiveNeighbors(2,2) == 2, 'returns 0 for no neighbour');

});


//Thoroughly tests if step works properly.
test('step()', function(){
  var b1 = BoardModel([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  b1.step();
  deepEqual(b1.getBoard(), [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], "Correct output for empty BoardModel");
  var b2 = BoardModel([[1]]);
  b2.step();
  deepEqual(b2.getBoard(), [[0]], "Correct output for single character");
  var b3 = BoardModel([[0,0,0,0,0],[0,0,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  b3.step();
  deepEqual(b3.getBoard(), [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], "live cell with fewer than two live neighbours dies");
  var b4 = BoardModel([[0,0,1,1,0],[0,0,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  b4.step();
  deepEqual(b4.getBoard(), [[0,0,1,1,0],[0,0,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],], "live cell with more than three live neighbours dies");
  var b5 = BoardModel([[0,0,1,0,0],[0,0,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]);
  b5.step();
  deepEqual(b5.getBoard(), [[0,0,1,1,0],[0,0,1,1,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], "live cell with more than three live neighbours dies");

  var b6 = BoardModel([[0,0,1,0,0],[0,0,0,0,0],[0,1,0,1,0],[0,0,0,0,0],[0,0,0,0,0]]);
  b6.step();
  deepEqual(b6.getBoard(), [[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], "dead cell with  three live neighbours becomes alive");


});