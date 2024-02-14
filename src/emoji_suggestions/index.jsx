import PropTypes from 'prop-types';
import clsx from 'clsx';
import { renderShortname } from 'emojitsu';

import ContextList from '../context_list';


const renderOption = (key, list) => {
  const shortname = list[key];
  const safeContent = { __html: renderShortname(shortname, { single: true }) };

  return (
    <small className="c-emoji_suggestions-option">
      <span dangerouslySetInnerHTML={safeContent} />
      {shortname}
    </small>
  );
};

/**
 * @deprecated switch to emoji-mart based solution, see CORE-14087 for implementation details
 */
const EmojiSuggestions = (props) => {
  const className = clsx('c-emoji_suggestions', props.className);
  return <ContextList {...props} defaultActive className={className} getOption={renderOption} />;
};

EmojiSuggestions.propTypes = {
  className: PropTypes.string,
};

export default EmojiSuggestions;
