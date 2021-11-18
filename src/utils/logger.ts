function getLogText(args: any[]) {
  return Array.from(args).join(' ');
}

export default class Logger {
  /**
   * Outputs arguments with the "done" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.info
   */
  static done(...args: any[]) {
    console.info('\x1B[32m%s\x1B[0m', getLogText(args));
  }

  /**
   * Outputs arguments with the "info" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.info
   */
  static info(...args: any[]) {
    console.info('\x1B[34m%s\x1B[0m', getLogText(args));
  }

  /**
   * Outputs arguments with the "warn" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.warn
   */
  static warn(...args: any[]) {
    console.warn('\x1B[33m%s\x1B[0m', getLogText(args));
  }

  /**
   * Outputs arguments with the "error" tag / colors
   *
   * @param {...*} arguments - arguments passed through to console.error
   */
  static error(...args: any[]) {
    console.error('\x1B[31m%s\x1B[0m', getLogText(args));
  }
}
