import { Link } from 'react-router-dom';
import Header from '../../components/header';

export default () => (
  <article className="preview-index">
    <Header noLink>Index</Header>
    <div className="preview-section">
      <ul className="ui-options">
        <li><Link to="/sliders">Sliders</Link></li>
        <li><Link to="/content">Content</Link></li>
        <li><Link to="/utility">Utility</Link></li>
        <li><Link to="/misc">Misc</Link></li>
      </ul>
    </div>
  </article>
);
