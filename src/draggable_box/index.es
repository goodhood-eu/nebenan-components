import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import omit from 'lodash/omit';

import { invoke, bindTo } from 'nebenan-helpers/lib/utils';
import { getPrefixed, eventCoordinates } from 'nebenan-helpers/lib/dom';

const TRIGGER_DISTANCE = 20;
const TRIGGER_TIMEOUT = 500;


class DraggableBox extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'handleDragStart',
      'handleDragMove',
      'handleDragEnd',
      'handleDelayedStart',
      'handleSwipeStart',
      'handleSwipeMove',
      'handleSwipeEnd',
    );
    this.state = this.getDefaultState();
  }

  componentWillUnmount() {
    this.deactivateDrag();
    this.deactivateSwipe();
  }

  getDefaultState() {
    return {
      active: false,
      x: null,
      y: null,
    };
  }

  activateDrag() {
    if (this.isActive) return;
    document.addEventListener('mousemove', this.handleDragMove);
    document.addEventListener('mouseup', this.handleDragEnd);
    this.isActive = true;
  }

  deactivateDrag() {
    if (!this.isActive) return;
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);
    this.isActive = false;
  }

  activateSwipe() {
    if (this.isActive) return;
    document.addEventListener('touchmove', this.handleSwipeMove);
    document.addEventListener('touchend', this.handleSwipeEnd);
    this.isActive = true;
  }

  deactivateSwipe() {
    if (!this.isActive) return;
    document.removeEventListener('touchmove', this.handleSwipeMove);
    document.removeEventListener('touchend', this.handleSwipeEnd);
    this.isActive = false;
  }

  handleMoveStart(event) {
    const { pageX, pageY } = eventCoordinates(event, 'pageX', 'pageY');
    this.startX = pageX;
    this.startY = pageY;
  }

  handleMoveEnd() {
    const wasActive = this.state.active;

    const complete = () => {
      if (wasActive) invoke(this.props.onMoveEnd);
    };

    this.setState(this.getDefaultState(), complete);
  }

  handleDragStart(event) {
    this.activateDrag();
    this.handleMoveStart(event);
    invoke(this.props.onMouseDown, event);
  }

  handleDragMove(event) {
    const { pageX, pageY } = event;
    const { onMove, onMoveStart } = this.props;
    const x = pageX - this.startX;
    const y = pageY - this.startY;

    const updater = (state) => {
      if (state.active) {
        invoke(onMove, pageX, pageY, x, y);
        return { x, y };
      }

      if (Math.abs(x) > TRIGGER_DISTANCE || Math.abs(y) > TRIGGER_DISTANCE) {
        invoke(onMoveStart, this.startX, this.startY);
        return { active: true };
      }
    };

    this.setState(updater);
  }

  handleDragEnd() {
    this.deactivateDrag();
    this.handleMoveEnd();
    this.startX = null;
    this.startY = null;
  }

  handleDelayedStart() {
    this.setState({ active: true });
    invoke(this.props.onMoveStart, this.startX, this.startY);
  }

  handleSwipeStart(event) {
    this.activateSwipe();
    this.startTime = Date.now();
    this.startTid = setTimeout(this.handleDelayedStart, TRIGGER_TIMEOUT);
    this.handleMoveStart(event);

    invoke(this.props.onTouchStart, event);
  }

  handleSwipeMove(event) {
    if (Date.now() - this.startTime < TRIGGER_TIMEOUT) {
      clearTimeout(this.startTid);
      this.deactivateSwipe();
      return;
    }

    event.preventDefault();

    const { pageX, pageY } = eventCoordinates(event, 'pageX', 'pageY');
    const x = pageX - this.startX;
    const y = pageY - this.startY;

    this.setState({ x, y });
    invoke(this.props.onMove, pageX, pageY, x, y);
  }

  handleSwipeEnd() {
    this.deactivateSwipe();
    this.handleMoveEnd();

    this.startX = null;
    this.startY = null;
    this.startTime = null;
    this.startTid = null;
  }

  render() {
    const { active, x, y } = this.state;
    const className = clsx('c-draggable_box', this.props.className, {
      'is-active': active,
    });
    const cleanProps = omit(this.props, 'children', 'onMoveStart', 'onMove', 'onMoveEnd');

    let style;
    if (this.state.active) {
      const transform = `translate3d(${x}px, ${y}px, 0) scale(1.2)`;
      style = getPrefixed({ transform });
    }

    return (
      <div
        {...cleanProps} className={className} style={style}
        onMouseDown={this.handleDragStart}
        onTouchStart={this.handleSwipeStart}
      >
        {this.props.children}
      </div>
    );
  }
}

DraggableBox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  onMoveStart: PropTypes.func,
  onMove: PropTypes.func,
  onMoveEnd: PropTypes.func,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
};

export default DraggableBox;
