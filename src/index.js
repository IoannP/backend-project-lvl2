import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import formatter from './formatters/index';

const getTree = (objOne, objTwo) => {
  const keys = _.uniq([..._.keys(objOne), ..._.keys(objTwo)]).sort();
  return keys.reduce((acc, value) => {
    if (_.has(objOne, value) && _.has(objTwo, value)) {
      if (_.isObject(objOne[value]) && _.isObject(objTwo[value])) {
        return [...acc, { name: value, children: getTree(objOne[value], objTwo[value]) }];
      }
      if (objOne[value] === objTwo[value]) return [...acc, { name: value, state: 'unchanged', value: objTwo[value] }];
      return [...acc, {
        name: value,
        state: 'changed',
        value: objOne[value],
        changedValue: objTwo[value],
      }];
    }
    if (_.has(objTwo, value)) {
      return [...acc, { name: value, state: 'added', value: objTwo[value] }];
    }
    return [...acc, { name: value, state: 'deleted', value: objOne[value] }];
  }, []);
};

export default (filePathOne, filePathTwo, format = 'tree') => {
  const fileData1 = fs.readFileSync(filePathOne, 'utf8');
  const fileData2 = fs.readFileSync(filePathTwo, 'utf8');

  const fileExtension1 = path.extname(filePathOne);
  const fileExtension2 = path.extname(filePathTwo);

  try {
    const parsedData1 = parse(fileExtension1, fileData1);
    const parsedData2 = parse(fileExtension2, fileData2);

    const tree = getTree(parsedData1, parsedData2);
    return formatter(tree, format);
  } catch (error) {
    return `${error.name}:\n${error.message}`;
  }
};
