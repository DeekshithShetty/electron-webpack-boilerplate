// code reffered from https://github.com/sindresorhus/electron-reloader/blob/master/index.js

import path from 'path';
import electron from 'electron';
import chokidar from 'chokidar';

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
