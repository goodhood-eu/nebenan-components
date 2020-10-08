import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePopper } from 'react-popper';

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
    fallbackPosition,
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
  const refElement = useRef(null);
  const refTooltip = useRef(null);
  const refArrow = useRef(null);
  const { styles, attributes, state } = usePopper(refElement.current, refTooltip.current, {
    placement: position,
    modifiers: [
      {
        name: 'arrow', options: { element: refArrow.current },
      },
      {
        name: 'offset', options: { offset: [0, 10] },
      },
      {
        name: 'flip',
        options: {
          padding: 10,
          fallbackPlacements: [POSITION_TOP, POSITION_LEFT, POSITION_BOTTOM, POSITION_RIGHT],
        },
      },
    ],
  });

  console.log(state, 'HERE IS STATE');

  // need to be able to only open once
  const wasActive = useRef(defaultOpen);

  const handleOpen = useCallback((event) => {
    if (event) event.stopPropagation();
    if (isOpen || wasActive.current) return;
    wasActive.current = true;
    setOpen(true);
    invoke(onOpen);
  }, [isOpen, onOpen]);

  const handleClose = useCallback(() => {
    if (!isOpen) return;
    setOpen(false);
    invoke(onClose);
  }, [isOpen, onClose]);

  useEscHandler(handleClose);
  useOutsideClick(ref, handleClose);

  useEffect(() => {
    let tid;
    if (trigger === TRIGGER_DELAYED && !wasActive.current) {
      tid = setTimeout(handleOpen, DELAY_TIMEOUT);
    }

    return () => clearTimeout(tid);
  }, [trigger, handleOpen]);

  const className = clsx('c-feature_alert_tooltip', props.className, {
    'is-active': isOpen,
  });

  const triggerProps = !isOpen && getTriggerProps(trigger, handleOpen);

  return (
    <article {...cleanProps} className={className} ref={ref} onClick={handleClose}>
      <aside className="c-feature_alert_tooltip-container" ref={refTooltip} style={styles.popper} {...attributes.popper}>
        <div data-popper-arrow className="c-feature_alert_tooltip-arrow" ref={refArrow} style={styles.arrow} />
        <div className="c-feature_alert_tooltip-content">
          {content}
          {closeIcon && <i className="c-feature_alert_tooltip-cross icon-cross" />}
        </div>
      </aside>
      <div {...triggerProps} ref={refElement}>{children}</div>
    </article>
  );
};

FeatureAlertTooltip.defaultProps = {
  position: POSITION_LEFT,
  fallbackPosition: POSITION_RIGHT,
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
  fallbackPosition: PropTypes.oneOf([
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
