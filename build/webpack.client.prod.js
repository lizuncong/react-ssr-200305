const path = require('path')
const merge = require('webpack-merge')
// const fs = require('fs');
const isWsl = require('is-wsl');
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const WebpackAssetsManifest = require('webpack-assets-manifest');
const baseConfig = require('./webpack.base');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const clientConfig = {
  target: 'web',
  entry: {
    client: path.resolve(__dirname, '../src/client/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, '../dist/web/assets'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: !isWsl,
        cache: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
    // new WebpackAssetsManifest({
    //   output: path.resolve(__dirname, '../dist/asset-manifest.json'),
    //   publicPath: true,
    //   writeToDisk: true,
    //   customize: ({ key, value }) => {
    //     // 过滤sourcemap文件
    //     if (key.toLowerCase().endsWith('.map')) return false;
    //     return { key, value };
    //   },
    //   done: (manifest, stats) => {
    //     const chunkFileName = path.join(__dirname, '../dist/chunk-manifest.json');
    //     try {
    //       const fileFilter = file => !file.endsWith('.map');
    //       const addPath = file => manifest.getPublicPath(file);
    //       const chunkFiles = stats.compilation.chunkGroups.reduce((acc, c) => {
    //         acc[c.name] = [
    //           ...(acc[c.name] || []),
    //           ...c.chunks.reduce(
    //             (files, cc) => [
    //               ...files,
    //               ...cc.files.filter(fileFilter).map(addPath),
    //             ],
    //             [],
    //           ),
    //         ];
    //         return acc;
    //       }, Object.create(null));
    //       fs.writeFileSync(chunkFileName, JSON.stringify(chunkFiles, null, 2));
    //     } catch (err) {
    //       console.error(`ERROR: Cannot write ${chunkFileName}: `, err);
    //       process.exit(1);
    //     }
    //   },
    // }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}

const config = merge(baseConfig('client', 'production'), clientConfig);
module.exports = config

