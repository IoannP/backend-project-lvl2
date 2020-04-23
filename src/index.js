import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import formatter from './formatters/index';

const getTree = (object1, object2) => {
  const keys = _.union([..._.keys(object1), ..._.keys(object2)]).sort();
  return keys.map((key) => {
    if (_.has(object1, key) && _.has(object2, key)) {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        return { name: key, children: getTree(object1[key], object2[key]) };
      }
      if (object1[key] === object2[key]) return { name: key, state: 'unchanged', value: object2[key] };
      return {
        name: key,
        state: 'changed',
        value: object1[key],
        changedValue: object2[key],
      };
    }
    if (_.has(object2, key)) {
      return { name: key, state: 'added', value: object2[key] };
    }
    return { name: key, state: 'deleted', value: object1[key] };
  });
};

export default (filePath1, filePath2, format = 'tree') => {
  const data1 = fs.readFileSync(filePath1, 'utf8');
  const data2 = fs.readFileSync(filePath2, 'utf8');

  const formatData1 = path.extname(filePath1);
  const formatData2 = path.extname(filePath2);

  const parsedData1 = parse(formatData1, data1);
  const parsedData2 = parse(formatData2, data2);

  if (parsedData1 === formatData1) {
    throw new TypeError(`The data format '${formatData1}' in location '${filePath1}' is not correct. Please compare followingdata formats 'JSON', 'YAML', 'INI'`);
  }
  if (parsedData2 === formatData2) {
    throw new TypeError(`The data format '${formatData2}' in location '${filePath2}' is not correct. Please compare followingdata formats 'JSON', 'YAML', 'INI'`);
  }

  const tree = getTree(parsedData1, parsedData2);
  const result = formatter(format, tree);
  if (result === format) {
    throw new TypeError(`The format '${format}' is not correct! The correct formats are 'plain', 'json', 'tree'. The defaultformat is 'tree'.`);
  }
  return result;
};
