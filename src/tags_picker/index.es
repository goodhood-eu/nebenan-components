import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';

import { arrayToHash } from 'nebenan-helpers/lib/data';
import { bindTo } from 'nebenan-helpers/lib/utils';

import proxyRef from 'nebenan-react-hocs/lib/proxy_ref';

import TagCloud from '../tag_cloud';
import TagInput from '../tag_input';


class TagsPicker extends PureComponent {
  constructor(props) {
    super(props);
    bindTo(this,
      'handleSelect',
    );
    this.els = {};
  }

  setEl(name) {
    return (el) => { this.els[name] = el; };
  }

  handleSelect(tag) {
    if (this.itemsHash[tag]) return;

    this.props.onSelect(tag);
    this.els.tagInput.reset();
  }

  render() {
    const className = classNames('c-tags_picker', this.props.className);
    const cleanProps = omit(this.props,
      'children',

      'placeholder',
      'options',
      'items',

      'onSelect',
    );

    const {
      options,
      items,
      placeholder,
      children,
      forwardedRef,
      errorMessage,
      addMessage,
    } = this.props;
    this.itemsHash = arrayToHash(items);

    return (
      <TagCloud {...cleanProps} ref={forwardedRef} items={items} className={className}>
        <TagInput
          ref={this.setEl('tagInput')}
          placeholder={placeholder}
          options={options}
          onSelect={this.handleSelect}
          errorMessage={errorMessage}
          addMessage={addMessage}
        />
        {children}
      </TagCloud>
    );
  }
}

TagsPicker.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,

  placeholder: PropTypes.string,
  options: PropTypes.array,
  items: PropTypes.array,

  errorMessage: PropTypes.string,
  addMessage: PropTypes.string,

  onSelect: PropTypes.func.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default proxyRef(TagsPicker);
