import escapeHtml from 'escape-html';

const REGEX_BLOCKQUITE = '((?:^|\\n|\\s){1})(>)(\\s{1})';
export const BLOCKQUOTE_TOKEN = '%BLOCKQUOTE%';

export const quotesToTokens = (string) => (
  string.replace(new RegExp(REGEX_BLOCKQUITE, 'g'), `$1${BLOCKQUOTE_TOKEN}$3`)
);
export const tokensToQuotes = (string) => string.replace(new RegExp(BLOCKQUOTE_TOKEN, 'g'), '>');

export const sanitizeText = (text, withBlockquotes) => {
  if (!withBlockquotes) return escapeHtml(text);
  return tokensToQuotes(escapeHtml(quotesToTokens(text)));
};
