const invoices = require("./JSON/invoices.json");
const plays = require("./JSON/plays.json");

function statement(invoice, plays) {
  // (23.01.17) 두 함수 간 데이터 구조 역할을 할 객체
  const statementData = {
    totalAmount: 0,
    totalVolumeCredits: 0,
    /**
     * customer: String
     * performances: Array
     */
  };
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  /**
   * @description plays json으로부터 공연의 제목/장르를 리턴하는 함수
   * @param {*} aPerformance
   * @returns
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  /**
   * @description 기존의 switch 구문을 별도의 함수로 추출.
   * 1. 분기에 따라 thisAmount에 재할당하던 것을
   * 함수에서 리턴하도록 변경
   * 2.
   */
  function amountFor(perf) {
    let thisAmount = 0;
    switch (perf.play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 30);
        }

        thisAmount += 300 * perf.audience;
        break;

      default:
        break;
    }
    return thisAmount;
  }

  /**
   * 공연 당 포인트를 계산한다. (일정 관객 수 이상 입장 시 인당 포인트 계산)
   * @param {*} perf 공연 내역 (입장 관객 수, 장르)
   * @returns
   */
  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);

    if ('comedy' === perf.play.type) result += Math.floor(perf.audience / 5);
    return result;
  }

  // 공연별 세부 내역을 연산하는 함수
  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); // 얕은 복사 수행
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    statementData.totalAmount += result.amount;
    statementData.totalVolumeCredits += result.volumeCredits;

    return result;
  }

  return renderPlainText(statementData, invoice, plays);
}

// (23.01.17) 나머지 두 인수 invoice, plays를 통해 전달되는 데이터를 statementData로 옮기면 계산 관련 코드는 전부 statement함수로 모으고 renderPlainText는 data 매개변수로 전달된 데이터만 처리할 수 있다.

/** (23.01.17) 본격 리팩터링 순서
 * 1. 고객정보부터 중간 데이터 구조로 옮긴다.
 * 2. 공연정보도 옮긴다.
 * 3. 연극제목도 옮긴다.
 * 4. playFor / amountFor / 적립포인트 계산 함수
 * 5. 총합 계산 부분을 옮긴다.
 * 5-1. enrichPerformance에서 공연별 세부 내역을 계산한다. 따라서 누적 변수를 정의하고 이 함수가 호출될 때마다 amount를 누적할 수 있다. O
 * 5-2. totalAmount 함수를 그대로 옮겨서 사용하고, statementData 객체에 누적용 키에 인라인으로 작성한다.
 * 6. 반복문을 파이프라인으로 바꾸기
 * */

/**
 *
 * @param {*} data
 * @param {*} invoice
 * @param {*} plays
 * @returns
 */
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  // result += `총액: ${format(totalAmount())}\n`;
  // totalAmount 사용하지 않음 -> data 매개변수로부터 totalAmount키를 참조한다.
  result += `총액: ${format(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}\n`;

  // 메소드를 변수에 할당해서 사용했다. 이것을 함수로 변형한다.
  function format(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  /**
   * @description 늘어난 반복문으로 인한 성능 이슈? --> 괜한 걱정이라는 것이 결론. 혹여나 영향이 있더라도 깔끔한 코드베이스에 성능개선을 추구하는 것이 훨씬 좋다!
   * 반복문 하나 더 추가(총3개 만들기)하기 전 실행 시간 => 0.297s -> 0.157s???
   */

  for (let perf of data.performances) {
    /**
     * plays에는 공연정보, perf는 각 공연 입장 관객 수+공연의 ID
     */

    result += ` ${perf.play.name}: ${format(perf.amount)} (${
      perf.audience
    }석)\n`;
  }
  return result;
}

module.exports = { statement };
