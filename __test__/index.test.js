import genDiff from '../src/index';

const path = require('path');
const fs = require('fs');

const getAbsPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');

test.each([[getAbsPath('before.json'), '__test__/__fixtures__/after.json'],
  ['__test__/__fixtures__/before.yml', getAbsPath('after.yml')],
  [getAbsPath('before.ini'), '__test__/__fixtures__/after.ini']])('generate difference', (before, after) => {
  expect(genDiff(before, after, 'json')).toEqual(readFile('expected.json'));
  expect(genDiff(before, after, 'tree')).toEqual(readFile('detailed.txt'));
  expect(genDiff(before, after, 'plain')).toEqual(readFile('plain.txt'));
  expect(genDiff(before, after, 'some string')).toEqual(expect.stringContaining('Please type a correct format!'));
});

test('uncorrect file format', () => {
  expect(genDiff(getAbsPath('before.json'), getAbsPath('error.js')))
    .toEqual(expect.stringContaining('Please compare two files with following formats \'.json\', \'.yml\', \'.ini\''));
});

test('toThrow', () => {
  expect(() => {
    genDiff(getAbsPath('before.json'), getAbsPath('somefile.json'));
  }).toThrow('no such file or directory');
  expect(() => {
    genDiff(getAbsPath('before.json'));
  }).toThrowError();
});
