const { assert } = require('chai');

const {
  parseProps,
} = require('../../lib/micro_helmet/utils');


describe('ui/micro_helmet/utils', () => {
  it('parseProps', () => {
    const props = {
      title: 'Title',
      description: 'Description',
      image: '/image.jpg',
      robots: 'follow',
      canonical: '/',
    };

    const extraProps = {
      kim: 'chen',
      john: 'wick',
    };

    assert.deepEqual(parseProps({ ...props, ...extraProps }), props, 'omit unfamiliar props');
    assert.equal(parseProps({ title: 'test', titleTemplate: 'check %s' }).title, 'check test', 'insert title in template');
    assert.equal(parseProps({ defaultTitle: 'wop wop' }).title, 'wop wop', 'return default title');
  });
});
