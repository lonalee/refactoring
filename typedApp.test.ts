import { describe, expect, test } from '@jest/globals';
import { statement } from './typedApp';

describe('', () => {
  test('ts test 1', () => {
    const res = statement();
    expect(res).toEqual(1);
  });
});
