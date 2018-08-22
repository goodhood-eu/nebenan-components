import { assert } from 'chai';

import {
  getQuery,
} from '../../../client/ui/email_link/utils';


describe('ui/email_link/utils', () => {
  it('getQuery', () => {
    assert.equal(getQuery({}), '', 'when nothing passed reeturns empty string');
    assert.equal(getQuery({ body: 'bob' }), 'body=bob', 'includes only what is passed');
  });
});
