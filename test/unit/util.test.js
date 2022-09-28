/* eslint-disable node/no-extraneous-import */
import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import Util from '../../src/utils/index.js';

describe('#Util - Strings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('#upperCaseFirstLetter should transform the first letter in upperCase', () => {
    const result = Util.upperCaseFirstLetter('product');
    const expected = 'Product';

    expect(result).toEqual(expected);
  });

  test('#lowerCaseFirstLetter should transform a string with the first letter in lowerCase', () => {
    const result = Util.lowerCaseFirstLetter('Product');
    const expected = 'product';

    expect(result).toEqual(expected);
  });

  test('#upperCaseFirstLetter given an empty string it should return empty', () => {
    const result = Util.upperCaseFirstLetter('');
    const expected = '';

    expect(result).toEqual(expected);
  });

  test('#lowerCaseFirstLetter given an empty string it should return empty', () => {
    const result = Util.lowerCaseFirstLetter('');
    const expected = '';

    expect(result).toEqual(expected);
  });
});
