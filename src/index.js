//
// Variables
//

var baseState = function() {
  return [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];
};
var currentState, turn;

//
// Methods
//

/**
 * Check if there's a winner
 */
var isWinner = function() {
  // Possible winning combinations
  var wins = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 19, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  // Check if there's a winning combo
  var isWinner = wins.filter(function(win) {
    return (
      currentState[win[0]] &&
      currentState[win[0]] === currentState[win[1]] &&
      currentState[win[0]] === currentState[win[2]] &&
      currentState[win[0]] === currentState[win[3]] &&
      currentState[win[0]] === currentState[win[4]]
    );
  });

  // Return the winner, or false if there isn't one
  return isWinner.length > 0 ? currentState[isWinner[0][0]] : false;
};

//checks if fitst row cell
//id is integer
//return true return is boolean
var isFirstInRow = function(id) {
  if (id === 0 || id === 5 || id === 10 || id === 15 || id === 20) {
    return id;
  }
};

//checks if last row cell
//id is integer
//reutrn true return is boolean
var isLastInRow = function(id) {
  if (id === 4 || id === 9 || id === 14 || id === 19 || id === 24) {
    return id;
  }
};

//state is array(board state)
//winner is boolean, true if one player win game
//returns string(markup)
var buildSquares = function(state, winner) {
  // Setup rows
  var rows = "";

  // Loop through each square in the state
  state.forEach(function(square, id) {
    // Variables
    var value = square ? square : "";
    var selected = square ? ' aria-pressed="true"' : "";
    var disabled = square || winner ? " disabled" : "";

    // Check if it's a new row
    if (isFirstInRow(id)) {
      rows += "<tr>";
    }
    rows +=
      '<td class="game-square" data-id="' +
      id +
      '"' +
      selected +
      disabled +
      ">" +
      value +
      "</td>";

    //rows +=
    //'<td><button class="game-square" data-id="' +
    //id +
    //'"' +
    //selected +
    //disabled +
    //">" +
    //value +
    //"</button></td>";

    // Check if it's the last column in a row
    if (isLastInRow(id)) {
      rows += "</tr>";
    }
  });

  return rows;
};

//build game boear
//state is array to build from
//returns string markup based in state
var buildBoard = function(state) {
  // Check if there's a winner
  var winner = isWinner();

  // Setup the board
  var rows = winner
    ? "<p><strong>" + winner + " is the winner!</string></p>"
    : "";
  rows += "<table><tbody>";

  // Create each square
  rows += buildSquares(state, winner);
  rows += '</tbody></table><p><button id="play-again">Play Again</button></p>';

  return rows;
};

//updates board based on state
//state is array updates from (optional, defaults to currentState)
var updateBoard = function(state) {
  var gboard = document.querySelector("#board");
  if (!gboard) return;
  gboard.innerHTML = buildBoard(state || currentState);
};

//render the board again based on current users turn
//square is node that was selected
var renderTurn = function(square) {
  // Get selected value
  var selected = square.getAttribute("data-id");
  if (!selected) return;

  // Update state
  currentState[selected] = turn;

  // Render with new state
  updateBoard();

  // Update turn
  turn = turn === "X" ? "O" : "X";
};

/**
 * Reset the board to it's base state
 */
var resetBoard = function() {
  currentState = baseState();
  turn = "X";
  updateBoard();
};

//
// Inits & Event Listeners
//

// Setup the board
resetBoard();

// Listen for selections
document.addEventListener(
  "click",
  function(event) {
    // If a .game-square was clicked
    if (
      event.target.matches(".game-square") &&
      !event.target.hasAttribute("disabled")
    ) {
      renderTurn(event.target);
    }

    // If #play-again was clicked
    if (event.target.matches("#play-again")) {
      resetBoard();
    }
  },
  false
);
