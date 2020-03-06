const path = require('path')

module.exports = {
  mode: "development",
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
