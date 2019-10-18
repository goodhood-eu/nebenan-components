import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { arrayOf } from 'nebenan-helpers/lib/data';

const ProgressLine = (props) => {
  const { steps, current, ...cleanProps } = props;
  const className = classNames('c-progress_line', props.className);

  const chunks = arrayOf(steps).map((index) => (
    <li key={index} className={classNames('c-progress_line-step', { 'is-active': index <= current })} />
  ));

  return (
    <ul {...cleanProps} className={className}>{chunks}</ul>
  );
};

ProgressLine.defaultProps = {
  steps: 1,
  current: 0,
};

ProgressLine.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default ProgressLine;
