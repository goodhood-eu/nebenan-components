import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { invoke } from 'nebenan-helpers/lib/utils';


class ClipboardText extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  copyToClipboard() {
    if (!document.queryCommandSupported) return false;

    this.select();
    let result;

    try {
      result = document.execCommand('copy');
    } catch (err) {
      result = false;
    }

    return result;
  }

  select() {
    // hack: contentEditable makes iOS selection work
    this.container.setAttribute('contentEditable', true);

    const range = document.createRange();
    range.selectNodeContents(this.container);

    const selection = global.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    this.container.setAttribute('contentEditable', false);
  }

  handleClick(event) {
    this.select();
    invoke(this.props.onClick, event);
  }

  render() {
    const className = clsx('c-clipboard_text', this.props.className);
    const ref = (el) => {
      this.container = el;
    };
    return <span {...this.props} className={className} ref={ref} onClick={this.handleClick} />;
  }
}

ClipboardText.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ClipboardText;
