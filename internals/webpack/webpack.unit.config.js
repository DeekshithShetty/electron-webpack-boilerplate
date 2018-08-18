const merge = require('webpack-merge');
const jetpack = require('fs-jetpack');
const base = require('./webpack.base.config');

// Test files are scattered through the whole project. Here we're searching
// for them and generating entry file for webpack.

const appDir = jetpack.cwd('app');
const tempDir = jetpack.cwd('temp');
const entryFilePath = tempDir.path('specs-entry.js');

const entryFileContent = appDir
  .find({ matching: '*.spec.js' })
  .reduce((fileContent, path) => {
    const normalizedPath = path.replace(/\\/g, '/');
    return `${fileContent}import "../app/${normalizedPath}";\n`;
  }, '');

jetpack.write(entryFilePath, entryFileContent);

module.exports = env =>
  merge(base(env), {
    entry: entryFilePath,
    output: {
      filename: 'specs.js',
      path: tempDir.path(),
    },
  });
