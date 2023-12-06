const Result = require('./Result');
const Table = require('./Table');
const HMAC = require('./HMAC');
const Menu = require('./Menu');
const process = require('process');

const arguments = process.argv.slice(2);
const args = [...new Set(arguments)];

const resultObj = new Result();
const tableObj = new Table();
const HMACObj = new HMAC();
const menuObj = new Menu(args);

if (args.length < 3 || (args.length % 2 == 0)) {
    process.stdout.write("Invalid arguments! Please, enter 3 or more arguments, also they count must be odd!");
    return;
}

function isBetween(value, min, max) {
    return (value >= min && value <= max) && value !== '';
}

/////////////// MAIN PART ////////////////////////////////////
const randomKey = HMACObj.generateRandomKey(256);
const computerMove = args[Math.floor(Math.random() * args.length)];
const hmac = HMACObj.calculateHMAC(randomKey, computerMove);
console.log(`HMAC: ${hmac}`);
menuObj.display();

process.stdin.setEncoding('utf8');
process.stdin.on('data', input => {
    input = input.trim();

    switch (input) {
        case "0": process.exit(); break;
        case "?": tableObj.drawTable(args);
            menuObj.display(); return;
    }

    const plMove = input - 1;

    if (isBetween(input, 0, args.length)) {
        console.log(`Your move: ${args[plMove]}`);
    } else {
        process.stdout.write("Please, enter a valid move: ");
        return;
    }

    if (HMACObj.checkHMAC(computerMove, hmac, randomKey)) {
        console.log(`Computer move: ${computerMove}`);
        console.log("You " + resultObj.defineWinner(args.indexOf(computerMove), plMove, args) + "!");
        console.log("HMAC Key: " + Buffer.from(randomKey).toString('hex'));
    } else {
        console.log("Error!!! PC is cheating!");
    }
    process.exit();
});