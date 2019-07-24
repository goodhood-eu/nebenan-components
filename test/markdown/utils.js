const { assert } = require('chai');

const {
  BLOCKQUOTE_TOKEN,
  quotesToTokens,
  tokensToQuotes,
} = require('../../lib/markdown/utils');

const text1 = '> Hello';
const text2 = `
  > This
  > Is

  > A block quite
`;

const text3 = `
> This
> Is

some text here too

> A block quite
`;

const tokens1 = `${BLOCKQUOTE_TOKEN} Hello`;
const tokens2 = `
  ${BLOCKQUOTE_TOKEN} This
  ${BLOCKQUOTE_TOKEN} Is

  ${BLOCKQUOTE_TOKEN} A block quite
`;

const tokens3 = `
${BLOCKQUOTE_TOKEN} This
${BLOCKQUOTE_TOKEN} Is

some text here too

${BLOCKQUOTE_TOKEN} A block quite
`;


describe('ui/markdown/utils', () => {
  it('quotesToTokens', () => {
    assert.equal(quotesToTokens(text1), tokens1, 'simple text');
    assert.equal(quotesToTokens(text2), tokens2, 'multiline text');
    assert.equal(quotesToTokens(text3), tokens3, 'no leading space`');
  });

  it('tokensToQuotes', () => {
    assert.equal(tokensToQuotes(tokens1), text1, 'simple text');
    assert.equal(tokensToQuotes(tokens2), text2, 'multiline text');
    assert.equal(tokensToQuotes(tokens3), text3, 'no leading space`');
  });
});
