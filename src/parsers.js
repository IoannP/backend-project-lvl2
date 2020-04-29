import YAML from 'yaml';
import ini from 'ini';

export default (formatData, data) => {
  switch (formatData) {
    case 'ini':
      return ini.parse(data);
    case 'yml' || 'yaml':
      return YAML.parse(data);
    case 'json':
      return JSON.parse(data);
    default:
      throw new TypeError(`The data format '${formatData}' is not correct. Please compare following data formats 'JSON', 'YAML', 'INI'`);
  }
};
