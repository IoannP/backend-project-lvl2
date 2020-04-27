import tree from './tree';
import plain from './plain';
import json from './json';

export default (format, data) => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'tree':
      return tree(data);
    case 'json':
      return json(data);
    default:
      throw new TypeError(`The format '${format}' is not correct! The correct formats are 'plain', 'json', 'tree'. The defaultformat is 'tree'.`);
  }
};
