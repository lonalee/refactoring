import assert from 'assert';
import { main } from '.';

describe('test Encapsulate Record', () => {
  it('05_25', () => {
    const result = main();
    assert.equal(result, 'YA2');
  });
});
