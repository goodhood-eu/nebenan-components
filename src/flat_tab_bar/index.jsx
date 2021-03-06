import PropTypes from 'prop-types';
import clsx from 'clsx';
import TabBar from '../tab_bar';


const FlatTabBar = (props) => {
  const className = clsx(`c-flat_tab_bar is-size-${props.items.length}`, props.className);
  return <TabBar {...props} className={className} />;
};

FlatTabBar.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
};

export default FlatTabBar;
