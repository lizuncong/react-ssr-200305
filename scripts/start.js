const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const browserSync = require('browser-sync');
const { createProxyMiddleware } = require('http-proxy-middleware');
const mkdirp = require('mkdirp');
const express = require('express');
const { createCompilationPromise, format } = require('./utils');
const clientConfig = require('../build/webpack.client')('development');
const serverConfig = require('../build/webpack.server')('development');

const watchOptions = {};

let server;

async function start() {
  if (server) return server;
  server = express();
  server.use(errorOverlayMiddleware());
  server.use(express.static(path.resolve(__dirname, '../static')));


  // 清空dist目录
  rimraf.sync('dist/*', {}, (err, result) => {
    console.log(err);
  });

  // 创建dist目录
  mkdirp.sync('dist');
  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);
  const clientPromise = createCompilationPromise(
    'client',
    clientCompiler,
    clientConfig,
  );
  const serverPromise = createCompilationPromise(
    'server',
    serverCompiler,
    serverConfig,
  );
  console.log('client config output public path...', clientConfig.output.publicPath);
  server.use(
    webpackDevMiddleware(clientCompiler, {
      serverSideRender: true,
      publicPath: clientConfig.output.publicPath,
      logLevel: 'silent',
      watchOptions,
    }),
  );

  // server.use(webpackHotMiddleware(clientCompiler, { log: false }));


  let appPromise;
  let appPromiseResolve;
  let appPromiseIsResolved = true;
  serverCompiler.hooks.compile.tap('server', () => {
    if (!appPromiseIsResolved) return;
    appPromiseIsResolved = false;
    // eslint-disable-next-line no-return-assign
    appPromise = new Promise((resolve) => (appPromiseResolve = resolve));
  });

  let app;
  server.use((req, res) => {
    appPromise
      .then(() => app.handle(req, res))
      .catch((error) => console.error(error));
  });

  function checkForUpdate(fromUpdate) {
    const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
    if (!app.hot) {
      throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
    }
    if (app.hot.status() !== 'idle') {
      return Promise.resolve();
    }
    return app.hot
      .check(true)
      .then((updatedModules) => {
        console.log('updatedModules.....', updatedModules);
        if (!updatedModules) {
          if (fromUpdate) {
            console.info(`${hmrPrefix}Update applied.`);
          }
          return;
        }
        if (updatedModules.length === 0) {
          console.info(`${hmrPrefix}Nothing hot updated.`);
        } else {
          console.info(`${hmrPrefix}Updated modules:`);
          updatedModules.forEach((moduleId) => console.info(`${hmrPrefix} - ${moduleId}`));
          checkForUpdate(true);
        }
      })
      .catch((error) => {
        if (['abort', 'fail'].includes(app.hot.status())) {
          console.warn(`${hmrPrefix}Cannot apply update.`);
          delete require.cache[require.resolve('../dist/server')];
          // eslint-disable-next-line global-require, import/no-unresolved
          app = require('../dist/server').default;
          console.warn(`${hmrPrefix}App has been reloaded.`);
        } else {
          console.warn(
            `${hmrPrefix}Update failed: ${error.stack || error.message}`,
          );
        }
      });
  }

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      console.log('server compiler watch...======================')
      delete require.cache[require.resolve('../dist/server')];
      // eslint-disable-next-line global-require, import/no-unresolved
      app = require('../dist/server').default;
      appPromiseIsResolved = true;
      appPromiseResolve();
      // checkForUpdate().then(() => {
      //   appPromiseIsResolved = true;
      //   appPromiseResolve();
      // });
    }
  });

  // Wait until both client-side and server-side bundles are ready
  await clientPromise;
  await serverPromise;

  const timeStart = new Date();
  console.info(`[${format(timeStart)}] Launching server...`);

  // Load compiled src/server.js as a middleware
  // eslint-disable-next-line global-require, import/no-unresolved
  app = require('../dist/server').default;
  appPromiseIsResolved = true;
  appPromiseResolve();

  const port = process.env.PORT ? Number(process.env.PORT) : undefined;

  // Launch the development server with Browsersync and HMR
  await new Promise((resolve, reject) => browserSync.create().init(
    {
      // https://www.browsersync.io/docs/options
      server: 'src/server/index.js',
      middleware: [server],
      open: true,
    },
    (error, bs) => (error ? reject(error) : resolve(bs)),
  ));

  const timeEnd = new Date();
  const time = timeEnd.getTime() - timeStart.getTime();
  console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
  return server;
}

start();
