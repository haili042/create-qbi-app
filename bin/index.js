#! /usr/bin/env node
const program = require('commander');
const { generateTemplate } = require('./create');
const packageJson = require('../package.json');

program.version(
  packageJson.version,
  '-v, --version',
  'output the current version',
);

program.parse(process.argv);

generateTemplate();

if (!program.args.length) {
  program.help();
}
