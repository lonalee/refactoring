import invoice from "./JSON/invoice.json";
import plays from "./JSON/plays.json";

interface Performance {
  playID: string;
  audience: number;
}

interface Play {
  [key: string]: {
    name: string;
    type: string;
  };
}


// export function amountFor(performances: Performance[], plays: Play) {

export function statement() {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`Unknown Genre ${play.type}`);

        break;
    }

    volumeCredits += Math.max(perf.audience - 30, 0);
    if (play.type === "comedy") volumeCredits += Math.floor(perf.audience / 5);

    result += `${play.name} : ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `적립포인트 : ${volumeCredits}\n`;
  result += `총액 : ${format(totalAmount / 100)}`;
  return result;
}
