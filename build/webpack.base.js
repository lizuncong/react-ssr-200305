const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = (target) => {
  const isServer = target === 'server'
  const isClient = target === 'client'
  return {
    mode: "development",
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, '../dist/public/assets'),
      publicPath: '/assets/',
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].chunk.js',
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules', 'src'],
      alias: {
        src: path.resolve(__dirname, '../src'),
        pages: path.resolve(__dirname, '../src/pages'),
        components: path.resolve(__dirname, '../src/components'),
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      "useBuiltIns": isClient ? "usage" : undefined,
                      "corejs": isClient ? 3 : false,

                    }
                  ],
                  "@babel/preset-react"
                ],
                plugins: [
                  "@loadable/babel-plugin",
                  "@babel/plugin-syntax-dynamic-import",
                  ["import", {
                    libraryName: "antd",
                    // libraryDirectory: "lib", //改成es会有问题
                    style: true // `style: true` 会加载 less 文件
                  }]
                ].filter(Boolean)
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: {
            loader: 'url-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              limit: 8192,
              emitFile: isClient,
            },
          },
        },
        {
          test: /\.(eot|ttf|svg|woff)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
              emitFile: isClient,
            },
          },
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: [
            {
              loader: 'isomorphic-style-loader', // 同构
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
            },
          ]
        },
        {
          test: cssModuleRegex,
          use: [
            {
              loader: 'isomorphic-style-loader', // 同构
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[path][name]__[local]',
                },
              }
            },
            {
              loader: 'postcss-loader',
            },
          ]
        },
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: [
            {
              loader: 'isomorphic-style-loader', // 同构
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              }
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'less-loader',
              options: {
                modifyVars: {
                  '@primary-color': '#1890FF',
                },
                javascriptEnabled: true,
              }
            }
          ]
        },
        {
          test: lessModuleRegex,
          use: [
            {
              loader: 'isomorphic-style-loader', // 同构
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: '[path][name]__[local]',
                },
              }
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'less-loader'
            }
          ]
        },
      ]
    },
    stats: {
      colors: true,
      timings: true,
    },
    plugins: [
      new LoadablePlugin({
        writeToDisk: true,
        filename: `loadable-stats-${target}.json`
      }),
    ]
  }
}
