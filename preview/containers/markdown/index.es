import React from 'react';

import Header from '../../components/header';

import content from '../../sample_markdown.es';
import Markdown from '../../../lib/markdown';

const MarkdownPreview = () => (
  <article className="preview-markdown">
    <Header>Markdown</Header>
    <div className="preview-section">
      <Markdown text={content} />
    </div>
    <div className="preview-section">
      <Markdown text="Inline markdown" inline /> to use in sentences
    </div>
  </article>
);


export default MarkdownPreview;
