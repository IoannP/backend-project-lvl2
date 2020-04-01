import detailed from './detailed';
import plain from './plain';

export default (format) => (format === 'plain' ? plain : detailed);
