const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');

const serverConfig = {
  target: 'node', // 使用node.js require加载chunks，并且任何内置的模块(如fs或者path)都不会打包进bundle中
  entry: path.resolve(__dirname, '../src/server/index.js'),
  externals: [nodeExternals()], // 打包的时候，node_modules下面的模块不会打包进bundle中
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "server.bundle.js"
  },
}

module.exports = merge(baseConfig, serverConfig)
