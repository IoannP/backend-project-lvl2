import _ from 'lodash';

const getPads = (num) => _.repeat(' ', num);

const stringify = (data, pads) => {
  if (!_.isObject(data)) {
    return data;
  }
  const objectStringified = _.entries(data)
    .map(([key, value]) => (_.isObject(value)
      ? `${getPads(pads + 4)}${key}: ${stringify(value, pads + 2)}`
      : `${getPads(pads + 4)}${key}: ${value}`));
  return `{\n${objectStringified.join('\n')}\n${getPads(pads + 2)}}`;
};

const treeFormat = (nodes, pads = 2) => {
  const tree = nodes.map(({
    name,
    type,
    value,
    currentValue,
    changedValue,
    children,
  }) => {
    switch (type) {
      case 'added':
        return `${getPads(pads)}+ ${name}: ${stringify(value, pads)}`;
      case 'deleted':
        return `${getPads(pads)}- ${name}: ${stringify(value, pads)}`;
      case 'unchanged':
        return `${getPads(pads)}  ${name}: ${stringify(value, pads)}`;
      case 'changed':
        return `${getPads(pads)}- ${name}: ${stringify(changedValue, pads)}\n${getPads(pads)}+ ${name}: ${stringify(currentValue, pads)}`;
      default:
        return `${getPads(pads)}  ${name}: ${treeFormat(children, pads + 4)}`;
    }
  });
  return `{\n${tree.join('\n')}\n${getPads(pads - 2)}}`;
};

export default treeFormat;
