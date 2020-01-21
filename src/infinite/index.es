import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import omit from 'lodash/omit';
import throttle from 'lodash/throttle';

import { invoke, bindTo } from 'nebenan-helpers/lib/utils';

import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { scroll, documentOffset, offset } from 'nebenan-helpers/lib/dom';

import { LoadingSpinner } from '../loading';

export const SCROLL_RATE = 100;
const OFFSET = 150;


class Infinite extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'startScroller',
      'checkViewportPosition',
    );
    this.container = createRef();
  }

  componentDidMount() {
    this.isComponentMounted = true;
    // pause to render to get refs
    process.nextTick(this.startScroller);
  }

  componentDidUpdate() {
    if (this.props.loading) this.deactivate();
    // pause to render to get refs
    else process.nextTick(this.startScroller);
  }

  componentWillUnmount() {
    this.deactivate();
    this.isComponentMounted = false;
  }

  startScroller() {
    this.activate();
    this.checkViewportPosition();
  }

  activate() {
    if (!this.isComponentMounted || this.isActive) return;

    this.scrolledNode = invoke(this.props.getScrolledNode) || global;
    this.handleScroll = throttle(this.checkViewportPosition, SCROLL_RATE);

    this.scroll = scroll(this.scrolledNode);

    this.scrolledNode.addEventListener('scroll', this.handleScroll);
    this.stopListeningToResize = eventproxy('resize', this.checkViewportPosition);
    this.isActive = true;
  }

  deactivate() {
    if (!this.isComponentMounted || !this.isActive) return;

    this.scrolledNode.removeEventListener('scroll', this.handleScroll);
    invoke(this.handleScroll.cancel);
    this.stopListeningToResize();
    this.isActive = false;
  }

  checkViewportPosition() {
    if (!this.isComponentMounted || this.props.loading) return;
    const triggerOffset = this.props.triggerOffset || OFFSET;
    const globalOffset = this.scroll.get() + global.innerHeight;

    let nodeOffsetTop;
    if (this.props.getScrolledNode) nodeOffsetTop = offset(this.container.current).top;
    else nodeOffsetTop = documentOffset(global, this.container.current).top;

    if (nodeOffsetTop - globalOffset < triggerOffset) {
      this.deactivate();
      invoke(this.props.onActive);
    }
  }

  render() {
    const { loading, children } = this.props;
    const cleanProps = omit(this.props, 'triggerOffset', 'loading', 'onActive', 'getScrolledNode');
    const className = clsx('c-infinite', this.props.className);
    const loadingClassName = clsx('c-infinite-loading', {
      'is-active': loading,
    });

    return (
      <aside {...cleanProps} className={className} ref={this.container}>
        <div className={loadingClassName}>{children || <LoadingSpinner />}</div>
      </aside>
    );
  }
}

Infinite.defaultProps = {
  loading: false,
};

Infinite.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  loading: PropTypes.bool,
  getScrolledNode: PropTypes.func,
  triggerOffset: PropTypes.number,
  onActive: PropTypes.func,
};

export default Infinite;
