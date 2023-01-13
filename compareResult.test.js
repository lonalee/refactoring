const compareResults = require('./compareResult');
const assert = require('assert');

test('CompareResults 1', () => {
  const testRes = compareResults({
    a: 100,
    b: '200',
  });

  const expectedResult = {
    a: 100,
    b: 200,
    calculated: 300,
  };

  assert.deepEqual(testRes, expectedResult);
});
