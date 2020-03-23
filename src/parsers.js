const YAML = require('yaml');
const path = require('path');
const ini = require('ini');

export default (filename) => {
  const format = path.extname(filename);
  if (format === '.json') {
    return JSON.parse;
  }
  if (format === '.ini') {
    return ini.parse;
  }
  return YAML.parse;
};
