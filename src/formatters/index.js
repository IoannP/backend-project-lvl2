import treeFormatter from './tree';
import plainFormatter from './plain';
import jsonFormatter from './json';

export default (format, data) => {
  switch (format) {
    case 'plain':
      return plainFormatter(data);
    case 'tree':
      return treeFormatter(data);
    case 'json':
      return jsonFormatter(data);
    default:
      throw new TypeError(`The format '${format}' is not correct! The correct formats are 'plain', 'json', 'tree'. The defaultformat is 'tree'.`);
  }
};
