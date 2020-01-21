import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { renderShortname } from 'emojitsu';

import ContextList from '../context_list';


class EmojiSuggestions extends PureComponent {
  componentDidMount() {
    this.list.activate();
  }

  componentWillUnmount() {
    this.list.deactivate();
  }

  renderOption(key, list) {
    const shortname = list[key];
    const safeContent = { __html: renderShortname(shortname, { single: true }) };

    return (
      <small className="c-emoji_suggestions-option">
        <span dangerouslySetInnerHTML={safeContent} />
        {shortname}
      </small>
    );
  }

  render() {
    const className = clsx('c-emoji_suggestions', this.props.className);
    const ref = (el) => { this.list = el; };
    return <ContextList {...this.props} {...{ className, ref }} getOption={this.renderOption} />;
  }
}

EmojiSuggestions.propTypes = {
  className: PropTypes.string,
};

export default EmojiSuggestions;
