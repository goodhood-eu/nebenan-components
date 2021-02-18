const DATA_TRACK_PREFIX = 'data-track';

export const parseDataTrack = (options) => Object.keys(options).reduce((acc, elem) => {
  if (elem.includes(DATA_TRACK_PREFIX)) {
    acc[elem] = options[elem];
  }
  return acc;
}, {});
