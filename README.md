# electron-webpack-boilerplate 
Boilerplate application for Electron with webpack.
Inspired from [electron-boilerplate](https://github.com/szwacz/electron-boilerplate) and [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

# Code Editor
Use [VS Code](https://code.visualstudio.com/) for editing, building and testing the app.
For better developer experience, please install the following extensions - 
+ [Debugger for Chrome (must have)](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
+ [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
+ [Stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
+ [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
+ [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
+ [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
+ [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
+ [Rainbow Brackets](https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets)

# Run and Debug
## Via VS Code (Recommended)
Go to the Debug view, select the 'Electron: Development', which will connect VS Code to the both Main and Renderer process.

+ Set breakpoints in [main.js](./app/main.js) (Main process) to debug. 
+ Set breakpoints in Google Chrome DevTools for the renderer process code. Reload the page in Electron app window (Ctrl+R (Windows) / CMD+R (Mac) or Development -> Reload) to debug.
+ If you want to debug the renderer process code in VS Code, comment the line `mainWindow.openDevTools()` in [main.js](./app/main.js). Set breakpoints.

## Via Terminal
+ Set env in build npm script.
+ Run `npm start` to start the app.

Refer [Electron docs](https://electronjs.org/docs) for more information.

# Linting and Code formatting
+ We use `stylelint` for CSS linting. You can trigger it using the `npm run lint:css`.
+ We use `eslint` for JS linting. You can trigger it using the `npm run lint:eslint`.
+ Use `npm run lint` for both CSS and JS linting.
+ We use `prettier` for code formatting. Refer [here](https://github.com/prettier/prettier) for more info.

# TODO
+ Add [docs](./docs)
+ Add details about running unit and e2e tests.