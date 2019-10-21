import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const ANIMATION_DURATION = 400;

class LoadingBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active) this.setActive();
    else if (this.state.isActive) this.setComplete();

    this.clear();
    this._tid = setTimeout(this.reset, ANIMATION_DURATION);
  }

  componentWillUnmount() {
    this.clear();
  }

  getDefaultState(props) {
    return {
      isActive: props.active,
      isComplete: false,
    };
  }

  setActive() {
    this.setState({ isActive: true, isComplete: false });
  }

  setComplete() {
    this.setState({ isComplete: true });
  }

  clear() {
    if (this._tid) clearTimeout(this._tid);
  }

  reset(done) {
    this.setState({ isActive: false, isComplete: false }, done);
  }

  render() {
    const { isActive, isComplete } = this.state;
    const className = classNames('c-loading-bar', this.props.className, {
      'is-active': isActive,
      'is-complete': isComplete,
    });
    return <span className={className}><i /></span>;
  }
}

LoadingBar.defaultProps = {
  active: false,
};

LoadingBar.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool.isRequired,
};

export default LoadingBar;

export const LoadingSpinner = () => <aside className="c-loading-spinner"><i /></aside>;
