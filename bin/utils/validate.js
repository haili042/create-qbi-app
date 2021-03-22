const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const logger = require('./logger');

function exitWhenInvalid(value, validators = []) {
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
    logger.error(errorMsg);
    process.exit(1);
  }
}

// 校验项目名
function validateProjectName(projectName) {
  if (projectName === undefined || projectName === null) {
    return 'You must enter a component name';
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

module.exports = {
  exitWhenInvalid,
  validateProjectName,
  validateUniqueProjectName,
};
