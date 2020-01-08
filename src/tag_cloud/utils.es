export const getOption = (option) => {
  let key;
  let value;
  if (typeof option === 'object') {
    key = option.key;
    value = option.value;
  } else {
    key = option;
    value = option;
  }

  return { key, value };
};
