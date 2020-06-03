import React from 'react';

import Header from '../../components/header';

import Tooltip from '../../../lib/tooltip';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  Label as FALabel,
  Tooltip as FATooltip,
} from '../../../lib/feature_alert';
import content from '../../sample_data';


const Dropdowns = () => (
  <article className="preview-content">
    <Header>Content</Header>

    <div className="preview-section preview-feature_alert_label">
      <ul>
        <li>
          <div>
            <FALabel label="top" position={POSITION_TOP}>{content.tooltip.slice(0, 15)}</FALabel>
          </div>
          <div>
            <FALabel label="bottom" position={POSITION_BOTTOM}>{content.tooltip.slice(0, 15)}</FALabel>
          </div>
          <div>
            <FALabel label="left" position={POSITION_LEFT}>{content.tooltip.slice(0, 15)}</FALabel>
          </div>
          <div>
            <FALabel label="right" position={POSITION_RIGHT}>{content.tooltip.slice(0, 15)}</FALabel>
          </div>
        </li>
      </ul>
    </div>


    <div className="preview-section preview-feature_alert_tooltip">
      <ul>
        <li>
          <div><FATooltip>{content.tooltip}</FATooltip></div>
        </li>
      </ul>
    </div>

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
