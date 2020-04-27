import path from 'path';
import fs from 'fs';
import genDiff from '../src/index';

const makeAbsolutePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(makeAbsolutePath(fileName), 'utf8');

test.each([['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
  ['before.json', 'after.yml'],
  ['before.yml', 'after.ini'],
  ['before.ini', 'after.json']])('generate difference between %s and %s files', (before, after) => {
  const pathBefore = makeAbsolutePath(before);
  const pathAfter = makeAbsolutePath(after);

  expect(genDiff(pathBefore, pathAfter, 'json')).toEqual(readFile('expected.json'));
  expect(genDiff(pathBefore, pathAfter, 'plain')).toEqual(readFile('plain.txt'));
  expect(genDiff(pathBefore, pathAfter)).toEqual(readFile('tree.txt'));
});

test.each([['before.json', 'somefile.json'],
  ['before.ini', 'tree.txt'],
  ['before.yml', 'after.yml', 'some string']])('to throw error', (before, after, format = 'tree') => {
  const pathBefore = makeAbsolutePath(before);
  const pathAfter = makeAbsolutePath(after);

  expect(() => {
    genDiff(pathBefore, pathAfter, format);
  }).toThrow();
});

test('without an argument', () => {
  expect(() => {
    genDiff(makeAbsolutePath('before.yml'));
  }).toThrow();
});
