import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dropdown from '../dropdown';


class Popover extends PureComponent {
  constructor(props) {
    super(props);
    this.dropdown = createRef();
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.dropdown.current.show();
  }

  hide() {
    this.dropdown.current.hide();
  }

  render() {
    const className = classNames('c-popover', this.props.className);

    return (
      <Dropdown {...this.props} ref={this.dropdown} className={className} positionTop />
    );
  }
}

Popover.propTypes = {
  className: PropTypes.string,
};

export default Popover;
