const path = require('path');
const merge = require('webpack-merge');
const isWsl = require('is-wsl');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const clientConfig = (mode) => {
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';
  return {
    target: 'web',
    entry: {
      client: isDevelopment ? [
        // path.resolve(__dirname, './webpackHotDevClient.js'),
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '../src/client/index.jsx'),
      ] : path.resolve(__dirname, '../src/client/index.jsx'),
    },
    output: {
      path: path.resolve(__dirname, '../dist/web/assets'),
      filename: isDevelopment ? '[name].js' : '[name].[chunkhash:8].js',
      chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
    },
    optimization: {
      minimize: isProduction, // 开发环境不压缩代码
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
              // drop_console: true,
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
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
};

module.exports = (mode) => merge(baseConfig('client', mode), clientConfig(mode));
