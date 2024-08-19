import PropTypes from 'prop-types';
import clsx from 'clsx';

export const TYPE_DEFAULT = 'default';
export const TYPE_LARGE = 'large';

const IconBox = (props) => {
  const { icon = 'icon-barchart', active = true, type = TYPE_DEFAULT, ...cleanProps } = props;
  const className = clsx('c-icon_box ui-iconbox-label', props.className, {
    'is-disabled': !active,
    'ui-iconbox-label-large': type === TYPE_LARGE,
  });

  return (
    <span {...cleanProps} className={className}>
      <i className={icon} />
    </span>
  );
};

IconBox.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default IconBox;
