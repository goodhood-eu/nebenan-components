import React from 'react';
import PropTypes from 'prop-types';

import { getQuery } from './utils';

const EmailLink = (props) => {
  const { to, children, ...cleanProps } = props;

  const query = getQuery(props);

  let uri = `mailto:${to}`;
  if (query) uri += `?${query}`;

  return <a {...cleanProps} href={uri}>{children}</a>;
};

EmailLink.propTypes = {
  children: PropTypes.node,

  to: PropTypes.string.isRequired,
  subject: PropTypes.string,
  body: PropTypes.string,
};

export default EmailLink;
