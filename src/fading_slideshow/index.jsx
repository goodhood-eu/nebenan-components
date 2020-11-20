import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import omit from 'lodash/omit';
import clamp from 'lodash/clamp';

import heartbeat from 'nebenan-helpers/lib/heartbeat';
import { bindTo } from 'nebenan-helpers/lib/utils';

import Dots from '../dots';


class FadingSlideshow extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeItemIndex: this.props.defaultItemIndex,
    };

    bindTo(this,
      'setSlide',
      'rotate',
      'renderItem',
    );
  }

  componentDidMount() {
    this.startAutoRotation();
  }

  componentWillUnmount() {
    if (this.stopAutoRotation) this.stopAutoRotation();
  }

  setSlide(index) {
    if (this.stopAutoRotation) this.stopAutoRotation();

    this.setState((state, props) => {
      const validIndex = clamp(index, 0, props.items.length - 1);
      return { activeItemIndex: validIndex };
    }, this.startAutoRotation);
  }

  startAutoRotation() {
    this.stopAutoRotation = heartbeat(this.props.rotationInterval, this.rotate);
  }

  rotate() {
    let index = this.state.activeItemIndex + 1;
    if (index >= this.props.items.length) index = 0;

    this.setSlide(index);
  }

  renderDots() {
    if (this.props.items.length > 1) {
      return (
        <Dots
          count={this.props.items.length}
          active={this.state.activeItemIndex}
          onItemClick={this.setSlide}
        />
      );
    }
  }

  renderItem(item, index) {
    const className = clsx('c-fading_slideshow-item', {
      'is-active': this.state.activeItemIndex === index,
    });
    return <span className={className}>{item}</span>;
  }

  render() {
    const className = clsx('c-fading_slideshow', this.props.className);

    const { children, items } = this.props;
    const cleanProps = omit(this.props, 'children', 'items', 'defaultItemIndex', 'rotationInterval');

    const content = Children.map(items, this.renderItem);

    return (
      <article {...cleanProps} className={className}>
        {content}
        {this.renderDots()}
        {children}
      </article>
    );
  }
}

FadingSlideshow.defaultProps = {
  defaultItemIndex: 0,
  rotationInterval: 1000 * 15,
};

FadingSlideshow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  rotationInterval: PropTypes.number.isRequired,
  defaultItemIndex: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};

export default FadingSlideshow;
