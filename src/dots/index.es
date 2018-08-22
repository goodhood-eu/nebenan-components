import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

import { bindTo } from 'nebenan-helpers/lib/utils';
import { arrayOf } from 'nebenan-helpers/lib/data';


class Dots extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'renderItem',
    );
  }

  renderItem(item, key) {
    const className = classNames({ 'is-active': this.props.active === key });
    const { onItemClick } = this.props;

    let onClick;
    if (typeof onItemClick === 'function') onClick = onItemClick.bind(this, key);

    return <li {...{ key, className, onClick }} />;
  }

  render() {
    const className = classNames('c-dots', this.props.className);
    const cleanProps = omit(this.props, 'active', 'count', 'onItemClick');

    const items = arrayOf(this.props.count).map(this.renderItem);
    return <ul {...cleanProps} className={className}>{items}</ul>;
  }
}

Dots.propTypes = {
  className: PropTypes.string,
  active: PropTypes.number,
  count: PropTypes.number,
  onItemClick: PropTypes.func,
};

export default Dots;
