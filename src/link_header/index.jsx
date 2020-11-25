import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Link } from 'react-router-dom';


const LinkHeader = ({
  children,
  to,
  onClick,
  reversed,
  className: passedClassName,
  ...cleanProps
}) => {
  const isClickable = to || onClick;

  const className = clsx('c-link_header', passedClassName, {
    'is-reversed': reversed,
    'is-clickable': isClickable,
  });

  let icon;
  if (isClickable) {
    const iconClass = clsx({
      'icon-arrow_right': !reversed,
      'icon-arrow_left': reversed,
    });

    icon = <i className={iconClass} />;
  }

  if (!to) {
    return (
      <span
        {...cleanProps}
        onClick={onClick}
        className={className}
      >
        {icon}
        {children}
      </span>
    );
  }
  return <Link {...cleanProps} {...{ to, className }}>{icon}{children}</Link>;
};

LinkHeader.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  reversed: PropTypes.bool,
  children: PropTypes.node,
};

export default LinkHeader;
