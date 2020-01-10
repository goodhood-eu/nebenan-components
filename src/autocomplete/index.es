import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import classNames from 'classnames';

import keymanager from 'nebenan-helpers/lib/keymanager';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { invoke, bindTo } from 'nebenan-helpers/lib/utils';

import Input from 'nebenan-form/lib/input';

import mergeMethods from 'nebenan-react-hocs/lib/merge_methods';

import ContextList from '../context_list';

const defaultGetValue = (key, options) => options[key];


class Autocomplete extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'show',
      'hide',
      'handleGlobalClick',
      'handleSelect',
      'handleUpdate',
    );
    this.els = {};
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;

    if (options !== prevProps.options) {
      if (options && options.length) this.show();
      else this.hide();
    }
  }

  componentWillUnmount() {
    this.hide();
    this.isUnmounted = true;
  }

  setEl(name) {
    return (el) => { this.els[name] = el; };
  }

  getNestedRef() {
    return this.els.input;
  }

  show() {
    if (this._isActive) return;

    this.els.list.activate();
    this.stopListeningToKeys = keymanager('esc', this.hide);
    this.stopListeningToClicks = eventproxy('click', this.handleGlobalClick);

    this._isActive = true;
  }

  hide() {
    if (!this._isActive) return;

    this.els.list.deactivate();
    this.stopListeningToKeys();
    this.stopListeningToClicks();

    this._isActive = false;
  }

  handleGlobalClick(event) {
    if (this.isUnmounted) return;
    if (!this.els.container.contains(event.target)) this.hide();
  }

  handleSelect(key) {
    const { getValue, options, onSelect } = this.props;
    const getter = getValue || defaultGetValue;
    const value = getter(key, options);

    const complete = () => {
      this._isSelected = false;
      this.hide();
      this.els.input.validate();
      invoke(onSelect, value, key);
    };

    this._isSelected = true;
    this.els.input.setValue(value, complete);
  }

  handleUpdate(value) {
    const { onUpdate, onInput } = this.props;
    if (this._isSelected) invoke(onUpdate, value, 'select');
    else {
      invoke(onUpdate, value, 'change');
      invoke(onInput, value);
    }
  }

  renderList() {
    const { options, getOption, listChildren } = this.props;

    return (
      <div className="c-autocomplete-content ui-card">
        <ContextList
          ref={this.setEl('list')} className="ui-options"
          options={options} getOption={getOption}
          onSelect={this.handleSelect}
        />
        {listChildren}
      </div>
    );
  }

  render() {
    const { listChildren, options } = this.props;
    const className = classNames('c-autocomplete', this.props.className, {
      'is-active': (listChildren || (options && options.length)),
    });
    const cleanProps = omit(this.props,
      'children',
      'options',
      'getOption',
      'onInput',
      'onSelect',
      'getValue',
      'listChildren',
      'className',
    );

    return (
      <article ref={this.setEl('container')} className={className}>
        <Input
          {...cleanProps} ref={this.setEl('input')} autoComplete="off"
          onUpdate={this.handleUpdate}
        >
          {this.renderList()}
          {this.props.children}
        </Input>
      </article>
    );
  }
}

Autocomplete.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  getOption: PropTypes.func,
  listChildren: PropTypes.node,
  getValue: PropTypes.func,

  onSelect: PropTypes.func,
  onUpdate: PropTypes.func,
  onInput: PropTypes.func,
};

const methods = [
  'getInput',
  'validate',
  'getCaretPosition',
  'replaceValue',
  'setValue',
  'getValue',
  'setError',
  'reset',
  'focus',
  'blur',
  'show',
  'hide',
];
export default mergeMethods(methods, Autocomplete);
