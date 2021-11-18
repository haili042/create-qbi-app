import * as fs from 'fs';
import * as path from 'path';
import { LEGACY_VERSION, Template, templateFilter } from './config';

const cwd = process.cwd();

type Validator = (value: string) => string | boolean;

// 校验多个规则
export function validate(validators: Validator[]) {
  return (value: string) => {
    let errorMsg;
    (validators || []).find(validator => {
      const msg = validator(value);
      if (typeof msg === 'string') {
        errorMsg = msg;
        return true;
      }
      if (msg === true) {
        errorMsg = `${value} is invalid`;
        return true;
      }
      return false;
    });

    if (errorMsg) {
      throw new Error(errorMsg);
    }
    return true;
  };
}

// 校验项目名
export const validateProjectName: Validator = projectName => {
  if (projectName === undefined || projectName === null) {
    return 'You must enter a project name';
  }
  if (!/^[a-z][a-z0-9_-]+$/.test(projectName)) {
    return `The project name must start with a letter and can only contain these symbols: a-z, 0-9, -, _`;
  }
};

// 校验项目名是否重名
export const validateUniqueProjectName: Validator = projectName => {
  const pathName = path.resolve(cwd, projectName);
  if (fs.existsSync(pathName)) {
    return `File or folder "${pathName}" already exists`;
  }
};

// 校验框架名
export const validateTemplate = (templates: Template) =>
  (templateName => {
    const templateList = templateFilter(templates);
    const tpl = templateList.find(each => each.name === templateName);

    if (tpl === undefined) {
      return `Expect the framework name to be within (${templateList
        .map(each => `"${each.name}""`)
        .join(' | ')}), but got "${templateName}"`;
    }
  }) as Validator;

export const validateLegacyVersion: Validator = version => {
  if (LEGACY_VERSION[version] === undefined) {
    return `Expect the legacy version to be within (${Object.keys(
      LEGACY_VERSION,
    )
      .map(e => `"${e}"`)
      .join(' | ')}), but got "${version}"`;
  }
};
