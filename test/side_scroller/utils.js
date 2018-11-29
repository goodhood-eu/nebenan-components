const { assert } = require('chai');

const {
  getAnimationPosition,
} = require('../../lib/side_scroller/utils');


describe('ui/side_scroller/utils', () => {
  it('getAnimationPosition', () => {
    // startPosition, targetPosition, elapsedTime, duration
    const pos1 = getAnimationPosition(0, 100, 50, 100);
    const pos2 = getAnimationPosition(30, 100, 50, 100);
    const pos3 = getAnimationPosition(100, 100, 90, 100);

    assert.isNumber(pos1, 'returns a new coordinate');
    assert.isTrue(pos1 > 0, 'coordinate higher than original');
    assert.isTrue(pos2 > pos1, 'coordinate higher than middle of range');
    assert.equal(pos3, 100, 'alreay on target');
  });
});
