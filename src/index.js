import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import formatter from './formatters/index';

const makeTree = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2)).sort();
  return keys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    if (!value1) return { name: key, type: 'added', value: value2 };
    if (!value2) return { name: key, type: 'deleted', value: value1 };
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, children: makeTree(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        name: key,
        type: 'changed',
        changedValue: value1,
        currentValue: value2,
      };
    }
    return { name: key, type: 'unchanged', value: value2 };
  });
};

const getFormatData = (filePath) => path.extname(filePath).slice(1);

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

  const tree = makeTree(parsedData1, parsedData2);
  return formatter(format, tree);
};
