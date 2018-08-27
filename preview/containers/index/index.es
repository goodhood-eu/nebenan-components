import React from 'react';
import Link from 'react-router/lib/Link';
import Header from '../../components/header';

export default () => (
  <article>
    <Header noLink>Index</Header>
    <div className="preview-section">
      <ul className="ui-options">
        <li><Link to="/meta">Meta</Link></li>
        <li><Link to="/sliders">Sliders</Link></li>
        <li><Link to="/content">Content</Link></li>
        <li><Link to="/markdown">Markdown</Link></li>
        <li><Link to="/utility">Utility</Link></li>
        <li><Link to="/misc">Misc</Link></li>
      </ul>
    </div>
  </article>
);
