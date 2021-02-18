const { assert } = require('chai');

const { getTrackingAttributes } = require('../../lib/context_list/utils');

describe('parse data-track', () => {
  it('should return empty object if no data-track attributes provided', () => {
    const options = {
      pep: 'coc',
      nothing: 'related',
    };

    assert.isEmpty(getTrackingAttributes(options));
  });

  it('should return data-track related attributes', () => {
    assert.deepEqual(getTrackingAttributes(
      {
        'data-track': 'test',
        'data-track-category-id': '1',
        'data-track-cats-and-dogs': 'fishes',
        bird: 'animal',
        data: 'value',
        'some-random-data-track': 'value',
        'data-tracright': 'kek',
      },
    ), {
      'data-track': 'test',
      'data-track-category-id': '1',
      'data-track-cats-and-dogs': 'fishes',
    });
  });
});
