import { statement, amountFor, playFor, enrichPerformance } from './typedApp';
import invoice from './JSON/invoice.json';
import plays from './JSON/plays.json';

describe('', () => {
  test('test statement', () => {
    const res = statement();
    const expected =
      '청구 내역 (고객명: BigCo)\nHamlet : ₩65,000 (55석)\nAs you like it : ₩58,000 (35석)\nOthello : ₩50,000 (40석)\n적립포인트 : 47\n총액 : ₩173,000';
    console.log(res);
    expect(res).toEqual(expected);
  });

  test('test playFor', () => {
    const expected = { name: 'Hamlet', type: 'tragedy' };
    const res = playFor(invoice.performances[0]);
    expect(res).toEqual(expected);
  });
  test('test enrichPerformance', () => {
    const mockEnrichPerformance = jest.fn<typeof enrichPerformance, {}[]>();
    const result = mockEnrichPerformance.mockImplementation();
    console.log('RESULT', result);
  });
});
