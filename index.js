const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

// making Variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `player 1: ${currentPlayer}`;
player2.textContent = `player 2: ${nextPlayer}`;

// Function to startyour game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick)

    });
};


const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            // console.log(`${playerTurn} is a winner!`);
            showAlert(`${playerTurn} is a winner!`);
            disableCells();
        }
        else if (checkTie()) {
            // console.log(`Tt's a Tie!`);
            showAlert(`Tt's a Tie!`);
            disableCells();
        }
        else {
            changePlayerTurn();
        }

    }
}

// Function to change Player,s turn
const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }
    // playTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}
// function to check win 
const checkWin = () => {
    const winningConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],

        ];

    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];

        if (gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent) {

            return true;

        }
    }
    return false;
}

// function to check for a tie
const checkTie = () => {
    let emptyCellsCount = 0;

    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !checkWin();
};

// function to disable game-board cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}
// restart game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
}
const showAlert = (msg) => {
    alertBox.computedStyleMap.display = "block";
    alertBox.textContent = msg;
}
restartBtn.addEventListener('click', restartGame);

// calling start function
startGame();


document.getElementById("myBtn").addEventListener("click", function () {
    console.log("Button clicked! (Anonymous function in event handler)");
});




// <script>
//     document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function (element) {
//       element.addEventListener('click', function (e) {
//         e.preventDefault();
//         e.stopPropagation();
//         let submenu = this.nextElementSibling;
//         submenu.classList.toggle('show');
//       });
//     });
//   </script> 





1646             //   <!-- <script>
1647             //     document.write(/\d{4}/.exec(Date())[0])
4648         //   </script> JSPM Universtiy All rights reserved. -->