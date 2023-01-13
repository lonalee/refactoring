const assert = require('assert');
const invoices = require('./JSON/invoices.json');
const plays = require('./JSON/plays.json');
const { statement } = require('./app');

test('first', () => {
  const result = statement(invoices[0], plays);
  const compare =
    '청구 내역 (고객명: BigCo)\n총액: $1,680.00\n적립 포인트: 47\n Hamlet: $650.00 (55석)\n As you like it: $530.00 (35석)\n Othello: $500.00 (40석)\n';
  assert.strictEqual(result, compare);
});
