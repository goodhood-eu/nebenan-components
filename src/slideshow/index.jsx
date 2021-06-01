import { Children, PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import omit from 'lodash/omit';
import clamp from 'lodash/clamp';

import eventproxy from 'nebenan-helpers/lib/eventproxy';
import heartbeat from 'nebenan-helpers/lib/heartbeat';
import { getPrefixed, eventCoordinates, size, stopEvent } from 'nebenan-helpers/lib/dom';
import { bindTo } from 'nebenan-helpers/lib/utils';

import { DISABLE_SCROLL_DISTANCE } from '../constants/swipe';

import {
  BOUNDARIES_EXCESS, SWIPE_TRIGGER_DISTANCE,
  getItemWidth, getGridPosition, getActiveSection,
  getSectionsCount, isItemWidthChanged,
} from './utils';

import Draggable from '../draggable';
import Dots from '../_dots';


class Slideshow extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();

    this.element = createRef();

    bindTo(this,
      'snapToGrid',
      'setSection',
      'nextSection',
      'prevSection',

      'handleDragStart',
      'handleDrag',
      'handleDragStop',
      'handleClickCapture',

      'handleResize',

      'renderItem',
    );
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.startAutoRotation();
    this.stopListeningToResize = eventproxy('resize', this.handleResize);
    this.calculateMeasurements();
  }

  componentDidUpdate(prevProps) {
    const isLengthChanged = prevProps.items.length !== this.props.items.length;
    const itemWidthChanged = isItemWidthChanged(prevProps, this.props);

    if (isLengthChanged || itemWidthChanged) this.handleResize();
  }

  componentWillUnmount() {
    this.stopListeningToResize();
    this.stopAutoRotation();
    this.isComponentMounted = false;
  }

  getDefaultState() {
    return {
      position: 0,
      section: 0,
      isAnimated: false,

      sceneWidth: 0,
      itemWidth: 0,
      listWidth: 0,
    };
  }

  getValidPosition(position) {
    return clamp(position, this.minPosition, 0);
  }

  setSection(index) {
    const position = index * this.state.sceneWidth * -1;
    this.setPosition(this.getValidPosition(position));

    this.startAutoRotation();
  }

  setPosition(position, options) {
    const settings = options || { isAnimated: true };
    const updater = (state) => ({
      ...settings,
      position,
      section: getActiveSection(position, state.sceneWidth),
    });

    let done;
    if (this.props.onChange) done = () => { this.props.onChange(this.state.section); };

    this.setState(updater, done);
  }

  startAutoRotation() {
    if (this.props.rotationInterval) {
      this.stopAutoRotation();
      this.removeRotationListener = heartbeat(this.props.rotationInterval, this.nextSection);
    }
  }

  stopAutoRotation() {
    if (this.removeRotationListener) {
      this.removeRotationListener();
      this.removeRotationListener = null;
    }
  }

  snapToGrid() {
    const position = getGridPosition(this.state.position, this.state.sceneWidth, this.direction);
    this.setPosition(this.getValidPosition(position));
  }

  calculateMeasurements(done) {
    const updater = (state, props) => {
      const sceneWidth = size(this.element.current).width;
      const itemWidth = getItemWidth(global, sceneWidth, props);
      const listWidth = itemWidth * props.items.length;

      this.minPosition = Math.min(sceneWidth - listWidth, 0);
      return { sceneWidth, itemWidth, listWidth };
    };

    this.setState(updater, done);
  }

  nextSection() {
    let index = this.state.section + 1;
    if (index >= this.sectionsCount) index = 0;
    this.setSection(index);
  }

  prevSection() {
    let index = this.state.section - 1;
    if (index < 0) index = this.sectionsCount - 1;
    this.setSection(index);
  }

  handleResize() {
    if (!this.isComponentMounted) return;
    this.calculateMeasurements(this.snapToGrid);
  }

  handleDragStart(event) {
    // prevent pictures from dragging
    event.preventDefault();
    this.startPosition = this.state.position;
    this.startX = eventCoordinates(event, 'pageX').pageX;
    this.stopAutoRotation();
  }

  handleDrag(event) {
    const diff = eventCoordinates(event, 'pageX').pageX - this.startX;
    const minPosition = this.minPosition - BOUNDARIES_EXCESS;
    const position = clamp(this.startPosition + diff, minPosition, BOUNDARIES_EXCESS);
    const shift = Math.abs(diff);

    this.direction = diff * -1;
    this.setPosition(position, { isAnimated: false });

    // Prevents vertical scroll on touch devices
    if (shift >= DISABLE_SCROLL_DISTANCE) event.preventDefault();
    if (shift > 0) this.preventClick = true;
  }

  handleDragStop() {
    const diff = Math.abs(this.startPosition - this.state.position);

    if (diff >= SWIPE_TRIGGER_DISTANCE) {
      this.snapToGrid();
    } else {
      this.setPosition(this.startPosition);
    }

    this.startAutoRotation();
  }

  handleClickCapture(event) {
    if (this.preventClick) {
      stopEvent(event);
      this.preventClick = false;
    }
  }

  renderDots() {
    return (
      <Dots
        count={this.sectionsCount}
        active={this.state.section}
        onItemClick={this.setSection}
      />
    );
  }

  renderItem(item) {
    return <li style={{ width: this.state.itemWidth }}>{item}</li>;
  }

  render() {
    const { isAnimated, position, sceneWidth, listWidth, section } = this.state;
    const className = clsx('c-slideshow', this.props.className, { 'is-animated': isAnimated });
    const cleanProps = omit(
      this.props,
      'items',
      'visibleMobile',
      'visibleTablet',
      'visibleDesktop',
      'rotationInterval',
      'showDots',
      'arrowPrev',
      'arrowNext',
    );

    const { items, showDots, arrowPrev, arrowNext } = this.props;

    const content = Children.map(items, this.renderItem);
    const draggableStyle = getPrefixed({ transform: `translateX(${position}px)` });

    this.sectionsCount = getSectionsCount(sceneWidth, listWidth);

    let dots;
    if (showDots && this.sectionsCount > 1) {
      dots = this.renderDots();
    }

    return (
      <article {...cleanProps} className={className} ref={this.element}>
        <Draggable
          style={draggableStyle}
          className="c-slideshow-draggable"
          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragStop={this.handleDragStop}
          onClickCapture={this.handleClickCapture}
        >
          <ul className="c-slideshow-list">{content}</ul>
        </Draggable>
        {dots}

        {(arrowPrev && arrowNext) && (
          <div className="arrows">
            {(section > 0) && (
              <button
                type="button"
                onClick={this.prevSection}
                className='c-slideshow-arrow c-slideshow-arrow--prev'
              >
                {arrowPrev}
              </button>
            )}

            {(section + 1) < this.sectionsCount && (
              <button
                type="button"
                onClick={this.nextSection}
                className='c-slideshow-arrow c-slideshow-arrow--next'
              >
                {arrowNext}
              </button>
            )}
          </div>
        )}
      </article>
    );
  }
}

Slideshow.defaultProps = {
  visibleMobile: 1,
  visibleTablet: 2,
  visibleDesktop: 3,
  showDots: true,
  arrowPrev: null,
  arrowNext: null,
};

Slideshow.propTypes = {
  className: PropTypes.string,

  items: PropTypes.array.isRequired,

  visibleMobile: PropTypes.number.isRequired,
  visibleTablet: PropTypes.number.isRequired,
  visibleDesktop: PropTypes.number.isRequired,

  showDots: PropTypes.bool,
  arrowPrev: PropTypes.node,
  arrowNext: PropTypes.node,

  rotationInterval: PropTypes.number,
  onChange: PropTypes.func,
};

export default Slideshow;
