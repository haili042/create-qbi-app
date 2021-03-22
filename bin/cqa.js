#! /usr/bin/env node
const program = require('commander');

const packageJson = require('../package.json');

program.version(
  packageJson.version,
  '-v, --version',
  'output the current version',
);

program
  .command('create <project_name>', 'create a qbi component project')
  .command('start', 'start the demo project')
  .command('build', 'build the demo project')
  .command('pack', 'pack the demo project');
program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
