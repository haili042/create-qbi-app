const fs = require('fs');
const rimraf = require('rimraf');
const child_process = require('child_process');
const logger = require('./utils/logger');
const { FRAMEWORK_BRANCH, GIT } = require('./utils/config');
const path = require('path');

const cwd = process.cwd();
const execSync = child_process.execSync;

/**
 * 从 git 仓库拉取模板代码并写入目标目录
 */
function createApp(projectName, framework) {
  const branch = FRAMEWORK_BRANCH[framework];
  const cmd = `git clone --quiet --depth=1 --branch=${branch} ${GIT} ./${projectName}`;

  execSync(cmd);

  logger.info(`Creating new ${framework} project "${projectName}" ...`);
  logger.info(cmd);

  const projectPackage = path.resolve(cwd, `./${projectName}/package.json`);

  fs.readFile(projectPackage, 'utf8', function (err, data) {
    if (err) {
      rimraf.sync(path.resolve(cwd, `./${projectName}`));
      throw new Error(err);
    }

    rimraf.sync(path.resolve(cwd, `./${projectName}/.git`));

    const json = JSON.parse(data);
    json.name = projectName;
    json.version = '0.1.0';

    fs.writeFile(projectPackage, JSON.stringify(json, null, 2), function () {
      logger.done(
        `Create success! Learn more: https://www.yuque.com/u2227425/ia1pn8/xaia8g#XmLfe`,
      );
    });
  });
}

module.exports = {
  createApp,
};
