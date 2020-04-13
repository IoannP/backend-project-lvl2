import path from 'path';
import fs from 'fs';
import genDiff from '../src/index';

const getAbsPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');

test.each([[getAbsPath('before.json'), getAbsPath('after.json')],
  [getAbsPath('before.yml'), getAbsPath('after.yml')],
  [getAbsPath('before.ini'), getAbsPath('after.ini')],
  [getAbsPath('before.json'), getAbsPath('after.yml')],
  [getAbsPath('before.yml'), getAbsPath('after.ini')],
  [getAbsPath('before.ini'), getAbsPath('after.json')]])('generate difference', (before, after) => {
  expect(genDiff(before, after, 'json')).toEqual(readFile('expected.json'));
  expect(genDiff(before, after, 'tree')).toEqual(readFile('detailed.txt'));
  expect(genDiff(before, after, 'plain')).toEqual(readFile('plain.txt'));
});

test('to throw error', () => {
  expect(() => {
    genDiff(getAbsPath('before.json'), getAbsPath('somefile.json'));
    genDiff(getAbsPath('before.json'));
    genDiff(getAbsPath('before.json'), getAbsPath('error.js'));
    genDiff(getAbsPath('before.json'), getAbsPath('after.json'), 'some string');
  }).toThrowError();
});
