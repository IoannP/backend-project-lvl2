import tree from './tree';
import plain from './plain';
import json from './json';

export default (data, format) => {
  if (format === 'plain') return plain(data);
  if (format === 'json') return json(data);
  if (format === 'tree') return tree(data);
  return `Format '${format}' is not correct!\nPlease type a correct format!`;
};
