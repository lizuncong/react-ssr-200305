
module.exports = function () {
  return {
    contentBase: '../dist/web/assets/',
    open: false,
    overlay: true,
    hot: true,
    port: 8008,
    historyApiFallback: true,
  };
};
