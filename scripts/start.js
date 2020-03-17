const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const browserSync = require('browser-sync');
const express = require('express');
const { createCompilation } = require('./utils');
const clientConfig = require('../build/webpack.client')('development');
const serverConfig = require('../build/webpack.server')('development');


const watchOptions = {
};

const server = express();


server.use(errorOverlayMiddleware());
server.use(express.static(path.resolve(__dirname, '../static')));

// 清空dist目录
rimraf.sync('dist/*', {}, (err) => {
  console.log(err);
});


const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);


const clientCompilation = createCompilation(
  'client',
  clientCompiler,
  clientConfig,
);
const serverPromise = createCompilation(
  'server',
  serverCompiler,
  serverConfig,
);

server.use(webpackDevMiddleware(serverCompiler, {
  publicPath: serverConfig.output.publicPath,
  logLevel: 'silent',
  watchOptions,
}));

// server.use(webpackHotMiddleware(clientCompiler, { log: false }));

server.listen(3000, () => console.log('Example app listening on port 3000!'));


// browserSync.create().init(
//   {
//     // https://www.browsersync.io/docs/options
//     server: 'src/server.js',
//     middleware: [server],
//     open: true,
//   },
//   (error, bs) => {
//     console.log('finish...');
//     console.log('error', error);
//   },
// );
// let appPromise;
// let appPromiseResolve;
// let appPromiseIsResolved = true;
// serverCompiler.hooks.compile.tap('server', () => {
//   if (!appPromiseIsResolved) return;
//   appPromiseIsResolved = false;
//   appPromise = new Promise((resolve) => (appPromiseResolve = resolve));
// });
