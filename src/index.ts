#! /usr/bin/env node
import { Command } from 'commander';
import * as inquirer from 'inquirer';
import { createApp } from './create';
import * as packageJson from '../package.json';
import {
  validate,
  validateProjectName,
  validateUniqueProjectName,
  validateLegacyVersion,
  validateTemplate,
} from './utils/validate';
import logger from './utils/logger';
import { LEGACY_VERSION, TEMPLATES, templateFilter } from './utils/config';
import { DescList } from './utils/inquirer';

const program = new Command();

inquirer.registerPrompt('list-desc', DescList);

const pureTemplate = templateFilter(TEMPLATES);

const projectNameValidator = validate([
  validateProjectName,
  validateUniqueProjectName,
]);
const legacyVersionValidator = validate([validateLegacyVersion]);

program
  .version(packageJson.version, '-v, --version', 'Output the current version.')
  .option(
    '-t, --template [template]',
    `Choose a template you want to work in. the value must be within (${pureTemplate
      .map(each => `"${each.name}"`)
      .join(' | ')}).`,
  )
  .option(
    '-l, --legacy [legacy]',
    `Use template of legacy version. the value must be within (${Object.keys(
      LEGACY_VERSION,
    )
      .map(each => `"${each}"`)
      .join(' | ')}).`,
  );

program.parse(process.argv);

async function run() {
  try {
    let projectName = program.args[0];

    if (!projectName) {
      const answer = await inquirer.prompt({
        message: 'Please input project name.',
        type: 'input' as any,
        name: 'projectName',
      });
      projectName = answer.projectName;
    }

    // must enter a project name
    if (projectNameValidator(projectName)) {
      let templateBranch;
      let templateChoices = TEMPLATES;

      // use legacy version template
      if (program.legacy === true) {
        const answer = await inquirer.prompt({
          message: 'Please choose a legacy version.',
          type: 'list' as any,
          name: 'legacyVersion',
          choices: Object.keys(LEGACY_VERSION),
        });
        templateChoices = LEGACY_VERSION[answer.legacyVersion];
      } else if (program.legacy && legacyVersionValidator(program.legacy)) {
        templateChoices = LEGACY_VERSION[program.legacy];
      }

      const templateNameValidator = validate([
        validateTemplate(templateChoices),
      ]);
      if (!program.template) {
        const answer = await inquirer.prompt({
          message: 'Please choose a template.',
          type: 'list-desc' as any,
          name: 'template',
          choices: templateChoices,
        });
        templateBranch = answer.template;
      } else if (program.template && templateNameValidator(program.template)) {
        templateBranch = templateFilter(templateChoices).find(
          each => each.name === program.template,
        )?.value;
      }

      await createApp(projectName, templateBranch);
    }
  } catch (err) {
    logger.error(err);

    console.log(
      `\nExample: yarn create qbi-app myChart\n\n${program.helpInformation()}`,
    );
    process.exit(1);
  }
}

run();
