import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Logo = (props) => {
  const { to, localeName, children, ...cleanProps } = props;
  const className = classNames('c-logo', props.className);

  let subtitle;
  if (children) subtitle = <em>{children}</em>;

  const content = (
    <>
      <i className="icon-logo" />
      <span className="c-logo-wrap">
        <i className={`icon-logo_type_${localeName}`} />
        {subtitle}
      </span>
    </>
  );

  if (to) return <a {...cleanProps} className={className} href={to}>{content}</a>;

  return <span {...cleanProps} className={className}>{content}</span>;
};

Logo.defaultProps = {
  localeName: 'de_de',
};

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.node,
  localeName: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default Logo;
