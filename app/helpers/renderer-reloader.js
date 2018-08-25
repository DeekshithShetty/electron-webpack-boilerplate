// code reffered from https://github.com/sindresorhus/electron-reloader/blob/master/index.js

const path = require('path');
const electron = require('electron');
const chokidar = require('chokidar');

module.exports = () => {
  const cwd = path.dirname(__filename);

  const watcher = chokidar.watch(cwd, {
    disableGlobbing: true,
  });

  watcher.on('change', () => {
    electron.BrowserWindow.getAllWindows().forEach(win => {
      win.webContents.reloadIgnoringCache();
    });
  });
};
