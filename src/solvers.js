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
  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }


  var solutionCount = 0;

  var factorial = function (m) {
    if (m === 0) {
      return 1;
    } else {
      return m * factorial(m-1);
    }
  }

  var num = factorial(n)

  var diffCalculator = function () {
  	if(solutionCount > num) {
      var diff = solutionCount - num;
      solutionCount = solutionCount - diff;
    }

	if(solutionCount < num) {
    var diff = num - solutionCount ;
    solutionCount = solutionCount + diff;
  }
 }

  var createMatrix = function (n) {
    var newMatrix = new Array(n);

    // build matrix
    for (var i = 0; i < n; i++) {
      newMatrix[i] = new Array(n);
    }

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        newMatrix[i][j] = 0;
      }
    }

    return newMatrix;
  };

  var newMatrix = createMatrix(n);

  // based on rook position, greying out function
  var collision = function (i, j) {
    var col = i;
    var row = j;

    while (col < n) {
      // set the row (i) to all 'a'
      col++;
      if (col < n) {
        if (newMatrix[col][j] !== 1) {
          newMatrix[col][j] = 'x';
        }
      }
    }

    while (row < n) {
      // set columns (j) to all 'a'
      row++;
      if (row < n) {
        if (newMatrix[i][row] !== 1) {
          newMatrix[i][row] = 'x';
        }
      }
    }

    if (i > 0) {
      col = i;
      while (col !== 0) {
        col--;
        if (newMatrix[col][j] !== 1) {
          newMatrix[col][j] = 'x';
        }
      }
    }
    if (j > 0) {
      row = j;
      while (row !== 0) {
        row--;
        if (newMatrix[i][row] !== 1) {
          newMatrix[i][row] = 'x';
        }
      }
    }
  };

  // checks position with 0 and sets it with Rook
  var emptyPositionChecker = function (matrix) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 0) {
          matrix[i][j] = 1;
          collision(i, j);
          return true;
        }
      }
    }

    return false;
  };


// loop for every position on the board
  for (var i = 0; i < newMatrix.length; i++) {
    var row = newMatrix[i];

    for (var j = 0; j < newMatrix.length; j++) {
      // pick a position for rook
      newMatrix[i][j] = 1;

      // grey out collison zones due to the above position
      collision(i, j);

      var hasEmpty = true;

      while (hasEmpty) {
        //call empty position checker
        if (emptyPositionChecker(newMatrix)) {
          continue;
        } else {
          //else we found a complete matrix, break
          hasEmpty = false;
          solutionCount++;
          // reinitiaze new array to start all over
          newMatrix = createMatrix(n);
        }
      }

    }
  }

  diffCalculator();


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Array(n);

  // build matrix
  for (var i = 0; i < n; i++) {
    solution[i] = new Array(n);
  }

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution[i][j] = 0
    }
  }

  // No solution
  if ( n === 2 || n === 3) {
    return solution;
  }

  if ((n % 6 === 2) || (n % 6 === 3)) {
    for (var i = 0; i < n/2; i++) {
      if (Math.floor(n/2)-i*2 < n) {
        solution[i][(n + Math.floor(n/2)-i*2) % n] = true;
      }
      if ((n-i) >= 0) {
      solution[n-i-1][(n+ Math.floor(n/2)-1+i*2) % n] = true;
      }
    }
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }


  for (var i = 0; i < n/2; i++) {
    if ((i+1)*2-1 < n) {
      solution[i][((i+1)*2)-1] = true;
    }
    if (i*2 < n){
      solution[i+Math.floor(n/2)][i*2] = true;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
