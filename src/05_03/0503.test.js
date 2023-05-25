import assert from 'assert';
import { main } from '.';

describe('test Province', () => {
  it('05_03', () => {
    const result = main();
    assert.equal(result, 'YA2');
  });
});
