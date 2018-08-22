import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

import { arrayToHash } from 'nebenan-helpers/lib/data';
import { invoke, bindTo } from 'nebenan-helpers/lib/utils';
import keymanager, { keys as keyMap } from 'nebenan-helpers/lib/keymanager';

const { UP, DOWN, TAB, ENTER } = keyMap;
const defaultGetOption = (key, options) => options[key];
const preventableKeys = arrayToHash([UP, DOWN, TAB]);


class ContextList extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'handleKey',
      'handleMouseLeave',
      'renderOption',
    );

    this.state = this.getDefaultState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      const nextState = {
        keys: Object.keys(nextProps.options),
        selected: null,
      };

      this.setState(nextState);
    }
  }

  componentWillUnmount() {
    this.deactivate();
  }

  getDefaultState(props) {
    return {
      keys: Object.keys(props.options),
      isActive: false,
      selected: null,
    };
  }

  isActive() {
    return this._isActive;
  }

  activate() {
    if (this._isActive) return;
    this.stopListening = keymanager('up down tab enter space', this.handleKey);
    this.setState({ isActive: true });
    this._isActive = true;
  }

  deactivate() {
    if (!this._isActive) return;
    invoke(this.stopListening);
    this.setState({ isActive: false, selected: null });
    this._isActive = false;
  }

  selectNext(done) {
    const updater = (state) => {
      const defaultSelected = state.keys[0];
      let newSelected = defaultSelected;

      if (state.selected !== null) {
        const index = Math.max(0, state.keys.indexOf(state.selected));
        newSelected = state.keys[index + 1] || defaultSelected;
      }

      return { selected: newSelected };
    };

    this.setState(updater, done);
  }

  selectPrevious(done) {
    const updater = (state) => {
      const defaultSelected = state.keys[state.keys.length - 1];
      let newSelected = defaultSelected;

      if (state.selected !== null) {
        const index = Math.max(0, state.keys.indexOf(state.selected));
        newSelected = state.keys[index - 1] || defaultSelected;
      }

      return { selected: newSelected };
    };

    this.setState(updater, done);
  }

  handleKey(event) {
    if (preventableKeys[event.keyCode]) event.preventDefault();

    switch (event.keyCode) {
      case DOWN:
      case TAB: {
        this.selectNext();
        break;
      }

      case UP: {
        this.selectPrevious();
        break;
      }

      case ENTER: {
        if (this.state.selected !== null) {
          event.preventDefault();
          invoke(this.props.onSelect, this.state.selected, this.props.options);
        }
      }
    }
  }

  handleClick(key, event) {
    // Prevents from double events - e.g.: both onClick on item and onSelect would be triggered
    event.preventDefault();
    event.stopPropagation();

    this.setState({ selected: key });
    invoke(this.props.onSelect, key, this.props.options);
  }

  handleMouseEnter(key) {
    this.setState({ selected: key });
  }

  handleMouseLeave(event) {
    this.setState({ selected: null });
    invoke(this.props.onMouseLeave, event);
  }

  renderOption(key) {
    const className = classNames('c-context_list-item', {
      'is-selected': this.state.selected === key,
    });
    const getOption = this.props.getOption || defaultGetOption;
    const onClick = this.handleClick.bind(this, key);
    const onMouseEnter = this.handleMouseEnter.bind(this, key);
    const children = getOption(key, this.props.options);

    return <li {...{ key, className, onClick, onMouseEnter }}>{children}</li>;
  }

  render() {
    const { isActive, keys } = this.state;
    const className = classNames('c-context_list', this.props.className, {
      'is-active': isActive,
    });
    const cleanProps = omit(this.props, 'className', 'options', 'getOption', 'onSelect');

    return (
      <ul {...cleanProps} className={className} onMouseLeave={this.handleMouseLeave}>
        {keys.map(this.renderOption)}
      </ul>
    );
  }
}

ContextList.defaultProps = {
  options: [],
};

ContextList.propTypes = {
  className: PropTypes.string,

  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,

  getOption: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default ContextList;
