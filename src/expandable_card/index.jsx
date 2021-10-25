import PropTypes from 'prop-types';
import clsx from 'clsx';

import Expandable from '../expandable';


const ExpandableCard = (props) => {
  const {
    children,
    title,
    controlClassName: passedControlClassName,
    stateClassName: passedStateClassName,
    ...cleanProps
  } = props;
  const className = clsx('c-expandable_card', props.className);
  const controlClassName = clsx('c-expandable_card-control', passedControlClassName);
  const stateClassName = clsx('c-expandable_card-state ui-link', passedStateClassName);

  const control = (
    <span className={controlClassName}>
      <span className={stateClassName}>
        <i className="icon-arrow_up" />
        <i className="icon-arrow_down" />
      </span>
      {title}
    </span>
  );

  return (
    <Expandable {...cleanProps} className={className} control={control}>
      {children}
    </Expandable>
  );
};

ExpandableCard.propTypes = {
  controlClassName: PropTypes.string,
  stateClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};

export default ExpandableCard;
