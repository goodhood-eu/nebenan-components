import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { invoke } from 'nebenan-helpers/lib/utils';

import { useEscHandler, useMisClickHandler } from './hooks';
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

  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const wasActive = useRef(null);
  const isActive = useRef(false);

  const handleOpen = (event) => {
    if (event) event.stopPropagation();
    if (wasActive.current) return;
    wasActive.current = true;
    isActive.current = true;
    setOpen(true);
    invoke(onOpen);
  };

  const handleClose = () => {
    console.warn('close', isOpen, wasActive.current, isActive.current);
    if (!isActive.current) return;
    isActive.current = false;
    setOpen(false);
    invoke(onClose);
  };

  useEscHandler(handleClose);
  useMisClickHandler(ref, handleClose);

  useEffect(() => {
    if (defaultOpen) return handleOpen();
    if (trigger !== TRIGGER_DELAYED) return;
    const tid = setTimeout(handleOpen, DELAY_TIMEOUT);
    return () => clearTimeout(tid);
  }, []);

  const className = clsx(`c-feature_alert_tooltip is-placement-${position}`, props.className, {
    'is-active': isOpen,
  });

  return (
    <article {...cleanProps} className={className} ref={ref} onClick={handleClose}>
      <aside className="c-feature_alert_tooltip-container">
        <i className="c-feature_alert_tooltip-arrow" />
        <div className="c-feature_alert_tooltip-content">
          {content}
          {closeIcon && <i className="c-feature_alert_tooltip-cross icon-cross" />}
        </div>
      </aside>
      <div {...getTriggerProps(trigger, handleOpen)}>{children}</div>
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
