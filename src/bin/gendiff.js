#!/usr/bin/env node
import program from 'commander';
import gendiff from '../difference';
import { version, description } from '../../package.json';

program
  .version(version, '-V, --vers', 'output the version number')
  .description(description)
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
