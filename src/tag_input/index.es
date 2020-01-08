import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { invoke, bindTo } from 'nebenan-helpers/lib/utils';

import proxyRef, { getMergedRef } from 'nebenan-react-hocs/lib/proxy_ref';

import Autocomplete from '../autocomplete';


class TagInput extends PureComponent {
  constructor(props) {
    super(props);

    bindTo(this,
      'getMergedRefFn',
      'handleEnterKey',
      'handleClick',
      'handleSelect',
      'handleValidSelect',
    );
  }

  getMergedRefFn() {
    return getMergedRef(this.props.forwardedRef, (ref) => { this.inputRef = ref; });
  }

  handleEnterKey(event) {
    event.preventDefault();
    invoke(this.props.onEnterKey, event);
    this.handleSelect();
  }

  handleClick(event) {
    event.preventDefault(); // do not reset validation
    this.handleSelect();
  }

  handleSelect() {
    this.inputRef.current.validate().then(this.handleValidSelect);
  }

  handleValidSelect() {
    const value = this.inputRef.current.getValue();
    if (value) invoke(this.props.onSelect, value);
  }

  render() {
    const className = classNames('c-tag_input', this.props.className);
    const { forwardedRef, errorMessage, addMessage, ...props } = this.props;

    return (
      <Autocomplete
        {...props} className={className} ref={this.getMergedRefFn()}
        onEnterKey={this.handleEnterKey} onSelect={this.handleSelect}
        error={errorMessage} validate="isShortText"
      >
        <span className="c-tag_input-add_button" onClick={this.handleClick}>
          {addMessage}
        </span>
        {this.props.children}
      </Autocomplete>
    );
  }
}

TagInput.propTypes = {
  className: PropTypes.string,
  addMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  children: PropTypes.node,

  onEnterKey: PropTypes.func,
  onSelect: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default proxyRef(TagInput);
