import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const getPercentage = (input) => {
  let percent = (typeof input === 'number' && input < 1) ? String(input * 100) : String(input);
  if (!percent.includes('%')) percent += '%';
  return percent;
};

const Progress = (props) => {
  const { state, size, type, children, ...cleanProps } = props;
  const percent = getPercentage(state);

  const className = classNames(`c-progress c-progress-${type}`, props.className, {
    'c-progress-small': size === 'small',
  });

  return (
    <div {...cleanProps} className={className}>
      <span className="c-progress-state" style={{ width: percent }}><em>{percent}</em></span>
      {children}
    </div>
  );
};

Progress.defaultProps = {
  type: 'primary',
};

Progress.propTypes = {
  className: PropTypes.string,
  state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  size: PropTypes.string,
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Progress;
