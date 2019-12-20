import React from 'react';
import PropTypes from 'prop-types';

import {
  BADGE_GOLD_GREEN,
  BADGE_GOLD_BLUE,
  BADGE_GREEN,
  BADGE_BLUE,
  BADGE_PURPLE,
} from './constants';


const Badge = (props) => {
  const { type, ...cleanProps } = props;

  const url = `/images/badges/badge-${type}.svg`;
  const style = { backgroundImage: `url('${url}')` };

  return (
    <span
      {...cleanProps}
      className="c-badge"
      style={style}
    />
  );
};

Badge.defaultProps = {
  type: BADGE_GREEN,
};

Badge.propTypes = {
  type: PropTypes.oneOf([
    BADGE_GOLD_GREEN,
    BADGE_GOLD_BLUE,
    BADGE_GREEN,
    BADGE_BLUE,
    BADGE_PURPLE,
  ]),
};

export * from './constants';
export default Badge;
