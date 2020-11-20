import Header from '../../components/header';

import Tooltip from '../../../lib/tooltip';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,

  TRIGGER_HOVER,
  TRIGGER_CLICK,
  TRIGGER_DELAYED,

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
            <FALabel label="top" position={POSITION_TOP}>
              {content.tooltip.slice(0, 15)}
            </FALabel>
          </div>
          <div>
            <FALabel label="bottom" position={POSITION_BOTTOM}>
              {content.tooltip.slice(0, 15)}
            </FALabel>
          </div>
          <div>
            <FALabel label="left" position={POSITION_LEFT}>
              {content.tooltip.slice(0, 15)}
            </FALabel>
          </div>
          <div>
            <FALabel label="right" position={POSITION_RIGHT}>
              {content.tooltip.slice(0, 15)}
            </FALabel>
          </div>
        </li>
      </ul>
    </div>


    <div className="preview-section preview-feature_alert_tooltip">
      <ul>
        <li>
          <div>
            <FATooltip
              content={content.tooltip} position={POSITION_TOP}
              trigger={TRIGGER_HOVER} closeIcon
            >
              {POSITION_TOP}
            </FATooltip>
          </div>
          <div>
            <FATooltip
              content={content.tooltip} position={POSITION_BOTTOM}
              trigger={TRIGGER_HOVER} closeIcon
            >
              {POSITION_BOTTOM}
            </FATooltip>
          </div>
          <div>
            <FATooltip
              content={content.tooltip} position={POSITION_LEFT}
              trigger={TRIGGER_HOVER} closeIcon
            >
              {POSITION_LEFT}
            </FATooltip>
          </div>
          <div>
            <FATooltip
              content={content.tooltip} position={POSITION_RIGHT}
              trigger={TRIGGER_HOVER} closeIcon
            >
              {POSITION_RIGHT}
            </FATooltip>
          </div>
        </li>
        <li>
          <div>
            <FATooltip content={content.tooltip}>
              NO TRIGGER
            </FATooltip>
          </div>
          <div>
            <FATooltip content={content.tooltip} defaultOpen closeIcon>
              defaultOpen
            </FATooltip>
          </div>
          <div>
            <FATooltip content={content.tooltip} trigger={TRIGGER_HOVER}>
              {TRIGGER_HOVER}
            </FATooltip>
          </div>
          <div>
            <FATooltip content={content.tooltip} trigger={TRIGGER_CLICK}>
              {TRIGGER_CLICK}
            </FATooltip>
          </div>
          <div>
            <FATooltip content={content.tooltip} trigger={TRIGGER_DELAYED}>
              {TRIGGER_DELAYED}
            </FATooltip>
          </div>
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
