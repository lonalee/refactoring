import invoice from '../JSON/invoice.json'
import { formatting,getTotalVolumeCredits, getTotalAmount,enrichPerformance } from './typedApp'

interface StatementData {
    customer: string
    performances: {}[],
    totalAmount: string,
    totalVolumeCredits: string,
  }

export function createStatementData() {
    const statementData: StatementData = {
      customer: '',
      performances: [],
      totalAmount: '',
      totalVolumeCredits: ''
    }
    statementData.customer = invoice.customer
    statementData.performances = invoice.performances.map(enrichPerformance)
    statementData.totalVolumeCredits = formatting(getTotalVolumeCredits())
    statementData.totalAmount = formatting(getTotalAmount())
    return statementData
  }