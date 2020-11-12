/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*
    Rook:
        [r][][][]
        [][r][][]
        [][][r][]
        [][][][r]
    Rook2:
        [] [r][] []
        [r][] [][]
        [] [] [] [r]
        [] [] [r] []
 */
window.findNRooksSolution = function(n) {
  var solution = new Array(n);

  // build matrix
  for (var i = 0; i < n; i++) {
    solution[i] = new Array(n);
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (i === j) {
        solution[i][j] = 1;
      } else {
        solution[i][j] = 0;
      }
    }
  }



  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // console.group('nRook matrix:');
  // console.log(solution)
  // console.groupEnd();
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;

  var getFactorial = function(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * getFactorial(n - 1);
    }
  };

  solutionCount = getFactorial(n);
  console.log(solutionCount);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
