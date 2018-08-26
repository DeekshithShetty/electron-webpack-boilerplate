const merge = require('webpack-merge');
const jetpack = require('fs-jetpack');
const chalk = require('chalk');
const base = require('./webpack.base.config');

// Test files are scattered through the whole project. Here we're searching
// for them and generating entry file for webpack.

const appDir = jetpack.cwd('app');
const buildDir = jetpack.cwd('build-test');
const entryFilePath = buildDir.path('specs-entry.js');

const addSpecFilesToEntry = singleFilePath => {
  let entryFileContent;

  if (singleFilePath !== undefined) {
    // You can unit test a single file by passing the file path to --file arg in preunit.
    // Open the spec file that you want to debug and run Unit Test: Single in VS Code debug config.

    if (!/.*.spec.js$/.test(singleFilePath)) {
      console.log(
        chalk.yellow.bgBlack.bold(
          '\n-----------------------------------------------------------------------------------------\n',
          'Current opened file is not a spec file. Please open .spec.js file that you want to debug\n',
          '----------------------------------------------------------------------------------------\n\n',
        ),
      );
    }

    const normalizedPath = singleFilePath
      .replace(/\\/g, '/')
      .replace(/.*app\//g, '');
    entryFileContent = `import "../app/${normalizedPath}";\n`;
  } else {
    entryFileContent = appDir
      .find({ matching: '*.spec.js' })
      .reduce((fileContent, path) => {
        const normalizedPath = path.replace(/\\/g, '/');
        return `${fileContent}import "../app/${normalizedPath}";\n`;
      }, '');
  }

  jetpack.write(entryFilePath, entryFileContent);
  return true;
};

module.exports = (env, args) =>
  merge(base(env), {
    entry: addSpecFilesToEntry(args.file) && entryFilePath,
    output: {
      filename: 'specs.js',
      path: buildDir.path(),
    },
    mode: 'development',
  });
