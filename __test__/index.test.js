import genDiff from '../src/index';

const path = require('path');
const fs = require('fs');

const getAbsPath = (fileName) => path.join(__dirname, '../__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');
const result = readFile('expected.txt');

test.each([['__fixtures__/before.json', '__fixtures__/after.json', result],
  [getAbsPath('before.json'), '__fixtures__/after.json', result],
  ['__fixtures__/before.yml', getAbsPath('after.yml'), result],
  ['__fixtures__/before.yml', '__fixtures__/after.yml', result]])('generate difference between two files', (before, after, expected) => {
  expect(genDiff(before, after)).toEqual(expected);
});

test('comparison must to throw', () => {
  expect(() => {
    genDiff(getAbsPath('before.json'), getAbsPath('index.json'));
    genDiff('src/index.js', 'package.json');
  }).toThrow();
});
