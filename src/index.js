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
        changedValue: object1[key],
        currentValue: object2[key],
      };
    }
    if (_.has(object2, key)) {
      return { name: key, state: 'added', value: object2[key] };
    }
    return { name: key, state: 'deleted', value: object1[key] };
  });
};

const getFormatData = (filePath) => path.extname(filePath)
  .slice(1)
  .toUpperCase();

const getData = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(absolutePath, 'utf8');
  return data;
};

export default (filePath1, filePath2, format = 'tree') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const formatData1 = getFormatData(filePath1);
  const formatData2 = getFormatData(filePath2);

  const parsedData1 = parse(formatData1, data1);
  const parsedData2 = parse(formatData2, data2);

  const tree = getTree(parsedData1, parsedData2);
  return formatter(format, tree);
};
