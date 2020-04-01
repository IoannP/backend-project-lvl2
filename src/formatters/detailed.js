import _ from 'lodash';

const getIndents = (num) => _.repeat(' ', num);

const stringify = (data, indents) => {
  if (!_.isObject(data)) {
    return data;
  }
  const pairs = _.entries(data);
  const result = pairs.map(([key, value]) => (_.isObject(value)
    ? `${getIndents(indents + 4)}${key}: ${stringify(value, indents + 2)}`
    : `${getIndents(indents + 4)}${key}: ${value}`));
  return `{\n${result.join('\n')}\n${getIndents(indents + 2)}}`;
};

const detailed = (arr, indents = 2) => {
  const result = arr.map(({
    name,
    state,
    value,
    changedValue,
    children,
  }) => {
    if (children) {
      return `${getIndents(indents)}  ${name}: ${detailed(children, indents + 4)}`;
    }
    if (state === 'changed') {
      return `${getIndents(indents)}- ${name}: ${stringify(value, indents)}\n${getIndents(indents)}+ ${name}: ${stringify(changedValue, indents)}`;
    }
    if (state === 'added') {
      return `${getIndents(indents)}+ ${name}: ${stringify(value, indents)}`;
    }
    if (state === 'deleted') {
      return `${getIndents(indents)}- ${name}: ${stringify(value, indents)}`;
    }
    return `${getIndents(indents)}  ${name}: ${stringify(value, indents)}`;
  });
  return `{\n${result.join('\n')}\n${getIndents(indents - 2)}}`;
};

export default detailed;
