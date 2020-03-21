#!/usr/bin/env node
import program from 'commander';
import genDiff from '../index';
import { version, description } from '../../package.json';

program
  .version(version, '-V, --vers', 'output the version number')
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const diff = genDiff(firstConfig, secondConfig);
    console.log(diff);
  })
  .parse(process.argv);
