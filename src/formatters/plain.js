import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) return JSON.stringify(value).replace(/"/g, "'");
  return JSON.stringify(value, null, '  ').replace(/"/g, '');
};

const plainFormat = (nodes, parent = '') => nodes
  .map(({
    name,
    type,
    value,
    currentValue,
    changedValue,
    children,
  }) => {
    switch (type) {
      case 'added':
        return `Property '${parent}${name}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${parent}${name}' was deleted`;
      case 'changed':
        return `Property '${parent}${name}' was changed from ${stringify(changedValue)} to ${stringify(currentValue)}`;
      case 'unchanged':
        return '';
      default:
        return plainFormat(children, `${parent}${name}.`);
    }
  })
  .join('\n');

export default plainFormat;
