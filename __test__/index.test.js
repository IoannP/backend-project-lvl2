import genDiff from '../src/index';

const path = require('path');
const fs = require('fs');

const getAbsPath = (fileName) => path.join(__dirname, '../__fixtures__', fileName);

const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');
const result = readFile('expected.txt');

test.each([['__fixtures__/before.json', '__fixtures__/after.json', result],
  [getAbsPath('before.json'), '__fixtures__/after.json', result],
  ['__fixtures__/before.yml', getAbsPath('after.yml'), result],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', result],
  ['__fixtures__/before.ini', '__fixtures__/after.ini', result],
  [getAbsPath('before.ini'), '__fixtures__/after.ini', result]])('defference expects to equal "expected"', (before, after, expected) => {
  expect(genDiff(before, after)).toBe(expected);
});

test('no such file or directory or error', () => {
  expect(() => {
    genDiff(getAbsPath('before.json'), getAbsPath('../after.json'));
    genDiff('src/index.js', 'package.json');
  }).toThrow('no such file or directory');

  expect(() => {
    genDiff(getAbsPath('before.json'));
  }).toThrowError();
});
