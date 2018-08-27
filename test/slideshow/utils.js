const { assert } = require('chai');

const {
  getGridPosition, getSectionsCount,
  getActiveSection, isItemWidthChanged,
} = require('../../lib/slideshow/utils');


describe('ui/slideshow/utils', () => {
  it('getGridPosition', () => {
    const sceneWidth = 10;
    const toLeft = -1;
    const toRight = 1;

    assert.equal(
      getGridPosition(-7, sceneWidth, toRight), -10,
      'round position to next section',
    );

    assert.equal(
      getGridPosition(-9, sceneWidth, toLeft), 0,
      'round position to prev section',
    );

    assert.equal(
      getGridPosition(-590, 590, 0), -590,
      'do not change position if it was not changed',
    );
  });

  it('getSectionsCount', () => {
    assert.equal(getSectionsCount(10, 20), 2, 'sections in entire container');
    assert.equal(getSectionsCount(8, 20), 3, 'ceil sections count');
  });

  it('getActiveSection', () => {
    assert.equal(getActiveSection(-20, 10), 2, 'get current section index');
    assert.equal(getActiveSection(-15, 10), 2, 'get section index from limited position');

    assert.equal(getActiveSection(-14, 10), 1, 'get closest section index');
    assert.equal(getActiveSection(-16, 10), 2, 'get closest section index');
  });

  it('isItemWidthChanged', () => {
    const propsA = {
      visibleMobile: 1,
      visibleTablet: 2,
      visibleDesktop: 3,
    };

    const propsB = {
      visibleMobile: 3,
      visibleTablet: 2,
      visibleDesktop: 3,
    };

    assert.isTrue(isItemWidthChanged(propsA, propsB), 'true if different props');
    assert.isFalse(isItemWidthChanged(propsA, propsA), 'false if same props');
  });
});
