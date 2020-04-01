const YAML = require('yaml');
const path = require('path');
const ini = require('ini');

const fs = require('fs');

const getData = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath) => {
  const format = path.extname(filePath);
  const data = getData(filePath);
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.ini') {
    return ini.parse(data);
  }
  return YAML.parse(data);
};
