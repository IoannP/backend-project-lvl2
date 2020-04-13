import tree from './tree';
import plain from './plain';
import json from './json';

export default (data, format) => {
  const errorMassage = `Format '${format}' is not correct! Please type a correct format!`;
  if (format === 'plain') return plain(data);
  if (format === 'json') return json(data);
  if (format === 'tree') return tree(data);
  throw new RangeError(errorMassage);
};
