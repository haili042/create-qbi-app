/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const cwd = process.cwd();

const cssExtractLoader = () => ({
  loader: MiniCssExtractPlugin.loader,
});

const cssLoader = (options = {}) => ({
  loader: require.resolve('css-loader'),
  options: { sourceMap: false, ...options },
});

const cssModuleLoader = (options = {}) => ({
  loader: require.resolve('@teamsupercell/typings-for-css-modules-loader'),
  options: { formatter: 'prettier', ...options },
});

const lessLoader = (options = {}) => ({
  loader: require.resolve('less-loader'),
  options: {
    sourceMap: false,
    lessOptions: {
      paths: [path.resolve(__dirname, '..', 'node_modules')],
    },
    ...options,
  },
});

const sassLoader = (options = {}) => ({
  loader: require.resolve('sass-loader'),
  options: { sourceMap: false, ...options },
});

const babelLoader = (opt) => {
  return {
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: {
              ie: '11',
            },
            useBuiltIns: 'entry',
            corejs: 3,
            modules: false,
          },
        ],
        require.resolve('@babel/preset-react'),
        opt.ts && [
          require.resolve('@babel/preset-typescript'),
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ].filter(each => each),
      cacheDirectory: true,
      cacheCompression: false,
      plugins: [
        require.resolve(
          '@babel/plugin-proposal-class-properties',
        ),
      ],
    },
  }
}

function getWebpackConfig({ mode = 'development' }) {
  const webpackConfig = {
    mode,
    bail: mode === 'production',
    devtool: mode === 'development' ? 'eval-source-map' : false,
    // devtool: false,
    entry: {
      QbiDemoPage: path.resolve(cwd, './src/index.tsx'),
    },
    output: {
      path: path.resolve(cwd, 'dist'),
      pathinfo: mode === 'development',
      filename: pathData => {
        const outputMapping = {
          QbiDemoPage: 'index.js',
        };

        return outputMapping[pathData.chunk.name] || '[name].js';
      },
      publicPath: '/',
      library: '[name]',
      libraryTarget: 'umd',
    },
    optimization: {
      concatenateModules: false,
      minimize: mode === 'production',
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            output: { ecma: 5, comments: false, ascii_only: true },
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: { safari10: true },
          },
        }),
      ],
      splitChunks: { cacheGroups: { default: false } },
      runtimeChunk: false,
      usedExports: true,
    },
    performance: {
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000,
      hints: false,
    },
    module: {
      rules: [
        // vue-loader 必须放在 rules[0] 中
        // 之后会将 lang="ts" 的脚本转交给 babel-loader
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
        },
        {
          parser: {
            amd: false,
            requireEnsure: false,
          },
        },
        {
          oneOf: [
            {
              test: /\.json$/,
              loader: require.resolve('json-loader'),
              type: 'javascript/auto',
            },
            {
              test: /\.(woff|ttf|ico|woff2|jpg|jpeg|png|webp|gif|svg|eot)$/i,
              use: [
                {
                  loader: require.resolve('base64-inline-loader'),
                },
              ],
            },
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: [
                babelLoader({ ts: true }),
              ],
            },
            {
              test: /\.(js|mjs|jsx)$/,
              exclude: /node_modules/,
              use: [
                babelLoader({}),
              ],
            },
            // dev 模式下 demo 样式使用 style-loader
            mode === 'development' && {
              test: /\.(sass|scss|css|less)$/,
              include: /public/,
              use: ['style-loader', cssLoader(), lessLoader(), sassLoader()],
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [cssExtractLoader(), cssLoader()],
              sideEffects: true,
            },
            {
              test: /\.less$/,
              exclude: /\.module\.less$/,
              use: [cssExtractLoader(), cssLoader(), lessLoader()],
              sideEffects: true,
            },
            {
              test: /\.(scss|sass)$/,
              exclude: /\.module\.(scss|sass)$/,
              use: [cssExtractLoader(), cssLoader(), sassLoader()],
              sideEffects: true,
            },
            // css modules 配置
            {
              test: /\.module\.css$/,
              use: [
                cssExtractLoader(),
                cssModuleLoader(),
                cssLoader({ modules: true }),
              ],
            },
            {
              test: /\.module\.less$/,
              use: [
                cssExtractLoader(),
                cssModuleLoader(),
                cssLoader({ modules: true }),
                lessLoader(),
              ],
            },
            {
              test: /\.module\.(scss|sass)$/,
              use: [
                cssExtractLoader(),
                cssModuleLoader(),
                cssLoader({ modules: true }),
                sassLoader(),
              ],
            },
            {
              test: /\.ejs$/,
              loader: require.resolve('ejs-compiled-loader'),
              options: {
                variable: 'data',
              },
            },
          ].filter(each => each),
        },
      ],
    },
    resolve: {
      modules: ['node_modules', path.resolve(cwd, 'node_modules')],
      extensions: [
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.css',
        '.less',
        '.sass',
        '.scss',
      ],
    },
    devServer: {
      port: 8001,
      https: true,
      host: '127.0.0.1',
      disableHostCheck: true,
      contentBase: path.resolve(cwd, 'public'),
      compress: true,
      clientLogLevel: 'none',
      watchContentBase: true,
      hot: true,
      quiet: false,
      inline: false,
      public: undefined,
      proxy: undefined,
      publicPath: '/',
      headers: {
        'access-control-allow-origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'cache-control': 'public, max-age=0',
      },
    },
  };

  // demo 入口模块
  if (mode === 'development') {
    const devEntry = ['index.ts', 'index.tsx', 'index.js', 'index.jsx'];

    const devEntryName = devEntry.find(entryFileName =>
      fs.existsSync(path.resolve(cwd, `./public/${entryFileName}`)),
    );

    webpackConfig.entry.BIDevEntry = path.resolve(
      cwd,
      `./public/${devEntryName}`,
    );
  }

  webpackConfig.plugins = [
    new webpack.ProgressPlugin(),
    // 清空 build 目录
    mode === 'production' && new CleanWebpackPlugin(),
    mode === 'development' &&
    new HtmlWebpackPlugin({
      template: path.resolve(cwd, './public/index.html'),
      templateContent: false,
      filename: 'index.html',
      compile: true,
      minify: false,
      chunks: 'all',
      excludeChunks: [],
      title: 'Quick BI Custom Component',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    // 抽离样式
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ]
    .filter(each => each);

  return webpackConfig;
}

module.exports = {
  getWebpackConfig
}