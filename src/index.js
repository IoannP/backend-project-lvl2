import _ from 'lodash';

export default (fileOne, fileTwo) => {
  const f1 = JSON.parse(fileOne);
  const f2 = JSON.parse(fileTwo);
  const keys = _.uniq([..._.keys(f1), ..._.keys(f2)]);
  const getDiff = keys.reduce((acc, value) => {
    if (_.has(f1, value) && _.has(f2, value)) {
      if (f1[value] === f2[value]) return { ...acc, [`  ${value}`]: f2[value] };
      return { ...acc, [`+ ${value}`]: f2[value], [`- ${value}`]: f1[value] };
    }
    if (_.has(f2, value)) {
      return { ...acc, [`+ ${value}`]: f2[value] };
    }
    return { ...acc, [`- ${value}`]: f1[value] };
  }, {});
  return JSON.stringify(getDiff, null, ' ').replace(/['"]+/g, '');
};
