const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = env =>
  merge(base(env), {
    mode: 'development',
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
      new webpack.DefinePlugin({
        ELECTRON_IS_LOCAL: true,
      }),
    ],
  });
