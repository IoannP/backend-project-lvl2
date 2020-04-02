const YAML = require('yaml');
const ini = require('ini');
const fs = require('fs');
const path = require('path');

const getData = (filePath) => fs.readFileSync(filePath, 'utf8');

export default (filePath) => {
  const format = path.extname(filePath);
  const data = getData(filePath);
  if (format === '.json') return JSON.parse(data);
  if (format === '.ini') return ini.parse(data);
  if (format === '.yml' || format === '.yaml') return YAML.parse(data);
  return `The file format '${format}' is not correct.\nPlease compare two files with following formats '.json', '.yml', '.ini'`;
};
