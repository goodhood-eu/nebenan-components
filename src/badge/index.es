import React from 'react';
import PropTypes from 'prop-types';

import {
  BADGE_GOLD,
  BADGE_BASE,
  BADGE_BLUE,
} from './constants';

const Badge = (props) => {
  const { type, ...cleanProps } = props;

  const url = `/images/badges/badge-${type}.svg`;

  return (
    <img src={url} alt="" {...cleanProps} />
  );
};

Badge.propTypes = {
  type: PropTypes.oneOf([
    BADGE_GOLD,
    BADGE_BASE,
    BADGE_BLUE,
  ]),
};

export default Badge;
