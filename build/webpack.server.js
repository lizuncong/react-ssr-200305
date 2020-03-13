const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');

const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

const serverConfig = {
  target: 'node', // 使用node.js require加载chunks，并且任何内置的模块(如fs或者path)都不会打包进bundle中
  entry: {
    server: path.resolve(__dirname, '../src/server/index.js')
  },
  externals: [
      './chunk-manifest.json',
      './asset-manifest.json',
      nodeExternals({
      // whitelist: [/antd\/.*\/style/],
      whitelist: [reStyle, reImage, /antd\/.*\/style/],
    }),
  ], // 打包的时候，node_modules下面的模块不会打包进bundle中
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    // Define free variables
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
    }),
    // Adds a banner to the top of each generated chunk
    // https://webpack.js.org/plugins/banner-plugin/
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
}

module.exports = merge(baseConfig('server'), serverConfig)
