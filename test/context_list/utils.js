const { assert } = require('chai');

const { parseDataTrack } = require('../../lib/context_list/utils');

describe('parse data-track', () => {
  it('should return empty object if no data-track attributes provided', () => {
    const options = {
      pep: 'coc',
      nothing: 'related',
    };

    assert.isEmpty(parseDataTrack(options));
  });

  it('should return data-track related attributes', () => {
    const result = {
      'data-track': 'test',
      'data-track-category-id': '1',
      'data-track-cats-and-dogs': 'fishes',
    };

    const options = {
      ...result,
      bird: 'animal',
      data: 'value',
      'some-random-data-track': 'value',
      'data-tracright': 'kek',
    };

    assert.deepEqual(parseDataTrack(options), result);
  });
});
