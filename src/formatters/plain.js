import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) return JSON.stringify(value).replace(/"/g, "'");
  return JSON.stringify(value, null, '  ').replace(/"/g, '');
};

const plain = (array, parent = '') => array
  .map(({
    name,
    state,
    value,
    currentValue,
    changedValue,
    children,
  }) => {
    if (children) {
      return plain(children, `${parent}${name}.`);
    }
    if (state === 'changed') {
      return `Property '${parent}${name}' was changed from ${stringify(changedValue)} to ${stringify(currentValue)}`;
    }
    if (state === 'deleted') {
      return `Property '${parent}${name}' was deleted`;
    }
    return `Property '${parent}${name}' was added with value: ${stringify(value)}`;
  })
  .join('\n');

export default plain;
