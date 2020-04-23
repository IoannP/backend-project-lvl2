import _ from 'lodash';

const stringify = (value) => {
  if (!_.isObject(value)) return JSON.stringify(value).replace(/"/g, "'");
  const getPairs = _.entries(value);
  return `'{ ${getPairs.map((pair) => pair.join(': ')).join(', ')} }'`;
};

const plain = (arr, parent = '') => {
  return arr
    .reduce((acc, {
      name,
      state,
      value,
      changedValue,
      children,
    }) => {
      if (children) {
        return [...acc, plain(children, `${parent}${name}.`)];
      }
      if (state === 'changed') {
        return [...acc, `Property '${parent}${name}' was changed from ${stringify(value)} to ${stringify(changedValue)}`];
      }
      if (state === 'deleted') {
        return [...acc, `Property '${parent}${name}' was deleted`];
      }
      if (state === 'added') {
        return [...acc, `Property '${parent}${name}' was added with value: ${stringify(value)}`];
      }
      return acc;
    }, [])
    .join('\n');
};

export default plain;
