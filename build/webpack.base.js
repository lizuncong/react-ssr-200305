const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const { getStyleLoaders } = require('./utils');
const pkg = require('../package.json');
const { port } = require('./config');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);


const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = (target, mode) => {
  const isServer = target === 'server';
  const isClient = target === 'client';
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  const targets = target === 'server' ? {
    node: pkg.engines.node.match(/(\d+\.?)+/)[0],
  } : {
    browsers: pkg.browserslist,
  };
  return {
    mode,
    bail: isProduction,
    devtool: isProduction ? 'source-map' : 'cheap-module-inline-source-map', // 生产source-map，开发cheap-module-inline-source-map
    output: {
      // 这里如果使用publicPath: '/assets/'，在浏览器network -> preview预览的时候会看不到效果。
      // 使用publicPath: `http://localhost:${port}/assets/`就可以在浏览器network -> preview预览的时候看到效果
      // 因此只在开发环境使用`http://localhost:${port}/assets/`。
      // publicPath: isDevelopment ? `http://localhost:${port}/assets/` : '/assets/',
      publicPath: `http://localhost:${port}/assets/`,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules', 'src'],
      alias: {
        src: path.resolve(__dirname, '../src'),
        pages: path.resolve(__dirname, '../src/pages'),
        components: path.resolve(__dirname, '../src/components'),
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        // {
        //   test: /\.jsx?$/,
        //   enforce: 'pre',
        //   use: [
        //     {
        //       options: {
        //         cache: true,
        //       },
        //       loader: 'eslint-loader',
        //     },
        //   ],
        //   include: path.resolve(__dirname, '../src'),
        // },
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: isClient ? 'usage' : undefined,
                      corejs: isClient ? 3 : false,
                      targets,
                    },
                  ],
                  '@babel/preset-react',
                ],
                plugins: [
                  '@loadable/babel-plugin',
                  '@babel/plugin-syntax-dynamic-import',
                  ['import', {
                    libraryName: 'antd',
                    // libraryDirectory: "lib", //改成es会有问题
                    style: true, // `style: true` 会加载 less 文件
                  }],
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: {
            loader: 'url-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              limit: 8192,
              emitFile: isClient,
            },
          },
        },
        {
          test: /\.(eot|ttf|svg|woff)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              emitFile: isClient,
            },
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders(target, mode, {
            importLoaders: 1,
            sourceMap: false,
          }),
        },
        {
          test: cssModuleRegex,
          use: getStyleLoaders(target, mode, {
            importLoaders: 1,
            sourceMap: false,
            modules: {
              localIdentName: isProduction ? '[hash:base64]' : '[path][name]__[local]',
            },
          }),
        },

        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: getStyleLoaders(
            target,
            mode,
            {
              importLoaders: 2,
              sourceMap: false,
            },
            'less-loader',
            {
              modifyVars: {
                '@primary-color': '#1890FF',
              },
              javascriptEnabled: true,
            },
          ),
        },
        {
          test: lessModuleRegex,
          use: getStyleLoaders(
            target,
            mode,
            {
              importLoaders: 2,
              sourceMap: false,
              modules: {
                localIdentName: isProduction ? '[hash:base64]' : '[path][name]__[local]',
              },
            },
            'less-loader',
          ),
        },
      ],
    },
    plugins: [
      new LoadablePlugin({
        writeToDisk: true,
        filename: `loadable-stats-${target}.json`,
      }),

      new MiniCssExtractPlugin({
        filename: isServer ? 'node/static/css/[name].[contenthash:8].css' : 'static/css/[name].[contenthash:8].css',
        chunkFilename: isServer ? 'node/static/css/[name].[contenthash:8].chunk.css' : 'static/css/[name].[contenthash:8].chunk.css',
        // ignoreOrder: true,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new CompressionPlugin()
    ],
    stats: {
      colors: true,
      timings: true,
    },
  };
};
