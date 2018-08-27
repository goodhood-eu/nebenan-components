import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class Expandable extends PureComponent {
  constructor(props) {
    super(props);
    this.handleControlClick = this.handleControlClick.bind(this);
    this.state = { isActive: props.defaultState };
  }

  handleControlClick() {
    this.setState((prevState) => ({ isActive: !prevState.isActive }), this.props.onUpdate);
  }

  render() {
    const { isActive } = this.state;
    const { children, defaultState, control, onUpdate, ...cleanProps } = this.props;
    const className = classNames('c-expandable', this.props.className, {
      'is-active': isActive,
    });

    const content = isActive && <div className="c-expandable-content">{children}</div>;

    return (
      <article {...cleanProps} className={className}>
        <aside className="c-expandable-control" onClick={this.handleControlClick}>
          {control}
        </aside>
        {content}
      </article>
    );
  }
}

Expandable.defaultProps = {
  defaultState: false,
};

Expandable.propTypes = {
  className: PropTypes.string,
  control: PropTypes.node.isRequired,
  defaultState: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func,
  children: PropTypes.node,
};

export default Expandable;
