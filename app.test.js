const invoices = require("./JSON/invoices.json");
const plays = require("./JSON/plays.json");
const { statement } = require("./app");

test('first', () => {
  statement(invoices[0], plays);
});
