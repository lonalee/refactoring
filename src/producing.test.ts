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
    expect(asia.demandValue).toEqual(500)

    expect(asia.demandCost).toEqual(500)
  })
});
