import PropTypes from 'prop-types';
import classNames from 'clsx';
import PhoneNumber from '../phone_number';


const PhoneLink = (props) => {
  const className = classNames('c-phone_link', props.className);
  const { children, to, ...cleanProps } = props;
  const content = <PhoneNumber>{children || to}</PhoneNumber>;

  return (
    <span {...cleanProps} className={className}>
      <a href={`tel:${to}`} className="c-phone_link-mobile">{content}</a>
      <span className="c-phone_link-desktop">{content}</span>
    </span>
  );
};

PhoneLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PhoneLink;
