import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import clsx from 'clsx';

import { bindTo, invoke } from 'nebenan-helpers/lib/utils';
import eventproxy from 'nebenan-helpers/lib/eventproxy';

import InputComponent from 'nebenan-form/lib/base';
import Emoji from '../emoji';

import { getOption } from './utils';

export const TAG_LIMIT = 34;
export const SEARCH_CHANGE_RATE = 300;


class TagCloud extends InputComponent {
  constructor(props) {
    const { multiple, radio } = props;
    if (multiple && radio) throw new Error('TagCloud can be either multiple, or radio, not both.');
    super(props);

    bindTo(this,
      'handleGlobalClick',
      'renderTag',
    );

    this.setValue = throttle(super.setValue, SEARCH_CHANGE_RATE);
  }

  componentDidMount() {
    super.componentDidMount();
    if (!this.props.readOnly) this.activate();
  }

  componentWillUnmount() {
    this.deactivate();
    invoke(this.setValue.cancel);
    super.componentWillUnmount();
  }

  componentDidUpdate() {
    if (this.props.readOnly) this.deactivate();
    else this.activate();
  }

  getDefaultState(props) {
    const state = super.getDefaultState(props);
    if (!state.value) state.value = props.multiple ? [] : null;
    return state;
  }

  activate() {
    if (this.isActive) return;
    this.stopListeningToClicks = eventproxy('click', this.handleGlobalClick);
    this.isActive = true;
  }

  deactivate() {
    if (!this.isActive) return;
    this.stopListeningToClicks();
    this.isActive = false;
  }

  handleGlobalClick(event) {
    if (!this.isComponentMounted) return;
    if (!this.isPristine() && !this.els.container.contains(event.target)) this.validate();
  }

  handleClick(item, event) {
    const { value } = getOption(item);
    const currentValue = this.getValue();
    const { multiple, radio, onClick } = this.props;

    let newValue;
    if (multiple) {
      const index = currentValue.indexOf(value);
      newValue = currentValue.slice();

      if (index >= 0) newValue.splice(index, 1);
      else newValue.push(value);
    } else if (currentValue === value && !radio) newValue = null;
    else newValue = value;


    if (newValue !== currentValue) this.setValue(newValue);
    this.actionClearError(onClick)(event);
  }

  renderTag(item) {
    const { multiple, readOnly, itemClassName } = this.props;
    const { key, value } = getOption(item);
    const currentValue = this.getValue();

    let isActive;
    if (currentValue !== null) {
      if (multiple) isActive = currentValue.includes(value);
      else isActive = value === currentValue;
    }

    const className = clsx('c-tag_cloud-item ui-tag', itemClassName, {
      'ui-tag-secondary': !isActive,
      'ui-tag-primary': isActive,
    });

    let handler;
    if (!readOnly) handler = this.handleClick.bind(this, item);

    return (
      <li key={value} className={className} onClick={handler}>
        <Emoji text={key} limit={TAG_LIMIT} />
      </li>
    );
  }

  render() {
    const { readOnly, radio, label, items, children } = this.props;
    const className = clsx('c-tag_cloud', this.props.className, {
      'is-locked': readOnly,
      'is-radio': radio,
    });

    let error;
    if (this.isErrorActive()) error = <em className="ui-error">{this.getError()}</em>;

    let labelNode;
    if (label) labelNode = <strong className="ui-label c-tag_cloud-label">{label}</strong>;

    return (
      <article className={className} ref={this.setEl('container')}>
        {labelNode}
        <ul className="c-tag_cloud-list">{items.map(this.renderTag)}</ul>
        {children}
        {error}
      </article>
    );
  }
}

TagCloud.defaultProps = {
  readOnly: false,
  radio: false,
  multiple: false,
};

TagCloud.propTypes = {
  ...InputComponent.propTypes,

  className: PropTypes.string,
  itemClassName: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  radio: PropTypes.bool.isRequired,
  label: PropTypes.node,
  items: PropTypes.array.isRequired,
  multiple: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default TagCloud;
