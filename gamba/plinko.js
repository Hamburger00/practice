// plinko.js
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const startSize= 2;
const endSize = 9; // Needs to be an odd number to work properly
const rows = endSize - startSize;
let currentRow = 0;
let currentCol = 0;
let intervalId;
let board = [];
let betSize;

function startGame() {
    rl.question("Bet size: ", (answer) => {
        if (answer === null || answer === undefined || answer.match(/^\d+$/)) {
            betSize = Number(answer);
            constructBoard();
            intervalId = setInterval(nextDrop, 500);
        } else {
            console.log("Incorrect bet size, make sure its a number :)");
        }

        rl.close();
    })
}

startGame();

function constructBoard() {
    for (let i = startSize; i <= endSize; i++) {
        const spacing = endSize + i;
        const row = [""];
        for (let j = 1; j <= i; j++) {
            // Could change this to not be a number
            row.push(`${j} `)
        }

        board.push(row.join('').padStart(spacing, ' ') + '\n');
    }
}

function nextDrop() {
    if (currentRow > rows) {
        clearInterval(intervalId);
        getResults();
        console.log("game is over\n");
        return;
    }

    let dropped;
    if (currentRow === 0) {
        dropped = Math.floor(Math.random() * startSize + 1);
        currentCol = dropped;
    } else {
        const leftOrRight = Math.floor(Math.random() * 2);
        dropped = currentCol + leftOrRight;
        currentCol = dropped;
    }

    board[currentRow] = board[currentRow].replace(dropped.toString(), 'x');
    console.log(board.join(''));

    currentRow++;
}

function getResults() {
    const middleCol = Math.round(endSize / 2);
    const distance = Math.abs(currentCol - middleCol);

    const multi = 0.5 * Math.pow(2, distance);
    const result = betSize * multi;

    console.log("Return =", result)
}