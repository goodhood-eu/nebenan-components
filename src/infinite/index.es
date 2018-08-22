import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import omit from 'lodash/omit';
import throttle from 'lodash/throttle';

import { invoke, bindTo } from 'nebenan-helpers/lib/utils';

import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { scroll, documentOffset, size, offset } from 'nebenan-helpers/lib/dom';

import InteractiveComponent from '../../base/interactive_component';
import { LoadingSpinner } from '../loading';

export const SCROLL_RATE = 100;
const OFFSET = 150;


class Infinite extends InteractiveComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'startScroller',
      'checkViewportPosition',
    );
  }

  componentDidMount() {
    super.componentDidMount();
    // pause to render to get refs
    process.nextTick(this.startScroller);
  }

  componentWillUnmount() {
    this.deactivate();
    super.componentWillUnmount();
  }

  componentDidUpdate() {
    if (this.props.loading) this.deactivate();
    // pause to render to get refs
    else process.nextTick(this.startScroller);
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
    this.stopListeningToResize();
    this.isActive = false;
  }

  checkViewportPosition() {
    if (!this.isComponentMounted || this.props.loading) return;
    const triggerOffset = this.props.triggerOffset || OFFSET;
    const globalOffset = this.scroll.get() + size(document.body).height;

    let nodeOffsetTop;
    if (this.props.getScrolledNode) nodeOffsetTop = offset(this.container).top;
    else nodeOffsetTop = documentOffset(global, this.container).top;

    const nodeOffset = nodeOffsetTop + size(this.container).height;

    if (nodeOffset - globalOffset < triggerOffset) {
      this.deactivate();
      invoke(this.props.onActive);
    }
  }

  render() {
    const { loading, children } = this.props;
    const cleanProps = omit(this.props, 'triggerOffset', 'loading', 'onActive', 'getScrolledNode');
    const className = classNames('c-infinite', this.props.className);
    const loadingClassName = classNames('c-infinite-loading', {
      'is-active': loading,
    });
    const ref = (el) => { this.container = el; };

    return (
      <aside {...cleanProps} className={className} ref={ref}>
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
