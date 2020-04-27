const makeTree = (array) => array
  .reduce((acc, {
    name,
    state,
    children,
    value,
    currentValue,
    changedValue,
  }) => {
    if (children) {
      return { ...acc, [name]: makeTree(children) };
    }
    if (state === 'changed') {
      return { ...acc, [name]: { state, changedValue, currentValue } };
    }
    return { ...acc, [name]: { state, value } };
  }, {});

export default (array) => JSON.stringify(makeTree(array), null, 2);
