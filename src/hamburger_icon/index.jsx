import PropTypes from 'prop-types';
import clsx from 'clsx';


const HamburgerIcon = (props) => {
  const { active, ...cleanProps } = props;
  const className = clsx('c-hamburger_icon', props.className, { 'is-active': active });

  return (
    <span {...cleanProps} className={className}>
      <i className="c-hamburger_icon-1" />
      <i className="c-hamburger_icon-2" />
      <i className="c-hamburger_icon-3" />
    </span>
  );
};

HamburgerIcon.defaultProps = {
  active: false,
};

HamburgerIcon.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
};

export default HamburgerIcon;
