export function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}

export interface Province {
  _name: string;
  _producers: string[];
  _totalProduction: number;
  _demand: number;
  _price: number;
  // _demandValue: number;
  // _demandCost: number;
  // _satisfiedDemand: number;
}

export class Province {
  constructor(doc) { // 테스트1. doc === sampleProvinceData
    this._name = doc.name; // asia
    this._producers = []; // 
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producers(this, d)));
  }

  addProducer(arg) {
    // console.log('chk flow1: arg --> ', arg)
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }
  get demand() {
    return this._demand;
  }
  set demand(arg: string) {
    this._demand = parseInt(arg);
  }
  get price() {
    return this._price;
  }
  set price(arg: string) {
    this._price = parseInt(arg);
  }

  // 생산 부족분 계산
  get shortFall() {
    return this._demand - this.totalProduction;
  }

  // 수익 계산
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandValue() {
    return this.satisfiedDemand * this._price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
  get demandCost() {
    let remainingDemand = this._demand;
    console.log('flow1 : remainingDemand -->', remainingDemand)
    let result = 0;

    type producers = {
      cost: number;
    };
    this.producers.sort((a, b) => a.cost - b.cost).forEach(p => {
      const contribution = Math.min(remainingDemand, p.production)
      console.log('flow1 : contribution -->', contribution)
      remainingDemand -= contribution //TODO: "-" 기호의 위치에 따른 값 변화 확인해보기
      console.log('flow1 : contribution -->', contribution)
      result += contribution* p.cost
      console.log('flow3 : contribution -->', result)
    })
    return result
  }
}

interface Producers {
  _province: { totalProduction: number };
  _cost: number;
  _name: string;
  _production: number;
}

class Producers {
  constructor(aProvince, data) { //aProvince는 Asia 전체, data는 producers배열의 요소 예. Byzantium
    this._province = aProvince;
    this._name = data.name;
    this._cost = data.cost;
    this._production = data.production || 0;
  }

  get name() {
    return this._name;
  }
  get cost() {
    return this._cost;
  }
  set cost(arg: string) {
    this._cost = parseInt(arg);
  }
  get production() {
    return this._production;
  }
  set production(amountStr: string) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
