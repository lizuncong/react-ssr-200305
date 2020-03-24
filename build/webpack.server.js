const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');

const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

const serverConfig = (mode) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';
  return {
    target: 'node', // 使用node.js require加载chunks，并且任何内置的模块(如fs或者path)都不会打包进bundle中
    entry: {
      server: path.resolve(__dirname, '../src/server/index.js'),
    },
    externals: [
      nodeExternals({
        whitelist: [reStyle, reImage, /antd\/.*\/style/],
      }),
    ], // 打包的时候，node_modules下面的模块不会打包进bundle中
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      chunkFilename: 'node/[name].js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BROWSER': false,
        __DEV__: isDevelopment,
      }),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
    ].filter(Boolean),
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
  };
};

module.exports = (mode) => merge(baseConfig('server', mode), serverConfig(mode));
