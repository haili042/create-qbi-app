const path = require('path');

const certDir = path.resolve(__dirname, '.temp');
const keyFile = path.resolve(certDir, 'dev.key');
const certFile = path.resolve(certDir, 'dev.pem');

/* 为了保证打包产物的稳定性，目前仅仅开放devServer相关配置项 */
module.exports = {
  entry: {
    BIComponentMeta: './src/meta.ts',
    BIComponent: './src/index.tsx',
  },
  devServer: {
    port: 8001,
    https: {
      key: keyFile,
      cert: certFile,
    },
    host: '127.0.0.1',
  },
  externals: {
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
  },
};
