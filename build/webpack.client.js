const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base');

const clientConfig = {
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: "client.bundle.js"
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'isomorphic-style-loader', // 同构
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path][name]__[local]'
              },
            }
          }
        ]
      }
    ]
  }
}

module.exports = merge(baseConfig, clientConfig)

