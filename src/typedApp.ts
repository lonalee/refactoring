import { createStatementData, StatementData } from './createStatementData';


// interface Play {
//   [key: string]: {
//     name: string;
//     type: string;
//   };
// }


/**
 * @description format메소드를 변수에 할당하던 것을 함수로 추출
 * @param amount 형식을 지정할 금액
 */
export function formatting(amount: number) {
  return new Intl.NumberFormat('krw-KR', {
      style: 'currency',
      currency: 'KRW'
  }).format(amount);
}


export function renderPlainText(statementData: StatementData) {
  let result = `청구 내역 (고객명: ${statementData.customer})\n`;
  // 공연별 비용을 계산해서 문자열로 만드는 로직
  statementData.performances.forEach((perf) => {
    result += `${perf.play.name} : ${formatting(perf.amount)} (${perf.audience
      }석)\n`;
  });


  result += `적립포인트 : ${formatting(statementData.totalVolumeCredits)}\n`;
  
  result += `총액 : ${formatting(statementData.totalAmount)}`;
  return result;
}


export function statement() {
  return renderPlainText(createStatementData());
}
