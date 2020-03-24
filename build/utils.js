const MiniCssExtractPlugin = require('mini-css-extract-plugin');


exports.getStyleLoaders = (target, mode, cssOptions, preProcessor, preProcessorOptions) => {
  const isServer = target === 'server';
  const isClient = target === 'client';
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: preProcessor,
        options: { sourceMap: true, ...preProcessorOptions },
      },
    );
  }
  return loaders;
};
