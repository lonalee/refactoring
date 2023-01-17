// import { describe, expect, test } from "@jest/globals";
import { statement } from "./typedApp";
import invoice from "./JSON/invoice.json";
import plays from "./JSON/plays.json";

describe("", () => {
  test("ts test 1", () => {
    const res = statement();
    const expected =
      "청구 내역 (고객명: BigCo)\nHamlet : $650.00 (55석)\nAs you like it : $580.00 (35석)\nOthello : $500.00 (40석)\n적립포인트 : 47\n총액 : $1,730.00";
    // console.log(res)
    expect(res).toEqual(expected);
  });
});
