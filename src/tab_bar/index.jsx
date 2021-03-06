import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import omit from 'lodash/omit';
import { withRouter } from 'react-router';
import { historyPropTypes } from 'nebenan-react-hocs/lib/history';
import { invoke } from 'nebenan-helpers/lib/utils';
import { stripOriginFromUrl } from 'nebenan-helpers/lib/routes';

const defaultGetItem = (index, items) => items[index].text;


class TabBar extends PureComponent {
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
    const renderer = getItem || defaultGetItem;

    const className = clsx('c-tab_bar-item', {
      'is-active': key === activeIndex,
    });
    const onClick = this.handleClick.bind(this, key);
    const props = { key, className, onClick };

    return <li {...props}>{renderer(key, items)}</li>;
  }

  render() {
    const className = clsx('c-tab_bar', this.props.className);
    const cleanProps = omit(
      this.props,
      ...Object.keys(historyPropTypes),
      'children',
      'action',
      'items',
      'getItem',
      'activeIndex',
    );
    const { items, action, children } = this.props;

    let list;
    if (items) list = <ul className="c-tab_bar-list">{items.map(this.renderItem)}</ul>;

    let actionNode;
    if (action) actionNode = <span className="c-tab_bar-action">{action}</span>;


    let content;
    if (children) content = <span className="c-tab_bar-content">{children}</span>;

    return (
      <article {...cleanProps} className={className}>
        {actionNode}
        <div className="c-tab_bar-container">
          {list}
          {content}
        </div>
      </article>
    );
  }
}

TabBar.propTypes = {
  ...historyPropTypes,
  className: PropTypes.string,
  action: PropTypes.node,
  items: PropTypes.array,
  getItem: PropTypes.func,
  activeIndex: PropTypes.number,
  children: PropTypes.node,
};

export default withRouter(TabBar);
