const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const webpack = require('webpack');
const fs = require('fs');
const glob = require('glob');
const clientConfig = require('../build/webpack.client')('production');
const serverConfig = require('../build/webpack.server')('production');

function copyFile(source, target) {
  const rd = fs.createReadStream(source);
  const wr = fs.createWriteStream(target);
  rd.pipe(wr);
}
function build() {
  // 清空dist目录
  rimraf.sync('dist/*', {}, (err, result) => {
    console.log(err);
  });

  // 创建dist目录
  mkdirp.sync('dist');

  const dirs = glob.sync('**/*.*', {
    cwd: 'static',
    nosort: true,
    dot: true,
  });

  dirs.forEach((dir) => {
    const from = path.resolve('static', dir);
    const to = path.resolve('dist/web/assets/static', dir);
    mkdirp.sync(path.dirname(to));
    copyFile(from, to);
  });

  webpack([clientConfig, serverConfig]).run((err, stats) => {
    if (err) {
      return console.log(err);
    }

    console.info(stats.toString(clientConfig.stats));
    if (stats.hasErrors()) {
      return console.log(new Error('webpack编译错误'));
    }
  });
}

build();
