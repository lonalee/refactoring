import assert from "assert";
import { Province, sampleProvinceData } from "./producing";

describe('test Province', () => {
  let data;
  let asia

  beforeAll(() => {
    data = sampleProvinceData()
    // console.log('sample province data --> ', data)
    asia = new Province(data)
    // console.log('province data --> ', asia.profit)
  })
  test('shortfall', () => {
    assert.equal(asia.shortFall, 5)
  });
  it('method profit', () => {
    // demandValue - demandCost
    
    // expect(asia.profit).toEqual(500)
    // console.log('---asia---', asia)
    // console.log('---satisfiedDemand ===', asia.satisfiedDemand)
    expect(asia.satisfiedDemand).toBe(25)
    
    expect(asia.demandValue).toBe(500)
    
    expect(asia.demandCost).toBe(270)
    
    expect(asia.profit).toBe(230)
  })
  it('change production', () => {
    
    expect(asia.producers[0].production).toBe(9)

    asia.producers[0].production = 20

    expect(asia.shortFall).toBe(-6)
    
    expect(asia.profit).toBe(292)
  })
});
