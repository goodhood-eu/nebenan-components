import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Markdown from '../markdown';


const ContentHeader = (props) => {
  const { action, title, description, children, ...cleanProps } = props;
  const className = clsx('c-content_header', props.className, {
    'has-action': action,
  });

  let titleContent;
  let descriptionContent;
  let footerContent;

  if (title) titleContent = <h1>{title}</h1>;

  if (description) {
    descriptionContent = (
      <Markdown
        className="c-content_header-description ui-text-light"
        text={description} inline
      />
    );
  }

  if (action || children) {
    let actionContent;
    let childrenContent;

    if (action) actionContent = <span className="c-content_header-action">{action}</span>;
    if (children) childrenContent = <div className="c-content_header-content">{children}</div>;

    footerContent = (
      <aside className="c-content_header-controls">
        {actionContent}
        {childrenContent}
      </aside>
    );
  }

  if (!titleContent && !descriptionContent && !footerContent) return null;

  return (
    <header {...cleanProps} className={className}>
      {titleContent}
      {descriptionContent}
      {footerContent}
    </header>
  );
};

ContentHeader.propTypes = {
  className: PropTypes.string,
  action: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default ContentHeader;
