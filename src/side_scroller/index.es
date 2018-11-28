import React, { PureComponent, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

import { size, eventCoordinates, stopEvent } from 'nebenan-helpers/lib/dom';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { bindTo } from 'nebenan-helpers/lib/utils';

import { DISABLE_SCROLL_DISTANCE } from '../constants/swipe';
import { getAnimationPosition } from './utils';

import Draggable from '../draggable';

const SHIFT_PERCENT = .75; // 75% of container width
const SHIFT_TOLERANCE = 10; // if within this distance to the end of the element, scroll to the end
const ANIMATION_DURATION = 200;
const ANIMATION_FPS = 90;


class SideScroller extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.container = createRef();
    this.content = createRef();

    this.containerWidth = 0;
    this.contentWidth = 0;

    bindTo(this,
      'updateSizes',
      'updateScroll',
      'handleLoad',
      'handleScrollLeft',
      'handleScrollRight',

      'handleDragStart',
      'handleDrag',
      'handleClickCapture',
    );
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.stopListeningToResize = eventproxy('resize', this.updateSizes);
    this.updateSizes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) this.updateSizes();
  }

  componentWillUnmount() {
    this.stopListeningToResize();
    this.stopScrollAnimation();
    this.isComponentMounted = false;
  }

  getDefaultState() {
    return {
      height: 0,
      canScrollLeft: false,
      canScrollRight: false,
    };
  }

  getScrollableNode() {
    return this.container.current;
  }

  startScrollAnimation(target) {
    const node = this.getScrollableNode();
    let time = 0;

    const animateScroll = () => {
      const newValue = getAnimationPosition(node.scrollLeft, target, time, ANIMATION_DURATION);

      time += 1000 / ANIMATION_FPS;
      node.scrollLeft = newValue;

      if (newValue !== target) this.animationId = global.requestAnimationFrame(animateScroll);
    };

    animateScroll();
  }

  stopScrollAnimation() {
    if (this.animationId) global.cancelAnimationFrame(this.animationId);
  }

  reset(done) {
    const complete = () => {
      this.getScrollableNode().scroll(0);
      this.updateSizes();
      done();
    };

    this.setState(this.getDefaultState(), complete);
  }

  updateSizes() {
    const { width: containerWidth } = size(this.container.current);
    const { height } = size(this.content.current.getNode());

    this.containerWidth = containerWidth;
    this.contentWidth = this.getScrollableNode().scrollWidth;

    this.updateScroll();
    this.setState({ height });
  }

  updateScroll() {
    const { scrollLeft } = this.getScrollableNode();
    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = this.containerWidth + scrollLeft < this.contentWidth;

    this.setState({ canScrollLeft, canScrollRight });
  }

  shift(percent) {
    const { scrollLeft } = this.getScrollableNode();
    const shiftAmount = Math.floor(percent * this.containerWidth);
    const maxScrollPosition = this.contentWidth - this.containerWidth;

    let target = scrollLeft + shiftAmount;
    if (target + SHIFT_TOLERANCE >= maxScrollPosition) target = maxScrollPosition;
    if (target - SHIFT_TOLERANCE <= 0) target = 0;

    this.startScrollAnimation(target);
  }

  handleLoad() {
    this.updateSizes();
  }

  handleScrollLeft() {
    this.shift(-SHIFT_PERCENT);
  }

  handleScrollRight() {
    this.shift(SHIFT_PERCENT);
  }

  handleDragStart(event) {
    event.preventDefault();
    this.startPosition = this.getScrollableNode().scrollLeft;
    this.startX = eventCoordinates(event, 'pageX').pageX;
    this.stopScrollAnimation();
  }

  handleDrag(event) {
    const diff = this.startX - eventCoordinates(event, 'pageX').pageX;
    const position = this.startPosition + diff;
    this.getScrollableNode().scrollLeft = position;

    const shift = Math.abs(diff);

    if (shift >= DISABLE_SCROLL_DISTANCE) event.preventDefault();
    if (shift > 0) this.preventClick = true;
  }

  handleClickCapture(event) {
    if (this.preventClick) {
      stopEvent(event);
      this.preventClick = false;
    }
  }

  renderControls() {
    const { canScrollLeft, canScrollRight } = this.state;
    if (!canScrollLeft && !canScrollRight) return null;

    let leftControl;
    if (canScrollLeft) {
      leftControl = (
        <span className="c-side_scroller-control" onClick={this.handleScrollLeft}>
          <i className="icon-arrow_left" />
        </span>
      );
    }

    let rightControl;
    if (canScrollRight) {
      rightControl = (
        <span className="c-side_scroller-control is-right" onClick={this.handleScrollRight}>
          <i className="icon-arrow_right" />
        </span>
      );
    }

    return <Fragment>{leftControl}{rightControl}</Fragment>;
  }

  render() {
    const className = classNames('c-side_scroller', this.props.className);
    const cleanProps = omit(this.props, 'children');
    const { height } = this.state;

    // Fixes issue with most browsers reducing height of the scrollable element children
    // as if to compensate for scrollbars, even when they are hidden
    const containerStyle = { height };

    return (
      <article {...cleanProps} className={className}>
        <div
          className="c-side_scroller-container" ref={this.container} style={containerStyle}
          onScroll={this.updateScroll} onTouchMove={this.updateScroll} onLoad={this.handleLoad}
        >
          <Draggable
            ref={this.content}
            className="c-side_scroller-content"
            onDragStart={this.handleDragStart}
            onDrag={this.handleDrag}
            onClickCapture={this.handleClickCapture}
          >
            {this.props.children}
          </Draggable>
        </div>
        {this.renderControls()}
      </article>
    );
  }
}

SideScroller.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SideScroller;
