const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('lodash.merge');
const webpack = require('webpack');

const cwd = process.cwd();

const outerWebpackConfigFileName = path.resolve(cwd, 'webpack.config.js');

const defaultServer = {
  https: true,
  host: '127.0.0.1',
  port: 8001,
};

const getDevOrigin = (outerServerConfig = {}) => {
  const { https, host, port } = {
    ...defaultServer,
    ...outerServerConfig,
  };

  return `${https ? 'https://' : 'http://'}${host}:${port}`;
};

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

function getWebpackConfig({ mode = 'development', analyze = false }) {
  // 外部 webpack.config.js 只覆盖部分属性
  let outerWebpackConfig = {
    entry: {},
    externals: {},
    devServer: {},
    module: {
      rules: [],
    },
    plugins: [],
  };

  // 外部的 webpack.config.js
  if (fs.existsSync(outerWebpackConfigFileName)) {
    outerWebpackConfig = merge(
      outerWebpackConfig,
      require(outerWebpackConfigFileName),
    );
  }

  const webpackConfig = {
    mode,
    bail: mode === 'production',
    // devtool: mode === 'production' ? 'cheap-module-source-map' : false,
    devtool: false,
    entry: {
      BIComponentMeta: path.resolve(cwd, './src/meta.ts'),
      BIComponent: path.resolve(cwd, './src/index.ts'),
      ...outerWebpackConfig.entry,
    },
    output: {
      path: path.resolve(cwd, 'build'),
      pathinfo: mode === 'development',
      filename: pathData => {
        const outputMapping = {
          BIComponentMeta: 'meta.js',
          BIComponent: 'main.js',
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
        new CssMinimizerPlugin(),
      ],
      splitChunks: { cacheGroups: { default: false } },
      runtimeChunk: false,
    },
    performance: {
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000,
      hints: false,
    },
    module: {
      ...outerWebpackConfig.module,
      rules: [
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
                {
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
                      require.resolve('@babel/preset-typescript'),
                    ],
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                      require.resolve(
                        '@babel/plugin-proposal-class-properties',
                      ),
                    ],
                  },
                },
              ],
            },
            {
              test: /\.(js|mjs|jsx)$/,
              exclude: /node_modules/,
              use: [
                {
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
                    ],
                    cacheDirectory: true,
                    cacheCompression: false,
                    plugins: [
                      require.resolve(
                        '@babel/plugin-proposal-class-properties',
                      ),
                    ],
                  },
                },
              ],
            },
            // {
            //   test: /\.(js|mjs)$/,
            //   exclude: /@babel(?:\/|\\{1,2})runtime/,
            //   loader: require.resolve('babel-loader'),
            //   options: {
            //     babelrc: false,
            //     configFile: false,
            //     compact: false,
            //     presets: [
            //       [
            //         require.resolve('@babel/preset-env'),
            //         {
            //           targets: {
            //             ie: '11',
            //           },
            //           useBuiltIns: 'entry',
            //           corejs: 3,
            //           modules: false,
            //         },
            //       ],
            //     ],
            //     cacheDirectory: true,
            //     cacheCompression: false,
            //     sourceMaps: false,
            //   },
            // },
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
      ].concat(outerWebpackConfig.module.rules),
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
    externals: {
      ...outerWebpackConfig.externals,
    },
    devServer: {
      ...defaultServer,
      disableHostCheck: true,
      contentBase: path.resolve(cwd, 'public'),
      compress: true,
      clientLogLevel: 'none',
      watchContentBase: true,
      hot: true,
      quiet: false,
      inline: false,
      open: true,
      openPage: getDevOrigin(outerWebpackConfig.devServer),
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
      ...outerWebpackConfig.devServer,
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
      filename: ({ chunk }) => {
        const outputMapping = {
          BIComponentMeta: 'main.css',
          BIComponent: 'main.css',
        };
        return outputMapping[chunk.name] || '[name].css';
      },
      chunkFilename: '[id].css',
    }),
    // 替换 sourceMappingURL
    mode === 'development' &&
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
        publicPath: `${getDevOrigin(webpack.devServer)}/`,
      }),
    // 分析打包
    analyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
  ]
    .concat(outerWebpackConfig.plugins)
    .filter(each => each);

  return webpackConfig;
}

module.exports = {
  getWebpackConfig,
};
