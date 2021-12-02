/*
   Singleton object that represents the manager that takes care of keeping track of the data this app uses, as well as interacting with it to keep it updated and fetch specific data from it
*/

// Dependencies
const fs = require('fs');
const path = require ('path');
const {FileObj} = require("./file_obj");
const {FolderObj} = require("./folder_obj");

// Helper filename enum
const filenameEnum =
{
   files: "filedata.json",
   folders: "folderdata.json",
   tags: "tagdata.json",
   groups: "groupdata.json",
   libraries: "librarydata.json"
}

// Constructor
const DataManager = function()
{
   this.trackedFileTypes = ['.ogg', '.mp3', '.wav', '.flac']; // .midi? Presets?

   this.trackedFileData    = [];
   this.trackedFolderData  = [];
   this.trackedTagData     = [];
   this.trackedGroupData   = [];
   this.trackedLibraryData = [];

   this.currentFileID    = 0;
   this.currentFolderID  = 0;
   this.currentTagID     = 0;
   this.currentGroupID   = 0;
   this.currentLibraryID = 0;

   // Load saved data from saved files
   // LoadSavedData();
}

// Get the next ID to be assigned
DataManager.prototype.getNextID = function(type)
{
   switch (type)
   {
      default:
         console.error("ERROR: Type of object to assign ID to is invalid!");
         break;
      
      case "file":
         return this.currentFileID++;
         break;
      
      case "folder":
         return this.currentFolderID++;
         break;
      
      case "tag":
         return this.currentTagID++;
         break;
      
      case "group":
         return this.currentGroupID++;
         break;
      
      case "library":
         return this.currentLibraryID++;
         break;
   }
}

// Add a file to the list
DataManager.prototype.addFile = function(file)
{
   this.trackedFileData.push(file);
}

// Add file data to the list
DataManager.prototype.addFileData = function(directoryID, filename, tags, group, library)
{
   this.trackedFileData.push(new FileObj(this.getNextID("file"), directoryID, filename, tags, group, library));
}

// Add a folder to the list
DataManager.prototype.addFolder = function(folder)
{
   this.trackedFolderData.push(folder);
}

// Add folder data to the list
DataManager.prototype.addFolderData = function(path, children, parentFolderID)
{
   // Create new folder object
   let newFolderObject = new FolderObj(this.getNextID("folder"), path, children);

   // Whteher or not to create folder data as children of an existent folder
   if (parentFolderID !== undefined && parentFolderID !== null && parentFolderID >= 0)
   {
      this.getFolderByID(parentFolderID).addChild(newFolderObject);
   }
   else
   {
      this.trackedFolderData.push(newFolderObject);
   }

   // Return the newly created ID
   return newFolderObject.id;
}

// Add a tag to the list
DataManager.prototype.addTag = function(tag)
{
   this.trackedTagData.push(tag);
}

// Add tag data to the list
// DataManager.protytype.addTagData = function(filename, tags, group, library)
// {
//    this.trackedFileData.push(new FileObj(getNextID("file"), filename, tags, group, library));
// }

// Add a group to the list
DataManager.prototype.addGroup = function(group)
{
   this.trackedGroupData.push(group);
}

// Add group data to the list
// DataManager.protytype.addGroupData = function(filename, tags, group, library)
// {
//    this.trackedFileData.push(new FileObj(getNextID("file"), filename, tags, group, library));
// }

// Add a library to the list
DataManager.prototype.addLibrary = function(library)
{
   this.trackedLibraryData.push(library);
}

// Add library data to the list
// DataManager.protytype.addLibraryData = function(filename, tags, group, library)
// {
//    this.trackedFileData.push(new FileObj(getNextID("file"), filename, tags, group, library));
// }

// Get a file from the list by id
DataManager.prototype.getFileByID = function(id)
{
   return this.trackedFileData.find(file =>
   {
      return file.id === id;
   }
   );
}

// Get a file from the list by name
DataManager.prototype.getFileByName = function(name)
{
   return this.trackedFileData.find(file =>
   {
      return file.name === name;
   }
   );
}

// Get multiple files from the list with the same name
DataManager.prototype.getFilesByName = function(name)
{
   return this.trackedFileData.filter(file =>
   {
      return file.name === name;
   }
   );
}

// Get a folder from the list by id
DataManager.prototype.getFolderByID = function(id)
{
   return this.trackedFolderData.find(folder =>
   {
      return folder.id === id;
   }
   );
}

// Get a folder from the list by name
DataManager.prototype.getFolderByName = function(name)
{
   return this.trackedFolderData.find(folder =>
   {
      return folder.name === name;
   }
   );
}

// Get multiple folders from the list with the same name
DataManager.prototype.getFoldersByName = function(name)
{
   return this.trackedFolderData.filter(folder =>
   {
      return folder.name === name;
   }
   );
}

// Get files from the list that are tracked under the smae specific folder
DataManager.prototype.getFilesByFolderID = function(folderID)
{
   return this.trackedFileData.filter(file =>
   {
      return file.folder === folderID;
   }
   );
}

// Get all relevant files in a folder
DataManager.prototype.getRelevantFilesInFolder = function(directory)
{
   // Read contents from a folder
   return fs.readdirSync(directory)

   // List items as the full path of the item
   .map(item =>
   {
      return path.join(directory, item);
   }
   )

   // Filter to get the items that are files
   .filter(item =>
   {
      return fs.lstatSync(item).isFile();
   }
   )

   // Filter to get the itmes that are of tracked file types
   .filter(file =>
   {
      // Keep track of whether a file matches one of the tracked file types
      let condition = false;

      // Compare file to eachtracked file type
      for (let i = 0; i < this.trackedFileTypes.length; i++)
      {
         // If file matches successfully against any tracked file type, mark as successful check
         if (file.endsWith(this.trackedFileTypes[i]))
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

// Parse a file's data and add it to the list
/*DataManager.prototype.parseAndInsertFileIntoList = function(file)
{
   this.addFileData(file);
}*/

// Get all folder paths in a folder
DataManager.prototype.getFoldersInFolder = function(directory)
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

// Traverse a folder and add folder and file data, include subfolders if the argument is true
DataManager.prototype.traverseAndParseFolder = function(directory, traverseSubFolders, parentDirectoryID)
{
   /*
      - Get current folder info
         - Folder path
         - Children paths --> Only if traverseSubFolders
      - Add folder to list
      - Get info of files in current folder
         - File paths
      - Add files to list
      - Recurse through children paths --> Only if traverseSubFolders
   */
   
   // Useful variables
   let subfolders = [];         // The folders inside this folder
   let files = [];              // The files inside this folder
   let currentDirectoryID = -1; // The created ID of this folder
   
   // If including subfolders, get paths of subfolders
   if (traverseSubFolders)
   {
      subfolders = this.getFoldersInFolder(directory);
   }

   // Add the current directory to the list of tracked folders
   if (parentDirectoryID !== undefined && parentDirectoryID !== null && parentDirectoryID >= 0)
   {
      // Use this if a parent directory ID was given, meaning this folder will be added as a child of another folder
      currentDirectoryID = this.addFolderData(directory, null, parentDirectoryID);
   }
   else
   {
      currentDirectoryID = this.addFolderData(directory);
   }

   // Get all relevant files in this folder
   files = this.getRelevantFilesInFolder(directory);
   
   // Add files found to the list of tracked files
   files.forEach(file =>
   {
      this.addFileData(currentDirectoryID, file);
   }
   );

   // If including subfolders, traverse through them
   if (traverseSubFolders)
   {
      subfolders.forEach(path =>
      {
         this.traverseAndParseFolder(path, true, currentDirectoryID);
      }
      );
   }
}

// Read saved data to populate local data
function LoadData()
{
   // Read file for tracked audio files
   fs.readFile(path.join(app.getPath('userData'), filenameEnum.files), (err, data) =>
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
         trackedFileData = JSON.parse(data);
      }
   }
   );

   // Read file for tracked folders
   fs.readFile(path.join(app.getPath('userData'), filenameEnum.folders), (err, data) =>
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
         trackedFolderData = JSON.parse(data);
      }
   }
   );

   // Read file for tags data
   fs.readFile(path.join(app.getPath('userData'), filenameEnum.tags), (err, data) =>
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
         trackedTagData = JSON.parse(data);
      }
   }
   );

   // Read file for group data
   fs.readFile(path.join(app.getPath('userData'), filenameEnum.groups), (err, data) =>
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
         trackedGroupData = JSON.parse(data);
      }
   }
   );

   // Read file for library data
   fs.readFile(path.join(app.getPath('userData'), filenameEnum.libraries), (err, data) =>
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
         trackedLibraryData = JSON.parse(data);
      }
   }
   );
}

// Update and save information about tracked folders and files
function SaveData(type)
{
   // Useful variables
   let filename;
   let data;

   // Figure out what is going to be saved
   switch (type)
   {
      default:
         break;
      
      case "file":
         filename = filenameEnum.files;
         data = trackedFileData;
         break;
      
      case "folder":
         filename = filenameEnum.folders;
         data = trackedFolderData;
         break;
      
      case "tag":
         filename = filenameEnum.tags;
         data = trackedTagData;
         break;
      
      case "group":
         filename = filenameEnum.groups;
         data = trackedGroupData;
         break;
      
      case "library":
         filename = filenameEnum.libraries;
         data = trackedLibraryData;
         break;
   }

   // Continue if a valid type was successfully chosen
   if (!filename || !data) return;

   // Write file for the specified saved data
   fs.writeFile(path.join(app.getPath('userData'), filename), data, (err) =>
   {
      if (err)
      {
         console.error(err);
         return;
      }
   }
   );
}

// Export the module
module.exports.DataManager = DataManager;