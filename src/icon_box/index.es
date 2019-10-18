import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export const TYPE_DEFAULT = 'default';
export const TYPE_LARGE = 'large';

const IconBox = (props) => {
  const { icon, active, type, ...cleanProps } = props;
  const className = classNames('c-icon_box ui-iconbox-label', props.className, {
    'is-disabled': !active,
    'ui-iconbox-label-large': type === TYPE_LARGE,
  });

  return (
    <span {...cleanProps} className={className}>
      <i className={icon} />
    </span>
  );
};

IconBox.defaultProps = {
  active: true,
  icon: 'icon-barchart',
  type: TYPE_DEFAULT,
};

IconBox.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default IconBox;
