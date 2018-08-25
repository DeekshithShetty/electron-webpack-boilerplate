const webpack = require('webpack');
const merge = require('webpack-merge');
const jetpack = require('fs-jetpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const base = require('./webpack.base.config');

// Test files are scattered through the whole project. Here we're searching
// for them and generating entry file for webpack.

const e2eDir = jetpack.cwd('e2e');
const buildDir = jetpack.cwd('build-test');
const entryFilePath = buildDir.path('e2e-entry.js');

const entryFileContent = e2eDir
  .find({ matching: '*.e2e.js' })
  .reduce((fileContent, path) => {
    const normalizedPath = path.replace(/\\/g, '/');
    return `${fileContent}import "../e2e/${normalizedPath}";\n`;
  }, '');

jetpack.write(entryFilePath, entryFileContent);

module.exports = env =>
  merge(base(env), {
    entry: entryFilePath,
    output: {
      filename: 'e2e.js',
      path: buildDir.path(),
    },
    mode: 'development',
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
      new webpack.DefinePlugin({
        ELECTRON_IS_DEV: false,
      }),
    ],
  });
