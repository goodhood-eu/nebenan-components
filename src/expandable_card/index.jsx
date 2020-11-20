import PropTypes from 'prop-types';
import clsx from 'clsx';

import Expandable from '../expandable';


const ExpandableCard = (props) => {
  const { children, title, ...cleanProps } = props;
  const className = clsx('c-expandable_card', props.className);

  const control = (
    <span className="c-expandable_card-control">
      <span className="c-expandable_card-state ui-link">
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
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};

export default ExpandableCard;
