import _ from 'lodash';
import parse from './parsers';

const path = require('path');
const fs = require('fs');

const compareData = (objOne, objTwo) => {
  const keys = _.uniq([..._.keys(objOne), ..._.keys(objTwo)]);
  return keys.reduce((acc, value) => {
    if (_.has(objOne, value) && _.has(objTwo, value)) {
      if (objOne[value] === objTwo[value]) return [...acc, `  ${value}: ${objTwo[value]}`];
      return [...acc, `+ ${value}: ${objTwo[value]}`, `- ${value}: ${objOne[value]}`];
    }
    if (_.has(objTwo, value)) {
      return [...acc, `+ ${value}: ${objTwo[value]}`];
    }
    return [...acc, `- ${value}: ${objOne[value]}`];
  }, []);
};

const getData = (filePath) => {
  let absPath = filePath;
  if (!path.isAbsolute(filePath)) absPath = path.resolve(process.cwd(), filePath);
  const getParse = parse(absPath);
  const readFile = fs.readFileSync(absPath, 'utf8');
  return getParse(readFile);
};

export default (pathOne, pathTwo) => {
  const obj1 = getData(pathOne);
  const obj2 = getData(pathTwo);
  const generatedDiff = compareData(obj1, obj2);
  return `{\n${generatedDiff.join('\n')}\n}\n`;
};
