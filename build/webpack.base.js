const path = require('path')

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

module.exports = {
  mode: "development",

  output: {
    path: resolvePath(BUILD_DIR, '../dist/public/assets'),
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
                  "@babel/preset-env", {
                    "useBuiltIns": "usage",
                    "corejs": 3
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                ["import", {
                  libraryName: "antd",
                  // libraryDirectory: "lib", //改成es会有问题
                  style: true // `style: true` 会加载 less 文件
                }]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
            limit: 8192,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg|woff)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
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
}
