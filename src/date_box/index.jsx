import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import parseDate from 'date-fns/parseISO';
import formatDate from 'date-fns/format';


const DateBox = (props) => {
  const { date, locale, active, ...cleanProps } = props;
  const className = clsx('c-date_box ui-iconbox-label', props.className, {
    'is-disabled': !active,
  });

  const dateObj = parseDate(date);

  let options;
  if (locale) options = { locale: locale.modules.dateFns };

  return (
    <span {...cleanProps} className={className}>
      <strong>{dateObj.getDate()}</strong>
      <small>{formatDate(dateObj, 'MMM', options)}</small>
    </span>
  );
};

DateBox.defaultProps = {
  active: true,
};

DateBox.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  locale: PropTypes.object,
  active: PropTypes.bool.isRequired,
};

export default DateBox;
