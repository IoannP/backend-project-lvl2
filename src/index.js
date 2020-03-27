import _ from 'lodash';
import parse from './parsers';

const path = require('path');
const fs = require('fs');

const compareData = (objOne, objTwo) => {
  const keys = _.uniq([..._.keys(objOne), ..._.keys(objTwo)]).sort();
  return keys.reduce((acc, value) => {
    if (_.has(objOne, value) && _.has(objTwo, value)) {
      if (_.isObject(objOne[value]) && _.isObject(objTwo[value])) {
        return { ...acc, [`  ${value}`]: compareData(objOne[value], objTwo[value]) };
      }
      if (objOne[value] === objTwo[value]) return { ...acc, [`  ${value}`]: objTwo[value] };
      return { ...acc, [`+ ${value}`]: objTwo[value], [`- ${value}`]: objOne[value] };
    }
    if (_.has(objTwo, value)) {
      return { ...acc, [`+ ${value}`]: objTwo[value] };
    }
    return { ...acc, [`- ${value}`]: objOne[value] };
  }, {});
};

const render = (obj, indents) => {
  const keys = _.keys(obj);
  const getIndents = '  '.repeat(indents);
  return keys.map((key) => {
    if (_.isObject(obj[key])) {
      return `\n${getIndents}${key}: {${render(obj[key], indents + 2)}\n  ${getIndents}}`;
    }
    return `\n${getIndents}${key}: ${obj[key]}`;
  });
};

const getData = (filePath) => {
  const getParse = parse(filePath);
  const readFile = fs.readFileSync(filePath, 'utf8');
  return getParse(readFile);
};

export default (pathOne, pathTwo) => {
  const obj1 = getData(pathOne);
  const obj2 = getData(pathTwo);
  const generatedDiff = compareData(obj1, obj2);
  return `{${render(generatedDiff, 1)}\n}\n`;
};
