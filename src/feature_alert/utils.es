import {
  TRIGGER_HOVER,
  TRIGGER_CLICK,
} from './constants';

export const getTriggerProps = (trigger, handler) => {
  const props = {};
  if (trigger === TRIGGER_HOVER) props.onMouseEnter = handler;
  else if (trigger === TRIGGER_CLICK) props.onClick = handler;
  return props;
};
