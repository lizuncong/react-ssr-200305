const rimraf = require('rimraf')
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const clientConfig = require('../build/webpack.client');
import serverConfig = require('../build/webpack.server');

function build() {
  // 清空dist目录
  rimraf.sync('dist/*', {}, (err, result) => {
    console.log(err)
  })
  // 创建dist目录
  mkdirp.sync('dist')

  webpack([clientConfig, serverConfig]).run((err, stats) => {
    console.log('webpack build')
    if (err) {
      return console.log(err);
    }

    console.info(stats.toString(clientConfig.stats));
    if (stats.hasErrors()) {
      return console.log(new Error('Webpack compilation errors'));
    }

  });
}

build();
