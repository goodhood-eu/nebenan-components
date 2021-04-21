import Header from '../../components/header';

import Tooltip from '../../../lib/tooltip';
import content from '../../sample_data';


const Dropdowns = () => (
  <article className="preview-content">
    <Header>Content</Header>

    <div className="preview-section preview-tooltips">
      <ul>
        <li>
          <div><Tooltip text={content.tooltip}>Tooltip top</Tooltip></div>
          <div><Tooltip type="bottom" text={content.tooltip}>Tooltip bottom</Tooltip></div>
        </li>
        <li>
          <div><Tooltip type="left" text={content.tooltip}>Tooltip left</Tooltip></div>
          <div><Tooltip type="right" text={content.tooltip}>Tooltip right</Tooltip></div>
        </li>
      </ul>
    </div>

  </article>
);

export default Dropdowns;
