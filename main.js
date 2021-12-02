//== DEPENDENCIES ==//

const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const fs = require('fs');
const {DataManager} = require('./src/data_manager');

//== GLOBAL VARIABLES ==//

var dm = new DataManager();

//== FUNCTIONS ==//

// Create the main app window
function CreateWindow()
{
   // Create the window object
   const win = new BrowserWindow(
   {
      width: 800,
      height: 600,
      webPreferences: {
         preload: path.join(__dirname, 'src/index.js')
      }
   }
   );

   // Load the main HTML file to the window object
   win.loadFile('index.html');
}

// Show dialog to choose a folder
function GetFoldersFromDialog()
{
   // Open dialog box
   let folderPaths = dialog.showOpenDialogSync({
      properties: ['openDirectory', 'multiSelections']
   }
   );

   // undefined means the operation was canceled
   if (folderPaths === undefined) folderPaths = [];

   // Return selectedfolders (or empty array if none selected)
   return folderPaths;
}

//== FUNCTIONS AVAILABLE IN RENDERER ==//

ipcMain.handle('getFolders', () =>
{
   return dm.trackedFolderData;
}
);

ipcMain.handle('getAudioFiles', () =>
{
   return dm.trackedFileData;
}
);

ipcMain.handle('getAudioFilesInFolder', (event, args) =>
{
   return dm.getFilesByFolderID(args);
}
);

ipcMain.handle('folderDialogBox', () =>
{
   return GetFoldersFromDialog();
}
);

//== MAIN APP ==//

// Do when app is launched and ready
app.whenReady().then(() =>
{
   // Update local variables according to saved data
   //LoadData();
   
   // Create the main app window
   CreateWindow();

   //SaveData();
   //console.log(GetFilesFromFolder('G:/My Drive/Music Production/Samples/Custom/Basses'));
   //console.log(GetFoldersFromFolder('G:/My Drive/Music Production/Samples/Custom/'));
   //dm.traverseAndParseFolder('G:\\My Drive\\Music Production\\Samples\\Custom', true);

   // If app is activated and there are no windows open, open one
   app.on('activate', () =>
   {
      if (BrowserWindow.getAllWindows().length === 0)
      {
         CreateWindow();
      }
   }
   );
}
);

// Do when all app windows are closed
app.on('window-all-closed', () =>
{
   // Quit app if all windows are closed, except on Mac
   if (process.platform !== 'darwin')
   {
      app.quit();
   }
}
);