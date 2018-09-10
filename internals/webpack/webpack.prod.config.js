const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.config');

module.exports = env =>
  merge(base(env), {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: false }),
      new webpack.DefinePlugin({
        ELECTRON_IS_LOCAL: false,
      }),
    ],
  });
