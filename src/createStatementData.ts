import invoice from '../JSON/invoice.json'
import plays from '../JSON/plays.json';

export interface StatementData {
    customer: string
    performances: {
        play: { name: string, type: string }, audience: number, amount: number
    }[],
    totalAmount: number,
    totalVolumeCredits: number,
}
interface Performance {
    playID: string;
    audience: number;
}

interface Play {
    name: string;
    type: string;
}

//   
export function enrichPerformance(perf: Performance) {
    const result = Object.assign({ play: { name: '', type: '' }, amount: 0 }, perf)
    result.play = playFor(perf)
    result.amount = amountFor(perf)
    return result
}

export function amountFor(perf: Performance) {
    let result = 0;
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
// 


export function createStatementData() {
    const statementData: StatementData = {
        customer: '',
        performances: [],
        totalAmount: 0,
        totalVolumeCredits: 0
    }
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(enrichPerformance)
    statementData.totalVolumeCredits = getTotalVolumeCredits()
    statementData.totalAmount = getTotalAmount()
    return statementData
}