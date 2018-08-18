// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from 'env'; // eslint-disable-line import/no-unresolved
import devMenuTemplate from './menu/dev-menu-template';
import editMenuTemplate from './menu/edit-menu-template';
import createWindow from './helpers/window';
import { ENV_DEVELOPMENT, ENV_PRODUCTION } from './constants';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  if (env.name === ENV_DEVELOPMENT) {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== ENV_PRODUCTION) {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
  setApplicationMenu();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'home.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  if (env.name === ENV_DEVELOPMENT) {
    // uncomment the below line if you want the devtools to immediately open when the app is open
    // mainWindow.openDevTools();
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
