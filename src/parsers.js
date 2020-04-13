import YAML from 'yaml';
import ini from 'ini';

export default (fileExtension, data) => {
  const error = `The filename extension '${fileExtension}' is not correct. Please compare two files with following extensions '.json', '.yml', '.ini'`;
  if (fileExtension === '.json') return JSON.parse(data);
  if (fileExtension === '.ini') return ini.parse(data);
  if (fileExtension === '.yml' || fileExtension === '.yaml') return YAML.parse(data);
  throw new RangeError(error);
};
