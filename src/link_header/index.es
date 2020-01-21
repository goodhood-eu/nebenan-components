import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Link } from 'react-router-dom';


const LinkHeader = (props) => {
  const { children, to, reversed, ...cleanProps } = props;
  const className = clsx('c-link_header', props.className, {
    'is-reversed': reversed,
  });

  if (!to) return <span {...cleanProps} className={className}>{children}</span>;

  const iconClass = clsx({
    'icon-arrow_right': !reversed,
    'icon-arrow_left': reversed,
  });
  const icon = <i className={iconClass} />;
  return <Link {...cleanProps} {...{ to, className }}>{icon}{children}</Link>;
};

LinkHeader.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  reversed: PropTypes.bool,
  children: PropTypes.node,
};

export default LinkHeader;
