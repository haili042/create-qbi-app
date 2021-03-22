let program = require('commander');
let logger = require('./utils/logger');
const webpack = require('webpack');
const { getWebpackConfig } = require('./utils/webpack-config');
let options = process.argv;

program.option('-a, --analyze [analyze]', 'Analyze the bundle', false);

program.parse(options);

try {
  logger.info('Building...');
  const webpackConfig = getWebpackConfig({
    mode: 'production',
    analyze: program.analyze,
  });

  let compiler = webpack(webpackConfig);
  compiler.run(function (err, stats) {
    if (err) {
      logger.error(`Package wasn't created. ${JSON.stringify(err)}`);
    }
    if (stats.compilation.errors.length) {
      logger.error(
        `Package wasn't created. ${stats.compilation.errors.length} errors found`,
      );
    }
    process.exit(0);
  });
} catch (err) {
  logger.error('LOAD ERROR', err);
  process.exit(1);
}
