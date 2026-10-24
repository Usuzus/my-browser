const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Abdelrahman Browser",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    }
  });

  win.loadFile('index.html');

  // Handle Downloads automatically
  session.defaultSession.on('will-download', (event, item, webContents) => {
    // Automatically save to the user's "Downloads" folder
    const savePath = path.join(app.getPath('downloads'), item.getFilename());
    item.setSavePath(savePath);
    
    // Optional: You can add a notification here later
    console.log(`Downloading ${item.getFilename()} to ${savePath}`);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});