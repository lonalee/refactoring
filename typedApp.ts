import invoice from './JSON/invoice.json';
import plays from './JSON/plays.json';

interface Performance {
  playID: string;
  audience: number;
}

interface Play {
  name: string;
  type: string;
}
// interface Play {
//   [key: string]: {
//     name: string;
//     type: string;
//   };
// }

export function amountFor(perf: Performance) {
  let result = 0;
  // play 매개변수 제거, playFor 함수 추출
  switch (playFor(perf).type) {
    case 'tragedy':
      result = 40000;
      if (perf.audience > 30) {
        result += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      result = 30000;
      if (perf.audience > 20) {
        result += 10000 + 500 * (perf.audience - 20);
      }
      result += 300 * perf.audience;
      break;
    default:
      throw new Error(`Unknown Genre ${playFor(perf).type}`);
  }
  return result;
}

export function playFor(perf: Performance) {
  const play = plays[perf.playID];
  return play;
}

/**
 * @description format메소드를 변수에 할당하던 것을 함수로 추출
 * @param amount 형식을 지정할 금액
 */
export function formatting(amount: number) {
  return new Intl.NumberFormat('krw-KR', {
    style: 'currency',
    currency: 'KRW',
    // minimumFractionDigits: 2,
  }).format(amount);
}

export function statement() {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // switch -> amountFor (refactored)
    const thisAmount = amountFor(perf, playFor(perf));

    volumeCredits += Math.max(perf.audience - 30, 0);
    if (playFor(perf).type === 'comedy')
      volumeCredits += Math.floor(perf.audience / 5);

    result += `${playFor(perf).name} : ${formatting(thisAmount)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `적립포인트 : ${volumeCredits}\n`;
  result += `총액 : ${formatting(totalAmount)}`;
  return result;
}
