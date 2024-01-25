// deposit some money
// Determine the number of lines to bet on
// collect the bet amount
// spin the slot machine
// check if the user won
// give the user their winnings
// play again


const nodemon = require('nodemon');
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 3,
    B: 2,
    C: 5,
    D: 1
}

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

// Function to get a valid deposit amount
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

// Function to get a valid number of lines (1-3)
const getNumberOFLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};
// function to enter Bet 
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)) {
            console.log("Invalid Bet, try again.");
        } else {
            return numberBet;
        }
    }
}
// Spin function
const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
     }
     const reels = [];
     for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
           const selectedSymbol = reelSymbols[randomIndex]
           reels[i].push(selectedSymbol);
           reelSymbols.splice(randomIndex, 1);
        }
     }
     return reels;

}
// transposing the reels
const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}
//print out the rows
const printRows = (rows) => {
     for (const row of rows) {
         let rowString = "";
         for (const[i, symbol] of row.entries()) {
            rowString += symbol
            if(i != row.length - 1){
               rowString += " | "
            }
         }  
         console.log(rowString);

        }     
}
// to get winnings
const getWinnings = (rows, bet, lines) => {
         let winnings = 0;

         for(let row = 0; rows < lines; rows++) {
            const symbols = rows[row];
            let allSame = true;

            for (const symbol of symbols) {
                if (symbol != symbols[0]) {
                    allSame = false;
                    break;
                }
            }
            if (allSame){
                winnings += bet * SYMBOL_VALUES[symbols[0]]
            }
         }
         return winnings;
}

// Get deposit amount and number of lines
const game = () => {
let balance = deposit();

while (true){
    console.log("You have a balance of $" + balance);
const numberOfLines = getNumberOFLines(); 
const numberBet = getBet(balance, numberOfLines);
balance -= numberBet * numberOfLines;
const reels = spin();
const rows = transpose(reels);
console.log(reels);
console.log(rows);
printRows(rows);
const winnings = getWinnings(rows, numberBet, numberOfLines);
balance += winnings
console.log("You won, $" + winnings.toString());
if(balance <= 0) {
    console.log("Insufficient funds");
    break;
}
const playAgain = prompt("Do you want to play again (y/n) ");
if (playAgain != "y")break;
}
}
game();
