// blackjack.js
const { styledLogs } = require("../utils/styled-logs/styledLogs");

const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const singleDeck = [
	"♦2", "♦3", "♦4", "♦5", "♦6", "♦7", "♦8", "♦9", "♦10", "♦J", "♦Q", "♦K", "♦A",
	"♠2", "♠3", "♠4", "♠5", "♠6", "♠7", "♠8", "♠9", "♠10", "♠J", "♠Q", "♠K", "♠A",
	"♥2", "♥3", "♥4", "♥5", "♥6", "♥7", "♥8", "♥9", "♥10", "♥J", "♥Q", "♥K", "♥A",
	"♣2", "♣3", "♣4", "♣5", "♣6", "♣7", "♣8", "♣9", "♣10", "♣J", "♣Q", "♣K", "♣A",
];
const decksInShoe = 6; // decides how many decks are in a shoe, typically 6 or 8
let shoe = [];
let currentRound = 1;
let money = 1000;

function startGame() {
	for (let i = 0; i < decksInShoe; i++) {
		shoe.push(...singleDeck);
	}
	console.log(`Welcome to BlackJack ♦️ ♠️ ♥️ ♣️\nYou start with $${money}`);
	startRound();
}

function startRound() {
	const askBetSize = () => {
		rl.question("Input bet size: ", (betSizeInput) => {
			if (!betSizeInput.match(/^\d+$/)) {
				styledLogs(
					"red",
					"Invalid input. Please enter a number.",
					"underscore"
				);
				askBetSize();
				return;
			}
			const betSize = Number(betSizeInput);
			if (betSize > money) {
				styledLogs(
					"red",
					"Your betSize is more than ur current money: " + money,
					"underscore"
				);
				askBetSize();
				return;
			}
			console.log(
				`Starting Round ${currentRound} with bet size ${betSize}`
			);
			let dealersHand = drawCard(2);
			let shownDealersHand = dealersHand[0];
			let playersHand = drawCard(2);
			console.log(`Dealers Hand: ${shownDealersHand}`);
			console.log(`Player Hand: ${playersHand}`);

			let playerOptions = determineOptions(playersHand);

			rl.question(playerOptions, (playerAction) => {
				if (!playerAction.match(/^\d+$/)) {
					styledLogs(
						"red",
						"Invalid input. Please enter a number from the options below",
						"underscore"
					);
					// TODO: Print options again
				}
			});
		});
	};

	askBetSize();
}

function drawCard(count) {
	let cards = [];
	for (let i = 0; i < count; i++) {
		const rand = Math.floor(Math.random() * shoe.length);
		const cardDrawn = shoe.splice(rand, 1);
		cards.push(cardDrawn.join(","));
	}
	return cards;
}

function determineOptions(currentCards) {
	options = []; // 1: Stand, 2: Hit, 3: Double down, 4: Split

	switch (cardsSum(currentCards)) {
		case "21":
            styledLogs("green", "Blackjack") //TODO: Handle blackjack
			break;
        
		default:
			styledLogs(
				"red",
				"ehmmm.... welp its not supposed to reach this code ._."
			);
	}

	return options;
}

const cardsSum = (currentCards) => {
    let sum = 0;

    for (let i = 0; i < currentCards.length; i++) {
        let rank = currentCards[i].slice(1);
        if (["J", "Q", "K"].includes(rank)) {
            rank = 10;
        }
        else if (rank === "A") {
            rank = 11;
        }
        else {
            rank = parseInt(rank, 10);
        }
        sum += rank;
    }

    console.log("sum = ", sum);
    return sum;
};

startGame();