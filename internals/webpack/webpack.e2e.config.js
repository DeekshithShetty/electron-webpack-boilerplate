const webpack = require('webpack');
const merge = require('webpack-merge');
const jetpack = require('fs-jetpack');
const chalk = require('chalk');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const base = require('./webpack.base.config');

// Test files are scattered through the whole project. Here we're searching
// for them and generating entry file for webpack.

const e2eDir = jetpack.cwd('e2e');
const buildDir = jetpack.cwd('build-test');
const entryFilePath = buildDir.path('e2e-entry.js');

const addSpecFilesToEntry = singleFilePath => {
  let entryFileContent;

  if (singleFilePath !== undefined) {
    // You can e2e test a single file by passing the file path to --file arg in pree2e.
    // Open the e2e file that you want to debug and run `E2E Test: Single` in VS Code debug config.

    if (!/.*.e2e.js$/.test(singleFilePath)) {
      console.log(
        chalk.yellow.bgBlack.bold(
          '\n---------------------------------------------------------------------------------------------\n',
          'Current opened file is not a e2e spec file. Please open .e2e.js file that you want to debug\n',
          '--------------------------------------------------------------------------------------------\n\n',
        ),
      );
    }

    const normalizedPath = singleFilePath
      .replace(/\\/g, '/')
      .replace(/.*e2e\//g, '');
    entryFileContent = `import "../e2e/${normalizedPath}";\n`;
  } else {
    entryFileContent = e2eDir
      .find({ matching: '*.e2e.js' })
      .reduce((fileContent, path) => {
        const normalizedPath = path.replace(/\\/g, '/');
        return `${fileContent}import "../e2e/${normalizedPath}";\n`;
      }, '');
  }

  jetpack.write(entryFilePath, entryFileContent);
  return true;
};

module.exports = (env, args) =>
  merge(base(env), {
    entry: addSpecFilesToEntry(args.file) && entryFilePath,
    output: {
      filename: 'e2e.js',
      path: buildDir.path(),
    },
    mode: 'development',
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
      new webpack.DefinePlugin({
        ELECTRON_IS_LOCAL: false,
      }),
    ],
  });
