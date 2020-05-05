import _ from 'lodash';

const getPad = (num) => '  '.repeat(num);

const stringify = (data, depth = 0) => {
  if (_.isString(data)) return `'${data}'`;
  if (_.isArray(data)) return `[${data}]`;
  if (_.isObject(data)) {
    return `{\n${_.entries(data)
      .map(([key, value]) => (`${getPad(depth + 1)}${key}: ${stringify(value, depth + 1)}`))
      .join('\n')}\n${getPad(depth)}}`;
  }
  return data;
};

const plainFormat = (nodes, parent = '') => nodes
  .map(({
    name,
    type,
    previousValue,
    currentValue,
    value,
    children,
  }) => {
    switch (type) {
      case 'added':
        return `Property '${parent}${name}' was added with value: ${stringify(value)}`;
      case 'deleted':
        return `Property '${parent}${name}' was deleted`;
      case 'changed':
        return `Property '${parent}${name}' was changed from ${stringify(previousValue)} to ${stringify(currentValue)}`;
      case 'unchanged':
        return null;
      case 'parent':
        return plainFormat(children, `${parent}${name}.`);
      default:
        throw new Error(`Something went wrong. The type ${type} does not exist.`);
    }
  })
  .join('\n');

export default plainFormat;
