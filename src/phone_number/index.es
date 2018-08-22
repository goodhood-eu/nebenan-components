import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PhoneNumber = (props) => {
  const className = classNames('vcard', props.className);
  const { children, ...cleanProps } = props;

  return <span {...cleanProps} className={className}><span className="tel">{children}</span></span>;
};

PhoneNumber.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PhoneNumber;
