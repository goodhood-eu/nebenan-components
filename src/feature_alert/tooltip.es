import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { invoke } from 'nebenan-helpers/lib/utils';

import { useEscHandler, useOutsideClick } from './hooks';
import { getTriggerProps } from './utils';
import {
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_RIGHT,
  TRIGGER_HOVER,
  TRIGGER_CLICK,
  TRIGGER_DELAYED,
} from './constants';

const DELAY_TIMEOUT = 1000 * 3;


const FeatureAlertTooltip = (props) => {
  const {
    position,
    trigger,
    content,
    children,
    closeIcon,
    defaultOpen,
    onOpen,
    onClose,
    ...cleanProps
  } = props;

  const [isOpen, setOpen] = useState(defaultOpen);
  const ref = useRef(null);

  // need to be able to only open once
  const wasActive = useRef(defaultOpen);
  const isActive = useRef(defaultOpen);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isActive.current || wasActive.current) return;

    wasActive.current = true;
    isActive.current = true;

    setOpen(true);
    invoke(onOpen);
  }, [onOpen]);

  const handleClose = useCallback(() => {
    if (!isActive.current) return;
    isActive.current = false;

    setOpen(false);
    invoke(onClose);
  }, [onClose]);

  useEscHandler(handleClose);
  useOutsideClick(ref, handleClose);

  useEffect(() => {
    const tid = (trigger === TRIGGER_DELAYED) ? setTimeout(handleOpen, DELAY_TIMEOUT) : 0;
    return () => clearTimeout(tid);
  }, [trigger, handleOpen]);

  const className = clsx(`c-feature_alert_tooltip is-placement-${position}`, props.className, {
    'is-active': isOpen,
  });

  const triggerProps = !isOpen && getTriggerProps(trigger, handleOpen);

  return (
    <article {...cleanProps} className={className} ref={ref} onClick={handleClose}>
      <aside className="c-feature_alert_tooltip-container">
        <i className="c-feature_alert_tooltip-arrow" />
        <div className="c-feature_alert_tooltip-content">
          {content}
          {closeIcon && <i className="c-feature_alert_tooltip-cross icon-cross" />}
        </div>
      </aside>
      <div {...triggerProps}>{children}</div>
    </article>
  );
};

FeatureAlertTooltip.defaultProps = {
  position: POSITION_LEFT,
  closeIcon: false,
  defaultOpen: false,
};

FeatureAlertTooltip.propTypes = {
  className: PropTypes.string,
  position: PropTypes.oneOf([
    POSITION_TOP,
    POSITION_BOTTOM,
    POSITION_LEFT,
    POSITION_RIGHT,
  ]),
  trigger: PropTypes.oneOf([
    TRIGGER_HOVER,
    TRIGGER_CLICK,
    TRIGGER_DELAYED,
  ]),
  content: PropTypes.node.isRequired,
  children: PropTypes.node,
  closeIcon: PropTypes.bool.isRequired,
  defaultOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default FeatureAlertTooltip;
