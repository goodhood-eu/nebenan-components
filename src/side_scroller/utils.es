export const easeInOutCubic = (pos) => {
  if (pos < .5) return 4 * (pos ** 3);
  return ((pos - 1) * ((2 * pos) - 2) * ((2 * pos) - 2)) + 1;
};

export const getPosition = (startPosition, targetPosition, elapsedTime, duration) => {
  const shift = easeInOutCubic(Math.min(elapsedTime / duration, 1));
  return startPosition + Math.floor((targetPosition - startPosition) * shift);
};
