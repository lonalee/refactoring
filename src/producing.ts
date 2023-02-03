function sampleProvinceData() {
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

interface Province {
  _name: string;
  _producers: string[];
  _totalProduction: number;
  _demand: number;
  _price: number;
  _demandValue: number;
  _demandCost: number;
  _satisfiedDemand: number;
}

class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producers(this, d)));
  }

  addProducer(arg) {
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
    return this._demandValue - this._demandCost;
  }
  get demandValue() {
    return this._satisfiedDemand * this._price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }
  get demandCost() {
    let remainingDemand = this._demand;
    let result = 0;

    type producers = {
      cost: number;
    };
    this.producers.sort((a, b) => a.cost - b.cost);
  }
}

interface Producers {
  _province: { totalProduction: number };
  _cost: number;
  _name: string;
  _production: number;
}

class Producers {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
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
