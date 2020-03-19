const path = require('path');
const fs = require('fs');

export default (currentDir, filePath) => {
  let isAbsolute = filePath;
  if (!path.isAbsolute(filePath)) isAbsolute = path.resolve(currentDir, filePath);

  const readFile = fs.readFileSync(isAbsolute, 'utf8');
  return JSON.parse(readFile);
};
