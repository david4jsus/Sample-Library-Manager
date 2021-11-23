//== DEPENDENCIES ==//

const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const fs = require('fs');
const {FileObj} = require('./src/file_obj');
const {FolderObj} = require('./src/folder_obj');
const {DataManager} = require('./src/data_manager');

//== GLOBAL VARIABLES ==//

var dm = new DataManager();
var trackedFolders = [ // TEST DATA ///////////////////////////////////////////////////////////////////////////////////
   new FolderObj(23, "Drums", [
      new FolderObj(24, "Kicks", [
         new FolderObj(25, "Acoustic Kicks"),
         new FolderObj(26, "Distorted Kicks"),
         new FolderObj(27, "Tuned Kicks", [
            new FolderObj(28, "Kicks E"),
            new FolderObj(29, "Kicks G")
         ]
         )
      ]
      ),
      new FolderObj(30, "Hats", null),
      new FolderObj(31, "Snares", null)
   ]
   ),
   new FolderObj(32, "Melodic Loops", [
      new FolderObj(33, "Guitar", [
         new FolderObj(34, "Guitar Riffs")
      ]
      ),
      new FolderObj(35, "Piano")
   ]
   ),
   new FolderObj(36, "Stems")
];
var trackedAudioFiles = [];
var trackedFileTypes = ['.ogg', '.mp3', '.wav', '.flac']; // .midi? Presets?

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
   // Read file for tracked audio files
   fs.readFile(path.join(app.getPath('userData'), 'trackedaudiofiles'), (err, data) =>
   {
      if (err)
      {
         // If file not found, no problem, just don't read from it
         if (err.code !== 'ENOENT')
         {
            console.error(err);
            return;
         }
      }
      // If no errors and file found, read file
      else
      {
         trackedAudioFiles = JSON.parse(data);
      }
   }
   );
}

// Update and save information about tracked folders and files
function SaveData()
{
   // Test stuff to write tothe file
   let testData = "More stuff";

   // Write file for tracked folders
   fs.writeFile(path.join(app.getPath('userData'), "trackedfolders"), testData, (err) =>
   {
      if (err)
      {
         console.error(err);
         return;
      }
   }
   );
}

// Get files from a specified folder
function GetFilesFromFolder(directory)
{
   // Read contents from a folder
   return fs.readdirSync(directory)
   // List items as the full path of the item
   .map(item =>
   {
      return path.join(directory, item);
   }
   // Filter to get the items that are files
   ).filter(item =>
   {
      return fs.lstatSync(item).isFile();
   }
   // Filter to get the itmes that are of tracked file types
   ).filter(function(file)
   {
      // Keep track of whether a file matches one of the tracked file types
      let condition = false;

      // Compare file to eachtracked file type
      for (let i = 0; i < trackedFileTypes.length; i++)
      {
         // If file matches successfully against any tracked file type, mark as successful check
         if (file.endsWith(trackedFileTypes[i]))
         {
            condition = true;
            break;
         }
      }

      // Return check
      return condition;
   }
   );
}

// Get folders in a specifiied folder
function GetFoldersFromFolder(directory)
{
   // Read contents from a folder
   return fs.readdirSync(directory)
   // List items as the full path of the item
   .map(item =>
   {
      return path.join(directory, item);
   }
   // Filter to get the items that are folders
   ).filter(item =>
   {
      return fs.lstatSync(item).isDirectory();
   }
   );
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

ipcMain.handle('folderDialogBox', () =>
{
   return GetFoldersFromDialog();
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
   //SaveData();
   //console.log(GetFilesFromFolder('G:/My Drive/Music Production/Samples/Custom/Basses'));
   //console.log(GetFoldersFromFolder('G:/My Drive/Music Production/Samples/Custom/'));
   dm.traverseAndParseFolder('G:/My Drive/Music Production/Samples/Custom/', true);

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