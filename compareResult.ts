interface ParamsObj {
  a: number;
  b: number;
}

function simpleCalc(params: ParamsObj) {
  const { a, b } = params;
  return { a, b, calculated: a + b };
}

simpleCalc({ x: 100 });

module.exports = simpleCalc;
