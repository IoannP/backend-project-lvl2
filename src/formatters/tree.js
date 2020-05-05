import _ from 'lodash';

const getPad = (num) => _.repeat('  ', num);

const stringify = (data, depth) => {
  if (_.isArray(data)) return `[${data}]`;
  if (_.isObject(data)) {
    const padStart = getPad(depth * 2 + 1);
    const padEnd = getPad(depth * 2);
    const objectStringified = _.entries(data)
      .map(([key, value]) => (_.isObject(value)
        ? `${padStart}  ${key}: ${stringify(value, depth + 1)}`
        : `${padStart}  ${key}: ${value}`));
    return `{\n${objectStringified.join('\n')}\n${padEnd}}`;
  }
  return data;
};

const treeFormat = (nodes, depth = 1) => nodes.map(({
  name,
  type,
  value,
  previousValue,
  currentValue,
  children,
}) => {
  const padStart = depth > 1 ? getPad(depth * 2 - 1) : getPad(depth);
  const padEnd = getPad(depth * 2);
  switch (type) {
    case 'added':
      return `${padStart}+ ${name}: ${stringify(value, depth)}`;
    case 'deleted':
      return `${padStart}- ${name}: ${stringify(value, depth)}`;
    case 'unchanged':
      return `${padStart}  ${name}: ${stringify(value, depth)}`;
    case 'changed':
      return `${padStart}- ${name}: ${stringify(previousValue, depth)}\n${padStart}+ ${name}: ${stringify(currentValue, depth)}`;
    case 'parent':
      return `${padStart}  ${name}: {\n${treeFormat(children, depth + 1)}\n${padEnd}}`;
    default:
      throw new Error(`Something went wrong. The type ${type} does not exist.`);
  }
}).join('\n');

export default (data) => `{\n${treeFormat(data)}\n}`;
