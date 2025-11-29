// blackjack.js
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const singleDeck = [
    "♦2", "♦3", "♦4", "♦5", "♦6", "♦7", "♦8", "♦9", "♦10", "♦J", "♦Q", "♦K", "♦A",
    "♠ ️2", "♠3", "♠4", "♠5", "♠6", "♠7", "♠8", "♠9", "♠10", "♠J", "♠Q", "♠K", "♠A",
    "♥2", "♥3", "♥4", "♥5", "♥6", "♥7", "♥8", "♥9", "♥10", "♥J", "♥Q", "♥K", "♥A",
    "♣2", "♣3", "♣4", "♣5", "♣6", "♣7", "♣8", "♣9", "♣10", "♣J", "♣Q", "♣K", "♣A",
]
const decksInShoe = 6; // decides how many decks are in a shoe, typically 6 or 8
let shoe = [];
let currentRound = 1;
let money = 1000;

function startGame() {
    for (let i = 0; i < decksInShoe; i++) {
        shoe.push(...singleDeck);
    }
    console.log(`Welcome to BlackJack♦️ ♠️ ♥️ ♣️\nYou start with $${money}`);
    startRound();
}

function startRound() {
    const askBetSize = () => {
        rl.question('Input bet size: ', (betSizeInput) => {
            if (!betSizeInput.match(/^\d+$/)) {
                console.log('Invalid input. Please enter a number.');
                askBetSize();
                return;
            }
            const betSize = Number(betSizeInput);
            if (betSize > money) {
                console.log('Your betSize is more than ur current money: ' + money);
                askBetSize();
                return;
            }
            console.log(`Starting Round ${currentRound} with bet size ${betSize}`);
            let dealersHand = drawCard(2);
            let shownDealersHand = dealersHand[0];
            let playersHand = drawCard(2);
            console.log(`Dealers Hand: ${shownDealersHand}`);
            console.log(`Player Hand: ${playersHand}`);

            let options = "(1) Stand, (2) Hit";

            rl.question(options)
        });
    };

    askBetSize();
}

function drawCard(count) {
    let cards = [];
    for (let i = 0; i < count; i++) {
        const rand = Math.floor(Math.random() * shoe.length);
        const cardDrawn = shoe.splice(rand, 1);
        cards.push(cardDrawn.join(','));
    }
    return cards;
}

startGame();