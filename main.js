//== DEPENDENCIES ==//

const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path                                  = require('path');
const {DataManager}                         = require('./src/data_manager');

//== GLOBAL VARIABLES ==//

var dm = new DataManager(app.getPath('userData')); // App data manager
var win;                                           // App window

//== FUNCTIONS ==//

// Create the main app window
function CreateWindow()
{
   // Create the window object
   win = new BrowserWindow(
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

// Pick a folder and traverse through it to track it and its files, then return true if the operation was successful
function AddFolderToTrackingList()
{
   // Open dialog
   let foldersToTrack = GetFoldersFromDialog();

   // Handle no folders selected
   if (foldersToTrack.length <= 0)
   {
      // Nothing new to track
      return false;
   }

   // Loop through list of folders selected
   foldersToTrack.forEach(folderPath =>
   {
      // Whether this folder will be traversed through or not
      let traverse = true;

      // Check for folder path already being tracked
      if (dm.isFolderPathBeingTracked(folderPath))
      {
         // This folder might not be traverse through
         traverse = false;

         // Open message box asking for confirmation as to whether rescan this folder
         let folderName = folderPath.substr(folderPath.lastIndexOf('\\') + 1);
         let option = dialog.showMessageBoxSync(win, {buttons: ['Yes', 'No'], message: 'The folder "' + folderName + '" is already being tracked, would you like to scan it again?', title: 'Rescan folder "' + folderName + '"?'});

         // Check whether the user wants to rescan the folder
         if (option !== undefined && option!== null && option === 0) traverse = true;
      }

      // If all is good, traverse folder
      if (traverse) dm.traverseAndParseFolder(folderPath, true);
   }
   );

   // Operation successful
   return true;
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
   return AddFolderToTrackingList();
}
);

//== MAIN APP ==//

// Do when app is launched and ready
app.whenReady().then(() =>
{
   // Update local variables according to saved data
   dm.loadData();
   
   // Create the main app window
   CreateWindow();

   //dm.traverseAndParseFolder('G:\\My Drive\\Music Production\\Samples\\Custom', true); //////////////////////////////

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