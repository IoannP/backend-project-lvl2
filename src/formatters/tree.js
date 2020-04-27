const makeTree = (array) => array
  .reduce((acc, {
    name,
    state,
    value,
    currentValue,
    changedValue,
    children,
  }) => {
    if (children) {
      return { ...acc, [`  ${name}`]: makeTree(children) };
    }
    if (state === 'changed') {
      return { ...acc, [`- ${name}`]: changedValue, [`+ ${name}`]: currentValue };
    }
    if (state === 'added') {
      return { ...acc, [`+ ${name}`]: value };
    }
    if (state === 'deleted') {
      return { ...acc, [`- ${name}`]: value };
    }
    return { ...acc, [`  ${name}`]: value };
  }, {});

export default (array) => JSON.stringify(makeTree(array), null, 4).replace(/"/g, '');
