import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import parseDate from 'date-fns/parseISO';
import formatDate from 'date-fns/format';


export const TYPE_DEFAULT = 'default';
export const TYPE_LARGE = 'large';

const DateBox = (props) => {
  const { date, locale, active, type, ...cleanProps } = props;
  const className = classNames('c-date_box ui-iconbox-label', props.className, {
    'is-disabled': !active,
    'ui-iconbox-label-large': type === TYPE_LARGE,
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
  type: TYPE_DEFAULT,
};

DateBox.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  locale: PropTypes.object,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default DateBox;
