const invoices = require('./JSON/invoices.json');
const plays = require('./JSON/plays.json');

function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  result += `총액: ${format(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}\n`;

  // 메소드를 변수에 할당해서 사용했다. 이것을 함수로 변형한다.
  function format(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  /**
   * @abstract  지역변수 play에 할당하던 것을 함수가 필요한 곳에 바로바로 할당한다.
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
    switch (playFor(perf).type) {
      case 'tragedy':
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        // console.log('tragedy', thisAmount);
        break;
      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 30);
        }

        thisAmount += 300 * perf.audience;
        // console.log('comedy', thisAmount);
        break;

      default:
        break;
    }
    return thisAmount;
  }

  function volumeCreditsFor(perf) {
    let result = 0;
    result += Math.max(perf.audience - 30, 0);

    if ('comedy' === playFor(perf).type)
      result += Math.floor(perf.audience / 5);
    return result;
  }

  /**
   * @description 늘어난 반복문으로 인한 성능 이슈? --> 괜한 걱정이라는 것이 결론. 혹여나 영향이 있더라도 깔끔한 코드베이스에 성능개선을 추구하는 것이 훨씬 좋다!
   * @description 누적 계산하여 결과를 리턴한다.
   * @returns
   */
  function totalVolumeCredits() {
    // refactoring - volumeCredits 002
    let result = 0;
    // refactoring - volumeCredits 001
    for (let perf of invoices[0].performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  for (let perf of invoice.performances) {
    /**
     * plays에는 공연정보, perf는 각 공연 입장 관객 수+공연의 ID
     */

    result += ` ${playFor(perf).name}: ${format(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }
  return result;
}

module.exports = { statement };
