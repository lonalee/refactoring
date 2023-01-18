import { statement, amountFor, playFor } from './typedApp';
import invoice from './JSON/invoice.json';
import plays from './JSON/plays.json';

describe('', () => {
  test('test statement', () => {
    const res = statement();
    const expected =
      '청구 내역 (고객명: BigCo)\nHamlet : $650.00 (55석)\nAs you like it : $580.00 (35석)\nOthello : $500.00 (40석)\n적립포인트 : 47\n총액 : $1,730.00';
    console.log(res);
    expect(res).toEqual(expected);
  });
  test('test amountFor', () => {
    const res =
      parseInt(
        amountFor(
          invoice.performances[1],
          plays[invoice.performances[1].playID]
        )
      ) / 100;

    console.log('performance is ', invoice.performances[1]);
    expect(res).toBe(580);
  });
  test('test playFor', () => {
    const expected = { name: 'Hamlet', type: 'tragedy' };
    const res = playFor(invoice.performances[0]);
    expect(res).toEqual(expected);
  });
});
