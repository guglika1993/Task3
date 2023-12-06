const asciiTable = require('ascii-table');
const Result = require('./Result');

class Table{
  
  draw(header, rows) {
    const table = new asciiTable();

    table.setHeading(header);

    rows.forEach(row => {
      table.addRow(row);
    });

    console.log(table.toString());
  }

  drawTable(args) {
    const resultObj = new Result;
    let row = [];
    const header = ["v PC/USER >"].concat(args);
    const rows = [];

    for (let i = 0; i < args.length; ++i) {
        row.push(args[i]);
        for (let j = 0; j < args.length; ++j) {
          row.push(resultObj.defineWinner(i, j, args));
        }
        rows.push([...row]);
        row = [];
    }
    this.draw(header, rows);
  }
}

module.exports = Table;