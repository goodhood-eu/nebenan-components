import { assert } from 'chai';

import {
  getOption,
} from '../../src/tag_cloud/utils';

describe('ui/tag_cloud/utils', () => {
  it('getOption', () => {
    const option = { key: 3, value: 3 };
    assert.deepEqual(getOption(3), option, 'returns correct option when item is num');
    assert.deepEqual(getOption(option), option, 'returns correct option when item is object');
  });
});
