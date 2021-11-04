//== DEPENDENCIES ==//

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

// Global variables
var trackedFolders = [];
var trackedAudioFiles = [];

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

// Read saved data to populate views with
function LoadData()
{
   // Read & update vars
}

//== FUNCTIONS AVAILABLE IN RENDERER ==//

ipcMain.handle('getFolders', () =>
{
   return trackedFolders;
}
);

ipcMain.handle('getAudioFiles', () =>
{
   return trackedAudioFiles;
}
);

//== MAIN APP ==//

// Do when app is launched and ready
app.whenReady().then(() =>
{
   // Create the main app window
   CreateWindow();

   // Update local variables according to saved data
   //LoadData(); ======================================================================================================

   // If app is activated and there are no windows open, open one
   app.on('activate', () =>
   {
      if (BrowserWindow.getAllWindows().length === 0)
      {
         CreateWindow();
         //LoadData(); ================================================================================================
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