import PropTypes from 'prop-types';
import clsx from 'clsx';

import { arrayToHash } from 'nebenan-helpers/lib/data';

const knownTypes = arrayToHash(['left', 'right', 'top', 'bottom']);


const Tooltip = (props) => {
  const { type, text, children, ...cleanProps } = props;
  const selectedType = knownTypes[type] ? type : 'top';
  const className = clsx(`c-tooltip c-tooltip-${selectedType}`, props.className);

  return (
    <span {...cleanProps} className={className}>
      <em>{text}</em>
      {children}
    </span>
  );
};

Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.node,
  type: PropTypes.string,
};

export default Tooltip;
