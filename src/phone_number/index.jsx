import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const PhoneNumber = (props) => {
  const className = clsx('vcard', props.className);
  const { children, ...cleanProps } = props;

  return <span {...cleanProps} className={className}><span className="tel">{children}</span></span>;
};

PhoneNumber.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default PhoneNumber;
