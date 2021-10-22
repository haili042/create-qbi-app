/* eslint-disable @typescript-eslint/no-var-requires */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { getWebpackConfig } = require('./webpack.config');

function run() {
  const webpackConfig = getWebpackConfig({
    mode: 'development',
  });
  
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, webpackConfig.devServer);
  server.listen(
    webpackConfig.devServer.port,
    webpackConfig.devServer.host,
    () => {
      console.info(
        `DevServer listening on port ${webpackConfig.devServer.port}`,
      );
    },
  );
}

run()