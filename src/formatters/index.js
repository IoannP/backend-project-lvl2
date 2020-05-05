import treeFormat from './tree';
import plainFormat from './plain';
import jsonFormat from './json';

export default (format, data) => {
  switch (format) {
    case 'plain':
      return plainFormat(data);
    case 'tree':
      return treeFormat(data);
    case 'json':
      return jsonFormat(data);
    default:
      throw new TypeError(`The format '${format}' is not correct! The correct formats are 'plain', 'json', 'tree'. The defaultformat is 'tree'.`);
  }
};
