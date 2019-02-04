  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      document.getElementById("totalSquare").innerHTML += "<input id='" + i.toString() + j.toString() + "' class='smallSquares' type='number' min='1' max='5'></input>";
      if (j == 3 || j == 6){
        document.getElementById(i.toString()+j.toString()).style.borderLeft = "2.5px solid black";
      }
      if (i == 3 || i == 6){
        document.getElementById(i.toString()+j.toString()).style.borderTop = "2.5px solid black";
      }
    }
  }
  
  for (let x = 1; x < 7; x++){
    document.getElementById("buttonsHere").innerHTML += "<div id='" + x + "' class='demoButtons'>Demo " + x + "</div>"
  }
  
  //limits inputs to 1-9
  Array.from(document.getElementsByClassName("smallSquares")).forEach(function(x){
      x.onkeyup = function(){
          if (this.value > 9 || this.value <= 0){
            this.value = null;
          }
      }
  });
  
  function fillBoard(array){
    for (let i = 0; i < 9; i++){
      for (let j = 0; j < 9; j++){
        document.getElementById(i.toString()+j.toString()).value = array[i][j];
      }
    }
  }
  
  Array.from(document.getElementsByClassName("demoButtons")).forEach(function(x){
      x.onclick = function(){
        document.getElementById("message").innerHTML = "";      
        document.getElementById("validationMessage").innerHTML = ""; 
        this.id == "1" ? fillBoard(puzzle1) : this.id == "2" ? fillBoard(puzzle2) : this.id == "3" ? fillBoard(puzzle3) : this.id == "4" ? fillBoard(puzzle4) : this.id == "5" ? fillBoard(puzzle5) : fillBoard(puzzle6);
          
      }
  });
  
  document.getElementById("solve").onclick = function(){
    document.getElementById("validationMessage").innerHTML = "";
    sudoku();
  }
  
  
  function sudoku(){
      
    //make puzzle (a nested array) from current board values
    let puzzle = [];
  
    for (let i = 0; i < 9; i++){
      let puzzleLine = [];
      for (let j = 0; j < 9; j++){
        puzzleLine.push(document.getElementById(i.toString()+j.toString()).value);
      }
      puzzle.push(puzzleLine);
    }
  
    const solved = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let blanks;
  
    function trySolve(){
      //gLoop & fLoop provide the data for the nested loop to add the sudoku squares
      let gLoop;
      let fLoop;
      for (let i = 0; i < puzzle.length; i++){
        if (i < 3){
           gLoop = [0, 3];
        } else if (i < 6){
           gLoop = [3, 6];
        } else {
           gLoop = [6, 9];
        }
        for (let j = 0; j < puzzle.length; j++){
          if (j < 3){
             fLoop = [0, 3];
          } else if (j < 6){
             fLoop = [3, 6];
          } else {
             fLoop = [6, 9];
          }
          if (puzzle[i][j] == ""){
            let numbers = [];
            let options = [];
            //adding every number in the horizontal line and vertical lines to array called numbers
            for (let k = 0; k < puzzle.length; k++){
              numbers.push(puzzle[i][k]);
              numbers.push(puzzle[k][j]);
            }
            //also adding every number from the square of the sudoku using data from above
            for (let f = fLoop[0]; f < fLoop[1]; f++){
              for (let g = gLoop[0]; g < gLoop[1]; g++){
                numbers.push(puzzle[g][f]);
              }
            }
            //checks the numbers 1 to 9, and if it's not part of the numbers array, then it's an option
            for (let x = 0; x < solved.length; x++){
              if (numbers.indexOf(solved[x]) == -1){
                options.push(solved[x]);
              }
            }
            if (options.length == 1){
              puzzle[i][j] = options[0];
              document.getElementById(i.toString()+j.toString()).value = options[0];
            }
          }
        }
      }
      // counts the number of zeros in the board
      let count = 0;
      for (let a = 0; a < puzzle.length; a++){
        for (let b = 0; b < puzzle.length; b++){
          if (puzzle[a][b] == ""){
            count++;
          }
        }
      }
      if (count != blanks){
        blanks = count;
        setTimeout(trySolve, 500);
        //if count == 0, then solution is finished. If not run function trySolve() again
      } else if (count == 0){
        document.getElementById("message").innerHTML = "Finished!";
        return "done";
      } else {
        document.getElementById("message").innerHTML = '<p>This sudoku is unsolvable!</p> <p>Or too difficult for me...</p>';
        return "impossible";
      }
    }
  
    trySolve();
  }
  
  
  document.getElementById("validate").onclick = function(){
    
    document.getElementById("message").innerHTML = "";      
    document.getElementById("validationMessage").innerHTML = ""; 
    
    //make puzzle (a nested array) from current board values
    let puzzle = [];
  
    for (let i = 0; i < 9; i++){
      let puzzleLine = [];
      for (let j = 0; j < 9; j++){
        puzzleLine.push(document.getElementById(i.toString()+j.toString()).value);
      }
      puzzle.push(puzzleLine);
    }
    
    const valid = "123456789";
      
    // check validity for horizontal lines
    for (let i = 0; i < 9; i++) {
       let boardLine = [];
       for (let j = 0; j < 9; j++) {
        boardLine.push(puzzle[i][j]);
       }
       if (boardLine.sort().join("") != valid) {
         document.getElementById("validationMessage").innerHTML = "Sudoku board is NOT a valid solution..."; 
         return false;
       }
    }
    
    //check validity for vertical lines
    for (let x = 0; x < 9; x++) {
       let boardLine = [];
       for (let y = 0; y < 9; y++) {
          boardLine.push(puzzle[y][x]);
       }
       if (boardLine.sort().join("") != valid) {
         document.getElementById("validationMessage").innerHTML = "Sudoku board is NOT a valid solution..."; 
         return false;
       }
    }
    
    //check validity for squares
    for (let a = 0; a < 9; a = a + 3) {
       for (let b = 0; b < 9; b= b + 3) {
         let boardLine = [];    
         for (let c = 0; c < 3; c++) {
           for (let d = 0; d < 3; d++){
             boardLine.push(puzzle[c+a][d+b]);
           }
         }
         if (boardLine.sort().join("") != valid) {
           document.getElementById("validationMessage").innerHTML = "Sudoku board is NOT a valid solution..."; 
           return false;
         }
       }
    }
    
    //if validity tests didn't return false, then it's valid!
    document.getElementById("validationMessage").innerHTML = "Sudoku board is a VALID solution!!"; 
    return true;
  }
  
  //demo examples data
  const puzzle1 = [ [ 5, 3, '', '', 7, '', '', '', '' ],
                  [ 6, '', '', 1, 9, 5, '', '', '' ],
                  [ '', 9, 8, '', '', '', '', 6, '' ],
                  [ 8, '', '', '', 6, '', '', '', 3 ],
                  [ 4, '', '', 8, '', 3, '', '', 1 ],
                  [ 7, '', '', '', 2, '', '', '', 6 ],
                  [ '', 6, '', '', '', '', 2, 8, '' ],
                  [ '', '', '', 4, 1, 9, '', '', 5 ],
                  [ '', '', '', '', 8, '', '', 7, 9 ] ];
  
  const puzzle2 = [ [ '', '', 8, '', 3, '', 5, 4, '' ],
                  [ 3, '', '', 4, '', 7, 9, '', '' ],
                  [ 4, 1, '', '', '', 8, '', '', 2 ],
                  [ '', 4, 3, 5, '', 2, '', 6, '' ],
                  [ 5, '', '', '', '', '', '', '', 8 ],
                  [ '', 6, '', 3, '', 9, 4, 1, '' ],
                  [ 1, '', '', 8, '', '', '', 2, 7 ],
                  [ '', '', 5, 6, '', 3, '', '', 4 ],
                  [ '', 2, 9, '', 7, '', 8, '', '' ] ];
  
  const puzzle3 = [ [ '', 1, 9, '', 6, '', 5, 4, '' ],
                  [ '', '', '', '', '', '', '', '', '' ],
                  [ 8, 2, '', 9, 7, 4, '', 3, 6 ],
                  [ '', '', 1, 5, '', 3, 8, '', '' ],
                  [ '', '', '', '', '', '', '', '', '' ],
                  [ '', '', 2, 7, '', 1, 6, '', '' ],
                  [ 7, 5, '', 1, 3, 8, '', 9, 2 ],
                  [ '', '', '', '', '', '', '', '', '' ],
                  [ '', 8, 3, '', 4, '', 7, 1, '' ] ];
  
  const puzzle4 = [ [ '', 4, 6, '', '', '', '', '', '' ],
                  [ 9, '', 2, '', 6, '', '', '', 8 ],
                  [ '', '', 8, 4, '', '', 2, 5, '' ],
                  [ '', '', '', 8, '', '', '', 7, '' ],
                  [ 5, '', '', 7, '', 2, '', '', 3 ],
                  [ '', 1, '', '', '', 6, '', '', '' ],
                  [ '', 6, 4, '', '', 3, 9, '', '' ],
                  [ 3, '', '', '', 8, '', 1, '', 2 ],
                  [ '', '', '', '', '', '', 7, 3, '' ] ];
  
  const puzzle5 = [ [ 6, '', '', 1, '', 8, 2, '', 3 ],
                  [ '', 2, '', '', 4, '', '', 9, '' ],
                  [ 8, '', 3, '', '', 5, 4, '', '' ],
                  [ 5, '', 4, 6, '', 7, '', '', 9 ],
                  [ '', 3, '', '', '', '', '', 5, '' ],
                  [ 7, '', '', 8, '', 3, 1, '', 2 ],
                  [ '', '', 1, 7, '', '', 9, '', 6 ],
                  [ '', 8, '', '', 3, '', '', 2, '' ],
                  [ 3, '', 2, 9, '', 4, '', '', 5 ] ];
                 
  const puzzle6 = [ [ 6, '', 5, 7, 2, '', '', 3, 9 ],
                  [ 4, '', '', '', '', 5, 1, '', '' ],
                  [ '', 2, '', 1, '', '', '', '', 4 ],
                  [ '', 9, '', '', 3, '', 7, '', 6 ],
                  [ 1, '', '', 8, '', 9, '', '', 5 ],
                  [ 2, '', 4, '', 5, '', '', 8, '' ],
                  [ 8, '', '', '', '', 3, '', 2, '' ],
                  [ '', '', 2, 9, '', '', '', '', 1 ],
                  [ 3, 5, '', '', 6, 7, 4, '', 8 ] ];