const electronBuilder = require('electron-builder');
const parseArgs = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');

// get the passed environment name
const environment = parseArgs.env;

// get the environment configurations from the config json file
const enironmentConfig = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, `config/env_${environment}.json`),
    'utf8',
  ),
);

// build the installer file using config environments
electronBuilder.build({
  config: {
    appId: enironmentConfig.appId,
    productName: enironmentConfig.productName,
    copyright: '© 2018 Saiyan Studio',
    asar: true,
    npmRebuild: true,
    artifactName: '${productName}_Setup-${version}-${os}-${arch}.${ext}', // eslint-disable-line no-template-curly-in-string
    files: ['build/**/*', 'node_modules/**/*', 'package.json'],
    directories: {
      buildResources: 'internals/resources',
      output: `dist/${environment}`,
    },
    publish: {
      provider: 'generic',
      url: 'https://dummy-url-to-generate-yml-file.com',
    },
    mac: {
      category: 'public.app-category.utilities',
    },
    win: {
      target: [
        {
          target: 'nsis',
          arch: ['x64', 'ia32'],
        },
      ],
    },
    nsis: {
      include: 'internals/resources/installer.nsh',
      oneClick: true,
    },
  },
});
