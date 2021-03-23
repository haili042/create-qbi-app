const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const { FRAMEWORK_BRANCH } = require('./config');

// 校验多个规则
function validate(validators = []) {
  return function (value) {
    let errorMsg;
    validators.find(validator => {
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
function validateProjectName(projectName) {
  if (projectName === undefined || projectName === null) {
    return 'You must enter a project name';
  }
  if (!/^[a-z][a-z0-9_-]+$/.test(projectName)) {
    return `The project must start with a letter and can only contain these symbols: a-z, 0-9, -, _`;
  }
}

// 校验项目名是否重名
function validateUniqueProjectName(projectName) {
  const pathName = path.resolve(cwd, projectName);
  if (fs.existsSync(pathName)) {
    return `File or folder "${pathName}" already exists`;
  }
}

// 校验框架名
function validateFrameworkName(framework) {
  if (FRAMEWORK_BRANCH[framework] === undefined) {
    return `Expect the framework name to be within (${Object.keys(FRAMEWORK_BRANCH).join(' | ')}), but got "${framework}"`;
  }
}

module.exports = {
  validate,
  validateProjectName,
  validateUniqueProjectName,
  validateFrameworkName,
};
