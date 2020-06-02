import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const FeatureAlertLabel = (props) => {
  const className = clsx('c-feature_alert_label', props.className);
  return <span {...props} className={className} />;
};

FeatureAlertLabel.propTypes = {
  className: PropTypes.string,
};

export default FeatureAlertLabel;
