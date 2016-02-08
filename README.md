Game Of Life Simulator
======================
board_model.js
--------------

An internal representation of the board. It abstracts a Game of Life board by 1 (to represent a live cell) and 0 (to represent a dead cell). It exposes the following methods
* ``boardModelInstance.forEachCell (callback)`` calls the given function with each cell of the board as an input.
* ``boardModelInstance.toString()`` returns an user friendly string representation of the board
* ``boardModelInstance.turnOn(row, col)`` changes the value of a cell to 1.
* ``boardModelInstance.turnOff(row, col)`` changes the value of a cell to 0.
* ``boardModelInstance.countLiveNeighbors(row, col)`` the number of live neighbors around a cell at `row, col`.
* ``boardinstance.step()`` evaluates the next state of the board and changes the internal representation accordingly. Returns `true` if the board is empty. 

board.js
--------------

Board is an actual visual representation of a Game of Life board. It creates the board from
any given valid array. It also creates a Board object from an html representation of a board.
Abstraction Function:  `(BoardModel, ContainerClass) -> Board `
Board is a mutable object.
* ``Board(boardModel, boardContainer)`` returns a new `Board` object whose internal representaion is given by `boardModel`.
* ``boardInstance.forEachCell (callback)`` calls the given function with each cell of the board as an input.
* ``boardInstance.turnOn(row, col)`` changes the value of a cell to alive and updates the model accordingly.
* ``boardInstance.turnOff(row, col)`` changes the value of a cell to dead and updates the model accordingly.
* ``boardInstance.isOn(row, col)`` returns `true` if a cell is alive.
* ``boardInstance.flip(row, col)`` nagates the value of a cell and updates the model accordingly.

* ``boardInstance.installBoard()`` installs a new board widget on `boardContainer`.
* ``boardInstance.updateBoard()`` Updates the board, applies changes, if there are any, in the model representation.
* ``boardInstance.fromBoard()`` instantiates a board model based on the widget. Used when users make changes to the board from the front end.
* ``boardinstance.step()`` evaluates the next state of the board and changes the internal representation accordingly. Returns `true` if the board is empty. 

board_controller.js
-------------------
A controller class for the board. All of the events and user inputs are handled in this
class. 
Different starting configurations are stored in this class. 
Initializes the page with an empty board.

