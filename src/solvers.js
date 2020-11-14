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

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var getBoard = function (n) {
    var matrix = new Array(n);

    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(n);
      for (var j = 0; j < matrix.length; j++) {
        matrix[i][j] = 0;
      }
    }

    return matrix;
  };

  var canPlace = function (matrix, index, startingPoint) {
    // check horizontal for collisions
    for (var i = 0; i < startingPoint; i++) {
      if (matrix[index][i] === 1) {
        return false;
      }
    }

    // valid!
    return true;
  };

  var doWork = function (matrix, startingPoint) {
    if (startingPoint === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      if (canPlace(matrix, i, startingPoint)) {
        matrix[i][startingPoint] = 1;

        doWork(matrix, startingPoint + 1);

        matrix[i][startingPoint] = 0;
      }
    }
  };

  var getSolution = function () {
    var matrix = getBoard(n);

    doWork(matrix, 0);
  };

  getSolution();

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
      solution[i][j] = 0;
    }
  }

  // No solution
  if ( n === 2 || n === 3) {
    return solution;
  }

  if ((n % 6 === 2) || (n % 6 === 3)) {
    for (var i = 0; i < n/2; i++) {
      if (Math.floor(n / 2) - i * 2 < n) {
        solution[i][(n + Math.floor(n / 2) - i * 2) % n] = true;
      }
      if ((n - i) >= 0) {
        solution[n - i -1][(n+ Math.floor(n / 2) - 1 + i * 2) % n] = true;
      }
    }

    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

    return solution;
  }


  for (var i = 0; i < n / 2; i++) {
    if ((i + 1) * 2 - 1 < n) {
      solution[i][((i + 1) * 2) - 1] = true;
    }
    if (i * 2 < n){
      solution[i + Math.floor(n / 2)][i * 2] = true;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var getBoard = function (n) {
    var matrix = new Array(n);

    for (var i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(n);
      for (var j = 0; j < matrix.length; j++) {
        matrix[i][j] = 0;
      }
    }

    return matrix;
  };

  var canPlace = function (matrix, index, startingPoint) {
    // check horizontal for collisions
    for (var i = 0; i < startingPoint; i++) {
      if (matrix[index][i] === 1) {
        return false;
      }
    }

    // check major diagonal for collisions
    for (var i = index, j = startingPoint; i >= 0 && j >= 0; i--, j--) {
      if (matrix[i][j] === 1) {
        return false;
      }
    }

    // check minor diagonal for collisions
    for (var i = index, j = startingPoint; i < n && j >= 0; i++, j--) {
      if (matrix[i][j] === 1) {
        return false;
      }
    }

    // valid!
    return true;
  };

  var doWork = function (matrix, startingPoint) {
    if (startingPoint === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      if (canPlace(matrix, i, startingPoint)) {
        matrix[i][startingPoint] = 1;

        doWork(matrix, startingPoint + 1);

        matrix[i][startingPoint] = 0;
      }
    }
  };

  var getSolution = function () {
    var matrix = getBoard(n);

    doWork(matrix, 0);
  };

  getSolution();



  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
