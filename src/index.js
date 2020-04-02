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

export default (pathOne, pathTwo, format = 'tree') => {
  const fileData1 = parse(pathOne);
  const fileData2 = parse(pathTwo);
  if (!_.isObject(fileData1)) return fileData1;
  if (!_.isObject(fileData2)) return fileData2;
  const tree = getTree(fileData1, fileData2);
  return formatter(tree, format);
};
