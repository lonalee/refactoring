import invoice from '../JSON/invoice.json';
import plays from '../JSON/plays.json';
import { createStatementData, StatementData } from './createStatementData';

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

/**
 * @description 공연별 크레딧 누적
 * @param credits
 */
export function getVolumeCredits(perf: Performance) {
  let result = 0;
  result = Math.max(perf.audience - 30, 0);
  if (playFor(perf).type === 'comedy') {
    result += Math.floor(perf.audience / 5);
  }
  return result;
}

/**
 * @returns 최종 크레딧
 */
export function getTotalVolumeCredits() {
  let volumeCredits = 0;
  invoice.performances.forEach((perf) => {
    volumeCredits += getVolumeCredits(perf);
  });
  return volumeCredits;
}

/**
 * @returns 최종 합계
 */
export function getTotalAmount() {
  let result = 0;
  invoice.performances.forEach((perf) => {
    result += amountFor(perf);
  });
  return result;
}


export function renderPlainText(statementData: StatementData) {
  let result = `청구 내역 (고객명: ${statementData.customer})\n`;
  // 공연별 비용을 계산해서 문자열로 만드는 로직
  invoice.performances.forEach((perf) => {
    result += `${playFor(perf).name} : ${formatting(amountFor(perf))} (${perf.audience
      }석)\n`;
  });

  // result += `적립포인트 : ${getTotalVolumeCredits()}\n`;
  result += `적립포인트 : ${statementData.totalVolumeCredits}\n`;
  // result += `총액 : ${formatting(getTotalAmount())}`;
  result += `총액 : ${statementData.totalAmount}`;
  return result;
}

export function enrichPerformance(perf: Performance) {
  const result = Object.assign({}, perf)
  return result
}


export function statement() {
  return renderPlainText(createStatementData());
}
