const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const { createCompilation } = require('./utils');
const clientConfig = require('../build/webpack.client')('development');
const serverConfig = require('../build/webpack.server')('development');


const watchOptions = {
};

const app = express();


app.use(errorOverlayMiddleware());
app.use(express.static(path.resolve(__dirname, '../static')));

// 清空dist目录
rimraf.sync('dist/*', {}, (err, result) => {
  console.log(err);
});


const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);


const clientPromise = createCompilation(
  'client',
  clientCompiler,
  clientConfig,
);
const serverPromise = createCompilation(
  'server',
  serverCompiler,
  serverConfig,
);

app.use(webpackDevMiddleware(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  logLevel: 'silent',
  watchOptions,
}));

app.use(webpackHotMiddleware(clientCompiler, { log: false }));


let appPromise;
let appPromiseResolve;
let appPromiseIsResolved = true;
serverCompiler.hooks.compile.tap('server', () => {
  if (!appPromiseIsResolved) return;
  appPromiseIsResolved = false;
  appPromise = new Promise((resolve) => (appPromiseResolve = resolve));
});
