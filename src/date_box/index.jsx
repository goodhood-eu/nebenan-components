import PropTypes from 'prop-types';
import clsx from 'clsx';

import { format, parseISO} from 'date-fns';

const DateBox = (props) => {
  const { date, locale, active, ...cleanProps } = props;
  const className = clsx('c-date_box ui-iconbox-label', props.className, {
    'is-disabled': !active,
  });

  const dateObj = parseISO(date);

  let options;
  if (locale) options = { locale: locale.modules.dateFns };

  return (
    <span {...cleanProps} className={className}>
      <strong>{dateObj.getDate()}</strong>
      <small>{format(dateObj, 'MMM', options)}</small>
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
