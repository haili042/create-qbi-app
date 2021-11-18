import * as fs from 'fs';
import { execSync } from 'child_process';
import logger from './utils/logger';
import { GIT } from './utils/config';
import * as path from 'path';

const cwd = process.cwd();

/**
 * 从 git 仓库拉取模板代码并写入目标目录
 */
export async function createApp(projectName: string, branch: string) {
  const cmd = `git clone --quiet --depth=1 --branch=${branch} ${GIT} ./${projectName}`;

  execSync(cmd);

  logger.info(`Creating new project "${projectName}" ...`);
  logger.info(cmd);

  const projectPackage = path.resolve(cwd, `./${projectName}/package.json`);

  fs.readFile(projectPackage, 'utf8', function (err, data) {
    if (err) {
      fs.rmSync(path.resolve(cwd, `./${projectName}`), {
        recursive: true,
        force: true,
      });
      throw err;
    }

    fs.rmSync(path.resolve(cwd, `./${projectName}/.git`), {
      recursive: true,
      force: true,
    });

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
