class Menu {
    constructor(moves) {
        this.moves = moves;
    }

    display() {
        console.log('Available moves:');
        this.moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log('0 - exit');
        console.log('? - help');
        process.stdout.write("Enter your move: ");
    }
}

module.exports = Menu;