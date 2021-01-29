import { useEffect } from 'react';
import keymanager from 'nebenan-helpers/lib/keymanager';
import eventproxy from 'nebenan-helpers/lib/eventproxy';
import { invoke } from 'nebenan-helpers/lib/utils';

export const useEscHandler = (callback) => useEffect(() => keymanager('esc', callback), [callback]);
export const useOutsideClick = (ref, callback) => useEffect(() => {
  const handler = (event) => {
    if (!ref.current) return;
    if (!ref.current.contains(event.target)) invoke(callback, event);
  };

  return eventproxy('click', handler);
}, [ref, callback]);
