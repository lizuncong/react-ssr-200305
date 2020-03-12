const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const clientConfig = {
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: "client.bundle.js",
  },
  // module: {
  //   rules: [
  //     {
  //       test: lessRegex,
  //       exclude: lessModuleRegex,
  //       use: [
  //         {
  //           loader: 'style-loader', // 同构
  //         },
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             importLoaders: 1,
  //           }
  //         },
  //         {
  //           loader: 'less-loader',
  //           options: {
  //             modifyVars: {
  //               '@primary-color': '#1890FF',
  //             },
  //             javascriptEnabled: true,
  //           }
  //         }
  //       ]
  //     },
  //   ]
  // }
}

const config = merge(baseConfig, clientConfig);
module.exports = config

