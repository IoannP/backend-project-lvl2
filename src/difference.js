import program from 'commander';
import { version } from '../package.json';


program
  .version(version, '-v, --vers', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
