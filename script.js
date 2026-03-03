const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", cellClick));
restartBtn.addEventListener("click", restartGame);

function cellClick() {
    const index = this.dataset.index;

    if (board[index] !== "" || !running) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    // Color X and O differently
    if (currentPlayer === "X") {
        this.style.color = "#2980b9";
    } else {
        this.style.color = "#e74c3c";
    }

    checkWinner();
}

function checkWinner() {
    for (let condition of winConditions) {
        const [a,b,c] = condition;

        if (board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]) {

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            statusText.textContent = `🎉 Player ${board[a]} Wins!`;
            running = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        running = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "";
        cell.classList.remove("win");
    });
}