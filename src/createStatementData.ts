import invoice from '../JSON/invoice.json';
import plays from '../JSON/plays.json';

export interface StatementData {
  customer: string;
  performances: {
    playID: string;
    play: { name: string; type: string };
    audience: number;
    amount: number | string;
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

/**
 * @description 계산기 클래스
 */
class PerformanceCalculator {
  performance: { playID: string; audience: number };
  play: { type: string; name: string };

  constructor(
    perf: { playID: string; audience: number },
    aPlay: { type: string; name: string }
  ) {
    this.performance = perf;
    this.play = aPlay;
  }
  // amount 메소드 삭제

  public get volumeCredits(): number {
    let result = 0;
    result = Math.max(this.performance.audience - 30, 0);
    if (this.play.type === 'comedy') {
      result += Math.floor(this.performance.audience / 5);
    }
    return result;
  }
}

class tragedyCalculator extends PerformanceCalculator {
  // 서브클래스 -> constructor 필요 없음
  public get amount(): number {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class comedyCalculator extends PerformanceCalculator {
  // 서브클래스 -> constructor 필요 없음
  public get amount(): number {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}

/**
 * @description 팩토리 함수의 추가 (생성자 클래스-PerformanceCalculator-를 호출한다) 기존의 클래스는 서브클래스 2개로 확장된다. (...extends...)
 */
function createPerformanceCalculator(
  performance: InvoicePerformance,
  play: { type: string; name: string }
) {
  // return new PerformanceCalculator(performance, play)
  /**
   * 1.분기 로직 이동
   * 2.케이스에 따라 서브클래스 인스턴스 생성
   * */

  switch (play.type) {
    case 'tragedy':
      return new tragedyCalculator(performance, play);
    case 'comedy':
      return new comedyCalculator(performance, play);
    default:
      throw new Error(`Unknown Genre ${play.type}`);
  }
}

export function enrichPerformance(perf: { playID: string; audience: number }) {
  const calculator = createPerformanceCalculator(perf, playFor(perf));
  // const calculator = new PerformanceCalculator(perf, playFor(perf));

  const result: {
    play: { name: string; type: string };
    amount: number | string;
    volumeCredits: number;
    playID: string;
    audience: number;
  } = Object.assign(
    { play: { name: '', type: '' }, amount: 0, volumeCredits: 0 },
    perf
  );

  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;

  return result;
}

interface InvoicePerformance {
  playID: string;
  audience: number;
}

export function playFor(perf: InvoicePerformance) {
  return plays[perf.playID];
}

export function amountFor(perf: Performance) {
  return new PerformanceCalculator(perf, playFor(perf)).amount;
}

/**
 * @returns 최종 합계
 */
export function totalAmount(data: StatementData) {
  return data.performances.reduce(
    (total: number, { amount }: { amount: number | string }) => {
      if (typeof amount === 'string') return total + 0;
      return total + amount;
    },
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
