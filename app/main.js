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
import devMenuTemplate from './helpers/menu/dev-menu-template';
import editMenuTemplate from './helpers/menu/edit-menu-template';
import createWindow from './helpers/window';

const setApplicationMenu = () => {
  const menus = [editMenuTemplate];
  // eslint-disable-next-line no-undef
  if (ELECTRON_IS_LOCAL) {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
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

  // enable renderer reloading and devTools when run locally
  // eslint-disable-next-line no-undef
  if (ELECTRON_IS_LOCAL) {
    require('./helpers/renderer-reloader')(); // eslint-disable-line global-require
    mainWindow.openDevTools({ mode: 'undocked' });
  }
});

app.on('window-all-closed', () => {
  app.quit();
});
