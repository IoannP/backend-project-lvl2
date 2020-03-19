import genDiff from '../src/index';

const path = require('path');

const absolutePath1 = path.resolve(__dirname, '__fixtures__/before.json');
const absolutePath2 = path.resolve(__dirname, '__fixtures__/after.json');

test('paths', () => {
  expect(genDiff('__test__/__fixtures__/before.json', '__test__/__fixtures__/after.json')).toEqual(genDiff(absolutePath1, absolutePath2));
  expect(() => {
    genDiff('__test__/__fixture__/before.json', '../src/index.js');
  }).toThrow();
});

test('is contains', () => {
  const expected = genDiff(absolutePath1, absolutePath2);
  expect('+ died: 1963').toEqual(expect.not.stringContaining(expected));
});
