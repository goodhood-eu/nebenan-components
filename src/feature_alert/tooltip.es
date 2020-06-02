import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const FeatureAlertTooltip = (props) => {
  const className = clsx('c-feature_alert_tooltip', props.className);
  return <span {...props} className={className} />;
};

FeatureAlertTooltip.propTypes = {
  className: PropTypes.string,
};

export default FeatureAlertTooltip;
