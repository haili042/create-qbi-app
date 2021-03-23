function getLogText(args) {
  return Array.from(args).join(' ');
}

class Logger {
  /**
   * Outputs arguments with the "done" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.info
   */
  static done(/* arguments */) {
    console.info('\x1B[32m%s\x1B[0m', getLogText(arguments));
  }

  /**
   * Outputs arguments with the "info" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.info
   */
  static info(/* arguments */) {
    console.info('\x1B[34m%s\x1B[0m', getLogText(arguments));
  }

  /**
   * Outputs arguments with the "warn" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.warn
   */
  static warn(/* arguments */) {
    console.warn('\x1B[33m%s\x1B[0m', getLogText(arguments));
  }

  /**
   * Outputs arguments with the "error" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.error
   */
  static error(/* arguments */) {
    console.error('\x1B[31m%s\x1B[0m', getLogText(arguments));
  }
}

module.exports = Logger;
