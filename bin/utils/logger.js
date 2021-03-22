let chalk = require('chalk');
let os = require('os');

if (os.platform() === 'darwin') {
  chalk = chalk.bold;
}

function prependLogTag(tag, args) {
  return [tag].concat(Array.from(args));
}

class Logger {
  /** Causes the terminal to beep */
  static beep() {
    process.stdout.write('\x07');
  }

  /** Outputs a blank line */
  static blank() {
    console.info(chalk.reset(' '));
  }

  /**
   * Outputs arguments with the "done" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.info
   */
  static done(/* arguments */) {
    let tag = chalk.bgGreen(' done  ');
    console.info.apply(this, prependLogTag(tag, arguments));
  }

  /**
   * Outputs arguments with the "info" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.info
   */
  static info(/* arguments */) {
    let tag = chalk.bgCyan(' info  ');
    console.info.apply(this, prependLogTag(tag, arguments));
  }

  /**
   * Outputs arguments with the "warn" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.warn
   */
  static warn(/* arguments */) {
    let tag = chalk.bgYellow.black(' warn  ');
    console.warn.apply(this, prependLogTag(tag, arguments));
  }

  /**
   * Outputs arguments with the "error" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.error
   */
  static error(/* arguments */) {
    let tag = chalk.bgRed(' error ');
    console.error.apply(this, prependLogTag(tag, arguments));
  }

  /**
   * Outputs an object as a table
   *
   * @param {string} data - object to output
   * @param {number} [depthLimit=Infinity] - limit the number of levels to recurse
   * @param {string} [keyPrefix=''] - text to prepend to each key
   */
  static infoTable(data, depthLimit, keyPrefix) {
    if (!data) {
      return;
    }
    let limit = typeof depthLimit === 'undefined' ? Infinity : depthLimit;
    for (let key in data) {
      let item = data[key];
      let itemKey = (keyPrefix || '') + key;
      if (limit > 1 && typeof item === 'object' && !Array.isArray(item)) {
        Logger.infoTable(item, limit - 1, itemKey + '.');
      } else {
        Logger.infoTableRow(itemKey, item);
      }
    }
  }

  /**
   * Outputs a table row with even spaced keys
   *
   * @param {string} key - title of this row
   * @param {string} value - value for this row
   * @param {number} [keyWidth=30] - width used for padding of the key column
   */
  static infoTableRow(key, value, keyWidth) {
    let width = keyWidth || 30;
    let padding = Math.max(0, width - key.length);
    let paddedKey = chalk.bold(key) + new Array(padding).join('.');
    Logger.info(paddedKey, value);
  }

  /**
   * Outputs formatted errors
   *
   * @param {Array<Error>} errors
   */
  static formattedErrors(errors) {
    if (errors && Array.isArray(errors)) {
      errors.forEach(error => {
        if (!error) {
          return;
        }
        let tag = error.type ? chalk.bold(error.type.toUpperCase()) : 'UNKNOWN';
        let file = error.filename
          ? chalk.bgWhite.black(` ${error.filename} `) + ':'
          : '';
        let position =
          error.line && error.column
            ? chalk.cyan(`(${error.line},${error.column})`)
            : '';
        let message = error.message || '';
        Logger.error(tag, `${file} ${position} ${message}`);
      });
    } else {
      Logger.error('UNKNOWN', errors);
    }
  }
}

module.exports = Logger;
