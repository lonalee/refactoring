import invoice from '../JSON/invoice.json';
import plays from '../JSON/plays.json';

export interface StatementData {
  customer: string;
  performances: {
    playID: string;
    play: { name: string; type: string };
    audience: number;
    amount: number;
    volumeCredits: number;
  }[];
  totalAmount: number;
  totalVolumeCredits: number;
}
interface Performance {
  playID: string;
  play: { name: string; type: string };
  audience: number;
  amount: number;
  volumeCredits: number;
}

export function createStatementData() {
  const statementData: StatementData = {
    customer: '',
    performances: [],
    totalAmount: 0,
    totalVolumeCredits: 0,
  };
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}

export function enrichPerformance(perf: { playID: string; audience: number }) {
  const result = Object.assign(
    { play: { name: '', type: '' }, amount: 0, volumeCredits: 0 },
    perf
  );

  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditsFor(result);

  return result;
}

export function playFor(perf: Performance) {
  return plays[perf.playID];
}

export function amountFor(perf: Performance) {
  let result = 0;

  switch (perf.play.type) {
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
      throw new Error(`Unknown Genre ${perf.play.type}`);
  }
  return result;
}
/**
 * @description 공연별 크레딧 누적
 * @param credits
 */
export function volumeCreditsFor(perf: Performance) {
  let result = 0;
  result = Math.max(perf.audience - 30, 0);
  if (perf.play.type === 'comedy') {
    result += Math.floor(perf.audience / 5);
  }
  return result;
}

/**
 * @returns 최종 합계
 */
export function totalAmount(data: StatementData) {
  return data.performances.reduce(
    (total: number, { amount }: { amount: number }) => total + amount,
    0
  );
}

/**
 * @returns 최종 크레딧
 */
export function totalVolumeCredits(data: StatementData) {
  return data.performances.reduce(
    (total: number, { volumeCredits }: { volumeCredits: number }) =>
      total + volumeCredits,
    0
  );
}
