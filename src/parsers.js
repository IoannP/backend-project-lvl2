const YAML = require('yaml');
const path = require('path');

export default (filename) => {
  const format = path.extname(filename);
  return format === '.json' ? JSON.parse : YAML.parse;
};
