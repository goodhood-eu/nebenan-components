const { assert } = require('chai');

const {
  getPercentage,
} = require('../../lib/progress/utils');


describe('ui/progress/utils', () => {
  it('getPercentage', () => {
    assert.equal(getPercentage(75), '75%', 'check if the number was converted to the String with %');
    assert.equal(getPercentage('4'), '4%', 'check if to the string was added % sign');
    assert.equal(getPercentage('26%'), '26%', 'check if the string with % stay the same');
    assert.equal(getPercentage(0.3), '30%', 'check if the number with float was converted to the string with %');
    assert.equal(getPercentage('0.3333%'), '0.3333%', 'check if the string with float and % stay the same');
    assert.equal(getPercentage('0.5'), '0.5%', 'check if to the string with float was added % sign');
  });
});
