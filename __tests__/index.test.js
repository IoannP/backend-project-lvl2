import path from 'path';
import fs from 'fs';
import genDiff from '../src/index';

const getAbsPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getAbsPath(fileName), 'utf8');

describe.each([['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
  ['before.json', 'after.yml'],
  ['before.yml', 'after.ini'],
  ['before.ini', 'after.json']])('generate difference between %s and %s files', (before, after) => {
  const pathBefore = getAbsPath(before);
  const pathAfter = getAbsPath(after);

  test('generate difference', () => {
    expect(genDiff(pathBefore, pathAfter, 'json')).toEqual(readFile('expected.json'));
    expect(genDiff(pathBefore, pathAfter, 'tree')).toEqual(readFile('tree.txt'));
    expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(readFile('plain.txt'));
    expect(genDiff(pathBefore, pathAfter)).toEqual(readFile('tree.txt'));
  });
});

test('to throw error', () => {
  expect(() => {
    genDiff(getAbsPath('before.json'), getAbsPath('somefile.json'));
    genDiff(getAbsPath('before.yml'));
    genDiff(getAbsPath('before.ini'), getAbsPath('tree.txt'));
    genDiff(getAbsPath('before.ini'), getAbsPath('after.ini'), 'some string');
  }).toThrow();
});
