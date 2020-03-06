const path = require('path')

module.exports = {
  mode: "development",
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      pages: path.resolve(__dirname, '../src/pages'),
      components: path.resolve(__dirname, '../src/components'),
    },
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
