Game Of Life Simulator
======================
board_model.js
--------------

An internal representation of the board. It abstracts a Game of Life board by 1 (to represent a live cell) and 0 (to represent a dead cell). It exposes the following methods
* ``boardinstance.forEachCell (callback)`` calls the given function with each cell of the board as an input.
* ``boardinstance.toString()`` returns an eye-friendly string representation of the board
* ``boardinstance.turnOn(row, col)`` changes the value of a cell to 1.
* ``boardinstance.turnOff(row, col)`` changes the value of a cell to 0.
* ``boardinstance.countLiveNeighbors(row, col)`` the number of live neighbors around a cell at `row, col`.
*``boardinstance.step()`` evaluates the next state of the board and changes the internal representation accordingly. Returns `true` if the board is empty. 



