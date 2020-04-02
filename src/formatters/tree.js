import _ from 'lodash';

const getPads = (num) => _.repeat(' ', num);

const stringify = (data, pads) => {
  if (!_.isObject(data)) {
    return data;
  }
  const pairs = _.entries(data);
  const result = pairs.map(([key, value]) => (_.isObject(value)
    ? `${getPads(pads + 4)}${key}: ${stringify(value, pads + 2)}`
    : `${getPads(pads + 4)}${key}: ${value}`));
  return `{\n${result.join('\n')}\n${getPads(pads + 2)}}`;
};

const getTree = (arr, pads = 2) => {
  const result = arr.map(({
    name,
    state,
    value,
    changedValue,
    children,
  }) => {
    if (children) {
      return `${getPads(pads)}  ${name}: ${getTree(children, pads + 4)}`;
    }
    if (state === 'changed') {
      return `${getPads(pads)}- ${name}: ${stringify(value, pads)}\n${getPads(pads)}+ ${name}: ${stringify(changedValue, pads)}`;
    }
    if (state === 'added') {
      return `${getPads(pads)}+ ${name}: ${stringify(value, pads)}`;
    }
    if (state === 'deleted') {
      return `${getPads(pads)}- ${name}: ${stringify(value, pads)}`;
    }
    return `${getPads(pads)}  ${name}: ${stringify(value, pads)}`;
  });
  return `{\n${result.join('\n')}\n${getPads(pads - 2)}}`;
};

export default getTree;
