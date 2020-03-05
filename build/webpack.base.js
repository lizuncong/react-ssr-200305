const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  target: 'node', // 使用node.js require加载chunks，并且任何内置的模块(如fs或者path)都不会打包进bundle中
  entry: path.resolve(__dirname, '../src/server/index.js'),
  externals: [nodeExternals()], // 打包的时候，node_modules下面的模块不会打包进bundle中
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "server.bundle.js"
  },
  module: {
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
              ]
            }
          }
        ]
      }
    ]
  },
}
