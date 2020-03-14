import getDiff from '..';

const path = require('path');
const fs = require('fs');

const getPath = (file) => (path.isAbsolute(file)
  ? file
  : path.resolve(path.basename(file)));

export default (file1, file2) => {
  const firstPath = getPath(file1);
  const secondPath = getPath(file2);

  const readPathOne = fs.readFileSync(firstPath, 'utf8');
  const readPathTwo = fs.readFileSync(secondPath, 'utf8');

  return getDiff(readPathOne, readPathTwo);
};
