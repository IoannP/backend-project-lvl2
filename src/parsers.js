import YAML from 'yaml';
import ini from 'ini';

export default (formatData, data) => {
  switch (formatData) {
    case 'INI':
      return ini.parse(data);
    case 'YML' || 'YAML':
      return YAML.parse(data);
    case 'JSON':
      return JSON.parse(data);
    default:
      throw new TypeError(`The data format '${formatData}' is not correct. Please compare following data formats 'JSON', 'YAML', 'INI'`);
  }
};
