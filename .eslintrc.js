module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended', // eslint-plugin-react
    'plugin:css-modules/recommended',
  ],
  plugins: ['import', 'css-modules', 'react'],
  globals: {
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // ES9。
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
      webpack: {
        config: './build/webpack.base.js',
      },
    },
  },
  rules: {
    "react/prefer-stateless-function": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-console": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-unused-expressions": "off",
    "no-async-promise-executor": "off",
    "no-await-in-loop": "off",
    "prefer-promise-reject-errors": "off",
    "consistent-return": "off",
    "react/sort-comp": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/no-array-index-key": "off",
    "react/prop-types": "off",
    "react/no-deprecated": "off",
    "react/jsx-props-no-spreading": "off",
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/prefer-default-export': 'off',
  },
};
