import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const PopupLink = (props) => {
  const className = classNames('c-popup_link', props.className);
  const { to: href, follow, children, ...cleanProps } = props;

  let rel = 'noopener noreferrer'; // for safety, see: https://mathiasbynens.github.io/rel-noopener/
  if (!follow) rel += ' nofollow';

  return <a {...cleanProps} {...{ className, href, rel }} target="_blank">{children}</a>;
};

PopupLink.defaultProps = {
  follow: false,
};

PopupLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.node.isRequired,
  follow: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default PopupLink;
