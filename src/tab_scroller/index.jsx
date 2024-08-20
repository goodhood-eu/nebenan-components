import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import omit from 'lodash/omit';
import { withRouter } from 'react-router';
import { invoke } from 'nebenan-helpers/lib/utils';
import { stripOriginFromUrl } from 'nebenan-helpers/lib/routes';
import { historyPropTypes } from 'nebenan-react-hocs/lib/history';

import SideScroller from '../side_scroller';

const defaultGetItem = (index, items) => items[index].text;

class TabScroller extends PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  handleClick(key) {
    const { items, history } = this.props;
    const { href, callback } = items[key];
    if (href) history.push(stripOriginFromUrl(href, global.location.origin));
    invoke(callback, key);
  }

  renderItem(item, key) {
    const { activeIndex, getItem, items } = this.props;
    const { href, callback } = items[key];
    const renderer = getItem || defaultGetItem;

    const className = clsx('c-tab_scroller-item', {
      'is-active': key === activeIndex,
      'is-clickable': Boolean(href || callback),
    });
    const onClick = this.handleClick.bind(this, key);
    return <li key={key}{...{ className, onClick }}>{renderer(key, items)}</li>;
  }

  render() {
    const className = clsx('c-tab_scroller', this.props.className);
    const cleanProps = omit(
      this.props,
      ...Object.keys(historyPropTypes),
      'items',
      'getItem',
      'activeIndex',
    );

    return (
      <SideScroller {...cleanProps} className={className}>
        <ul className="c-tab_scroller-list">{this.props.items.map(this.renderItem)}</ul>
      </SideScroller>
    );
  }
}

TabScroller.propTypes = {
  ...historyPropTypes,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  getItem: PropTypes.func,
  activeIndex: PropTypes.number,
};

export default withRouter(TabScroller);
