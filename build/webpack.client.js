const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base');

const clientConfig = {
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: "client.bundle.js"
  }
}

module.exports = merge(baseConfig, clientConfig)

