#! /usr/bin/env node
const program = require('commander');
const { createApp } = require('./create');
const packageJson = require('../package.json');
const {
  validate,
  validateProjectName,
  validateUniqueProjectName,
  validateFrameworkName,
} = require('./utils/validate.js');
const logger = require('./utils/logger');
const { FRAMEWORK_ORIGIN, FRAMEWORK_BRANCH } = require('./utils/config');

const framework = Object.keys(FRAMEWORK_BRANCH);

const projectNameValidator = validate([
  validateProjectName,
  validateUniqueProjectName,
]);
const frameworkValidator = validate([validateFrameworkName]);

program
  .version(packageJson.version, '-v, --version', 'output the current version')
  .option(
    '-f, --framework [framework]',
    `choose a framework you want to work in! the value must be within (${framework.join(
      ' | ',
    )})`,
    FRAMEWORK_ORIGIN,
  );

program.parse(process.argv);

try {
  const projectName = program.args[0];
  if (
    projectNameValidator(projectName) &&
    frameworkValidator(program.framework)
  ) {
    createApp(projectName, program.framework);
  }
} catch (err) {
  logger.error(err);
  process.exit(1);
}

if (!program.args.length) {
  program.help();
}
