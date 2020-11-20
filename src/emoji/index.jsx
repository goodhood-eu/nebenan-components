import PropTypes from 'prop-types';
import clsx from 'clsx';
import { shortnamesToUnicode, render } from 'emojitsu';

import { shortenString } from 'smartcontent/lib/strings';


const Emoji = (props) => {
  const className = clsx('c-emoji', props.className);
  const { limit, text, options, ...cleanProps } = props;

  const content = typeof limit === 'number' ? shortenString(text, limit) : text;
  const safeContent = { __html: render(shortnamesToUnicode(content), options) };

  return <span {...cleanProps} className={className} dangerouslySetInnerHTML={safeContent} />;
};

Emoji.propTypes = {
  className: PropTypes.string,

  limit: PropTypes.number,
  text: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default Emoji;
