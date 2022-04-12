const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const winningScreen = document.getElementById('winning-screen');
const winningText = document.getElementById('winning-text');
const restartBtn = document.getElementById('restart-btn');
const X_CLASS = "x",
  O_CLASS = "o",
  WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,2,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  let isOTurn;
  
  startGame();
  restartBtn.addEventListener('click', restartGame);

function startGame() {
  isOTurn = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();  
}

function handleClick(e){
  const currentCell = e.target;
  const currentClass = isOTurn? O_CLASS: X_CLASS;
  placeMark(currentCell, currentClass);
  if(checkWin(currentClass)) return showResult(currentClass);
  else if(checkDraw()) return showDraw();
  else{
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMark(currentCell, currentClass) {
  currentCell.classList.add(currentClass);
}

function swapTurns() {
  isOTurn = !isOTurn;
}

function setBoardHoverClass() {
  removeBoardHoverClass();
  if(isOTurn) board.classList.add(O_CLASS);
  else board.classList.add(X_CLASS);
}

function removeBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
}

function resetCell(){
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
  });
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination =>{
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function showResult(currentClass) {
  winningScreen.classList.add('active');
  winningText.innerText = `${currentClass} wins!`;
}

function checkDraw() {
  let fillcount = 0;
  cells.forEach((cell)=>{
    if(cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS))
      fillcount++; 
  });
  if(fillcount === 9) return true;
}

function showDraw() {
  winningScreen.classList.add('active');
  winningText.innerText = "It's a Draw.";
}

function restartGame() {
  winningScreen.classList.remove("active");
  resetCell();
  startGame();
}