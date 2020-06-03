import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';


const FeatureAlertTooltip = ({ children, ...props }) => {
  const className = clsx('c-feature_alert_tooltip is-placement-left', props.className);
  return (
    <article {...props} className={className}>
      <i className="c-feature_alert_tooltip-arrow" />
      <div className="c-feature_alert_tooltip-content">
        {children}
        <i className="c-feature_alert_tooltip-cross icon-cross" />
      </div>
    </article>
  );
};

FeatureAlertTooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default FeatureAlertTooltip;
