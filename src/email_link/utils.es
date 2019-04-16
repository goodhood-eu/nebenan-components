import { stringify } from 'qs';

const QUERY_KEYS = ['subject', 'body'];

export const getQuery = (props) => (
  stringify(QUERY_KEYS.reduce((acc, key) => {
    if (props[key]) acc[key] = props[key];
    return acc;
  }, {}))
);
