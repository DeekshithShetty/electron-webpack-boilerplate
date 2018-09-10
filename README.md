# electron-webpack-boilerplate 
Boilerplate application for Electron with webpack. The boilerplate also doesn't impose on you any frontend technologies or frameworks. Inspired from [electron-boilerplate](https://github.com/szwacz/electron-boilerplate) and [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate). Refer [Electron docs](https://electronjs.org/docs) for more information.

[![TravisCI](https://travis-ci.org/DeekshithShetty/electron-webpack-boilerplate.svg)](https://travis-ci.org/DeekshithShetty/electron-webpack-boilerplate)
[![dependencies Status](https://david-dm.org/DeekshithShetty/electron-webpack-boilerplate/status.svg)](https://david-dm.org/DeekshithShetty/electron-webpack-boilerplate)
[![devDependencies Status](https://david-dm.org/DeekshithShetty/electron-webpack-boilerplate/dev-status.svg)](https://david-dm.org/DeekshithShetty/electron-webpack-boilerplate?type=dev)


# Quick start
Make sure you have [Node.js](https://nodejs.org) installed, then type the following commands in the terminal window.
```
git clone https://github.com/DeekshithShetty/electron-webpack-boilerplate.git
cd electron-webpack-boilerplate
npm install
npm start
```

# Project Structure

`app` - contains code for the app written in ES6 syntax. Files within this folder get transpiled.

`internals` - contains code for configuring webpack (build process), config files for different environment and resources required for building the app.

`e2e` - contains e2e test files.

`build` - contains bundled/minified code once the build process is completed, which is used to run the application.

`dist` - contains the distributable file generated once the packaging process is completed.

# Setting Up Your Editor
Use [VS Code](https://code.visualstudio.com/) for editing, building and testing the app. Install [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) extension. Also for better developer experience, please install the following extensions. These allow you to see any warnings or errors directly within the editor.

+ [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
+ [Stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
+ [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
+ [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
+ [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
+ [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
+ [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
+ [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)


# Run and Debug
## Via VS Code (Recommended)
Go to the Debug view, select the `Electron: All`, which will connect VS Code to the both Main and Renderer process. You can configure the `preLaunchTask` in `launch.json` to point to appropriate build environment. By default it points to dev environment running in watch mode. You can specify the config environment using `--env` in the npm scripts.

1. Set breakpoints in [main.js](./app/main.js) (Main process) to debug. 
2. Set breakpoints in Google Chrome DevTools for the renderer process code. Reload the page in Electron app window (`Ctrl+R` (Windows) / `CMD+R` (Mac) or `Development -> Reload`) to debug. (Note: If you want to debug the renderer process code in VS Code, comment the line `mainWindow.openDevTools()` in [main.js](./app/main.js) and then set breakpoints for the renderer code in the editor)

Refer [vs code recipes for electron](https://github.com/Microsoft/vscode-recipes/tree/master/Electron) for more information. 


## Via Terminal
+ Run the following command to start the app in local environment:
  ```
  npm start
  ```
+ Run the following command to start the app in production environment:
  ```
  npm run start:prod
  ```
 You can specify the config environment using `--env` in the npm scripts.
 
# Linting and Code formatting
We use [stylelint](https://stylelint.io/) for CSS linting, [eslint](http://eslint.org/) for JS linting and [prettier](https://prettier.io/) for code formatting. We've also set up a git hook to automatically run linting before your code is committed.
```
npm run lint
```

+ ### JS linting
  ```
  npm run lint:eslint
  ```

+ ### CSS linting
  ```
  npm run lint:css
  ```


# Testing
For all tests, run the following command:
  ```
  npm test
  ```
+ ### Unit
  We use [Mocha](https://mochajs.org/) test runner with the [Chai](http://chaijs.com/api/assert/) assertion library. You can put your spec files wherever you want within the `app` directory, just name them with the `.spec.js` extension. Run the following command:
  ```
  npm run unit
  ```
  You can unit test a single file by passing the file path to `--file` arg in `preunit`.
  To debug a unit test for a single file in VS Code, open the spec file that you want to debug and run `Unit Test: Single` in debug config.

+ ### e2e
  We use [Mocha](https://mochajs.org/) and [Spectron](http://electron.atom.io/spectron/). This task will run all files in `e2e` directory with `.e2e.js` extension. Run the following command:
  ```
  npm run e2e
  ```
  You can e2e test a single file by passing the file path to `--file` arg in `pree2e`.
  To debug a e2e test for a single file in VS Code, open the e2e spec file that you want to debug and run `E2E Test: Single` in debug config.


# Release
To package your app into an installer use command:
```
npm run release
```
Once the packaging process finished, the `dist` folder will contain your distributable file. We use [electron-builder](https://github.com/electron-userland/electron-builder) to handle the packaging process.