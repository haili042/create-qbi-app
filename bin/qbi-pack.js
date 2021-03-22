const fs = require('fs');
const logger = require('./utils/logger');
const archiver = require('archiver');
const path = require('path');

const cwd = process.cwd();
const options = process.argv;
const { getWebpackConfig } = require('./utils/webpack-config');
const packageJsonOutputFileName = path.resolve(cwd, './build/package.json');

// 打包文件
const files = [
  path.resolve(cwd, './build/main.js'),
  path.resolve(cwd, './build/meta.js'),
  path.resolve(cwd, './build/main.css'),
  packageJsonOutputFileName,
];

logger.info('packing...');

let packageJson;

try {
  packageJson = JSON.parse(
    fs.readFileSync(path.resolve(cwd, './package.json'), 'utf8'),
  );

  const webpackConfig = getWebpackConfig({
    mode: 'production',
  });

  // 为 package.json 写入额外信息
  if (
    webpackConfig.externals &&
    typeof webpackConfig.externals === 'object' &&
    Object.keys(webpackConfig.externals).length > 0
  ) {
    packageJson.webpack = {};
    packageJson.webpack.externals = webpackConfig.externals;
  }

  // 写入 package.json
  fs.writeFileSync(packageJsonOutputFileName, JSON.stringify(packageJson), {
    encoding: 'utf8',
  });
} catch (err) {
  logger.error(err);
}

// 获取 package.json 的 name 作为打包名称
const outputFileName = packageJson
  ? `${packageJson.name || ''}-${packageJson.version || ''}.zip`
  : './component.zip';

const output = fs.createWriteStream(path.resolve(cwd, 'build', outputFileName));
const archive = archiver('zip');

output.on('close', function () {
  logger.info(archive.pointer() + ' total bytes');
  logger.info('pack finish.');
});

archive.on('error', function (err) {
  logger.error(err);
  throw err;
});

archive.pipe(output);

files
  .reduce(
    (prev, file) =>
      prev.append(fs.createReadStream(file), { name: path.basename(file) }),
    archive,
  )
  .finalize();
