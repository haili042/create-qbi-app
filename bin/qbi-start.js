const program = require('commander');
const WebpackDevServer = require('webpack-dev-server');
const logger = require('./utils/logger');
const { getWebpackConfig } = require('./utils/webpack-config');
const webpack = require('webpack');

const options = process.argv;
program.option('-a, --analyze [analyze]', 'Analyze the bundle', false);

program.parse(options);

let server;
try {
  logger.blank();
  logger.info('Starting server...');
  const webpackConfig = getWebpackConfig({
    mode: 'development',
    analyze: program.analyze,
  });
  let compiler = webpack(webpackConfig);

  server = new WebpackDevServer(compiler, webpackConfig.devServer);
  server.listen(
    webpackConfig.devServer.port,
    webpackConfig.devServer.host,
    () => {
      logger.info(
        `DevServer listening on port ${webpackConfig.devServer.port}`,
      );
    },
  );
} catch (err) {
  logger.error('LOAD ERROR', err);
  process.exit(1);
}

//clean up
function stopServer() {
  logger.blank();
  logger.info('Stopping server...');
  if (server) {
    server.close();
    server = null;
    process.exit(1);
  }
}

process.on('SIGINT', stopServer);
process.on('SIGTERM', stopServer);
