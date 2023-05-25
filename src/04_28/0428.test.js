import assert from 'assert';
import { main } from '.';

describe('test Province', () => {
  it('123', () => {
    const result = main();
    assert.equal(result?.firstName, 'YA2');
  });
});
