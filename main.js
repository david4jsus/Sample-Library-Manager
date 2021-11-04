//== DEPENDENCIES ==//

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

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

//== FUNCTIONS AVAILABLE IN RENDERER ==//

ipcMain.handle('test', () => {
   return app.getPath('userData');
}
);

//== MAIN APP ==//

// Do when app is launched and ready
app.whenReady().then(() =>
{
   // Create the main app window
   CreateWindow();

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