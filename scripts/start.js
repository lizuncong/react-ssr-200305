const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const browserSync = require('browser-sync');
const express = require('express');
const { createCompilation } = require('./utils');
const clientConfig = require('../build/webpack.client')('development');
const clientDevServerConfig = require('../build/webpack.client.dev')();
const serverConfig = require('../build/webpack.server')('development');


// const server = express();


const clientCompiler = webpack(clientConfig);

const devServer = new WebpackDevServer(clientCompiler, clientDevServerConfig);

devServer.listen(clientDevServerConfig.port, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err);
  }
});
