class Result {  
    defineWinner(pcMove, plMove, args) {
      const half = (args.length - 1) / 2;
      if (pcMove === plMove) {
        return "draw";
      } else if (
        (plMove > pcMove && plMove - pcMove <= half) ||
        (plMove < pcMove && pcMove - plMove > half)
      ) {
        return "win";
      } else {
        return "lose";
      }
    }
  }
  
  module.exports = Result;  