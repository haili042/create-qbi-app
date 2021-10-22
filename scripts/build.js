/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const os = require('os');
const { getWebpackConfig } = require('./webpack.config');

function run() {
  const webpackConfig = getWebpackConfig({
    mode: 'production',
  });
  
  let compiler = webpack(webpackConfig);
  compiler.run(function (err, stats) {
    if (err) {
      throw err
    }
    if (stats && stats.hasErrors()) {
      const info = stats.toJson();
      throw Error(info.errors.join(os.EOL + os.EOL));
    }

    process.exit(0);
  });
}

run()