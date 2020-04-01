import genDiff from '../src/index';

const path = require('path');
const fs = require('fs');

const getAbsPath = (fileName) => path.join(__dirname, '../__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');

test.each([[getAbsPath('before.json'), '__fixtures__/after.json'],
  ['__fixtures__/before.yml', getAbsPath('after.yml')],
  [getAbsPath('before.ini'), '__fixtures__/after.ini']])('should equal', (before, after) => {
  expect(typeof genDiff(before, after, 'detailed')).toBe('string');
  expect(typeof genDiff(before, after, 'plain')).toBe('string');
  expect(genDiff(before, after, 'detailed')).toEqual(readFile('detailed.txt'));
  expect(genDiff(before, after, 'plain')).toEqual(readFile('plain.txt'));
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
