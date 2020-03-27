import genDiff from '../src/index';

const path = require('path');
const fs = require('fs');

const getAbsPath = (fileName) => path.join(__dirname, '../__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');

test.each([[getAbsPath('before.json'), '__fixtures__/after.json', readFile('expected.txt')],
  ['__fixtures__/before.yml', getAbsPath('after.yml'), readFile('expected.txt')],
  [getAbsPath('before.ini'), '__fixtures__/after.ini', readFile('expected.txt')]])('should equal "expected"', (before, after, expected) => {
  expect(typeof genDiff(before, after)).toBe('string');
  expect(genDiff(before, after)).toEqual(expected);
});

test('no such file or directory or error', () => {
  expect(() => {
    genDiff(getAbsPath('before.json'), getAbsPath('../after.json'));
    genDiff('src/index.js', 'package.json');
  }).toThrow('no such file or directory');

  expect(() => {
    genDiff(getAbsPath('before.json'));
    genDiff(getAbsPath('before.json'), 'Hello');
  }).toThrowError();
});
