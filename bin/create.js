const fs = require('fs');
const rimraf = require('rimraf');
const child_process = require('child_process');
const chalk = require('chalk');
const inquirer = require('inquirer');
const program = require('commander');
const {
  exitWhenInvalid,
  validateProjectName,
  validateUniqueProjectName,
} = require('./utils/validate.js');
const logger = require('./utils/logger');
const get = require('lodash.get');

function generateTemplate() {
  const options = process.argv;
  program.parse(options);
  const args = program.args;

  const projectName = get(args, '[0]');
  exitWhenInvalid(projectName, [
    validateProjectName,
    validateUniqueProjectName,
  ]);

  inquirer
    .prompt([
      {
        message: 'Select a framework you want to work in!',
        type: 'list',
        name: 'Framework',
        default: 'origin',
        choices: ['origin', 'React'],
      },
    ])
    .then(answers => {
      const Framework = answers.Framework;
      const branchMap = {
        origin: 'demo',
        React: 'react-demo',
      };

      const repo = `https://github.com/wloscar/demo-project.git`;

      logger.info(`Creating new ${Framework} project "${projectName}" now!`);

      const execSync = child_process.execSync;
      const cmd = `git clone --quiet --depth=1 --branch=${branchMap[Framework]} ${repo} ./${projectName}`;

      execSync(cmd);

      const projectPackage = `./${projectName}/package.json`;

      fs.readFile(projectPackage, 'utf8', function (err, data) {
        if (err) {
          rimraf.sync(`./${projectName}`);
          logger.error(`create failed`);
          return logger.error(err);
        }
        logger.done(`create succeeded`);

        rimraf.sync(`./${projectName}/.git`);

        const json = JSON.parse(data);
        json.name = projectName;
        json.author = 'Write your name here';
        json.version = '0.1.0';

        fs.writeFile(
          projectPackage,
          JSON.stringify(json, null, 2),
          function () {
            logger.done(`Project initialized successfully! Next step:`);
            logger.info(chalk.blue(`cd ${projectName}`));
            logger.info(chalk.blue(`npm i`));
            logger.info(chalk.blue(`npm start`));
          },
        );
      });
    });
}

module.exports = {
  generateTemplate,
};
