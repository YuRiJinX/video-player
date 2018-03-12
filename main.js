const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let current_window_width = 1000;
let current_window_height = 800;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      minWidth: 320,
      minHeight: 500,
      width: current_window_width,
      height: current_window_height,
      frame: false,
      titleBarStyle: 'hiddenInset'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('resize',()=>{
      mainWindow.setAspectRatio(current_window_width/current_window_height);
  });
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}// create over!

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})
//
ipcMain.on("getVideoWH",function(event,arg1,arg2){
    current_window_width = arg1;
    current_window_height = arg2;
    mainWindow.setSize(current_window_width,current_window_height);
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
