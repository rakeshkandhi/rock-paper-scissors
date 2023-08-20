const express = require('express');
const app = express();
function generateComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
function getWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}
const readline = require('readline');
const { generateComputerChoice, getWinner } = require('./game');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function startGame() {
    rl.question('Enter your name: ', (name) => {
        console.log(`Welcome, ${name}! Let's play Rock-Paper-Scissors.`);
        playRound(name);
    });
}
function playRound(name) {
    rl.question('Enter your choice (rock, paper, or scissors): ', (userChoice) => {
        // Validate user input
        if (['rock', 'paper', 'scissors'].includes(userChoice)) {
            const computerChoice = generateComputerChoice();
            console.log(`Computer chooses ${computerChoice}`);
            const result = getWinner(userChoice, computerChoice);
            console.log(result);
            rl.question('Do you want to play again? (yes/no): ', (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    playRound(name);
                } else {
                    console.log('Thanks for playing! Goodbye.');
                    rl.close();
                }
            });
        } else {
            console.log('Invalid choice. Please try again.');
            playRound(name);
        }
    });
}
module.exports = { generateComputerChoice, getWinner };
app.get('/', (req, res) => {
    startGame();
    res.send('Successful response.');
});
app.listen(3000);