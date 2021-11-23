/*
   Singleton object that represents the manager that takes care of keeping track of the data this app uses, as well as interacting with it to keep it updated and fetch specific data from it
*/

// Dependencies
const fs = require('fs');
const path = require ('path');
const {FileObj} = require("./file_obj");
const {FolderObj} = require("./folder_obj");

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
DataManager.prototype.addFileData = function(filename, tags, group, library)
{
   this.trackedFileData.push(new FileObj(this.getNextID("file"), filename, tags, group, library));
}

// Add a folder to the list
DataManager.prototype.addFolder = function(folder)
{
   this.trackedFolderData.push(folder);
}

// Add folder data to the list
DataManager.prototype.addFolderData = function(path, children)
{
   this.trackedFolderData.push(new FolderObj(this.getNextID("folder"), path, children));
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
      file.id === id;
   }
   );
}

// Get a file from the list by name
DataManager.prototype.getFileByName = function(name)
{
   return this.trackedFileData.find(file =>
   {
      file.name === name;
   }
   );
}

// Get multiple files from the list with the same name
DataManager.prototype.getFilesByName = function(name)
{
   return this.trackedFileData.filter(file =>
   {
      file.name === name;
   }
   );
}

// Get a folder from the list by id
DataManager.prototype.getFolderByID = function(id)
{
   return this.trackedFolderData.find(folder =>
   {
      folder.id === id;
   }
   );
}

// Get a folder from the list by name
DataManager.prototype.getFolderByName = function(name)
{
   return this.trackedFolderData.find(folder =>
   {
      folder.name === name;
   }
   );
}

// Get multiple folders from the list with the same name
DataManager.prototype.getFoldersByName = function(name)
{
   return this.trackedFolderData.filter(folder =>
   {
      folder.name === name;
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
   // Filter to get the items that are files
   ).filter(item =>
   {
      return fs.lstatSync(item).isFile();
   }
   // Filter to get the itmes that are of tracked file types
   ).filter(file =>
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
DataManager.prototype.parseAndInsertFileIntoList = function(file)
{
   this.addFileData(file);
}

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
DataManager.prototype.traverseAndParseFolder = function(directory, traverseSubFolders)
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
   let subfolders = [];
   let files = [];
   
   // If including subfolders, get paths of subfolders
   if (traverseSubFolders)
   {
      subfolders = this.getFoldersInFolder(directory);
   }

   // Add the current directory to the list of tracked folders
   this.addFolderData(directory, subfolders);

   // Get all relevant files in this folder
   files = this.getRelevantFilesInFolder(directory);

   // Add files found to the list of tracked files
   files.forEach(file =>
   {
      this.addFileData(file);
   }
   );

   // If including subfolders, traverse through them
   if (traverseSubFolders)
   {
      subfolders.forEach(path =>
      {
         this.traverseAndParseFolder(path);
      }
      );
   }
}

// Export the module
module.exports.DataManager = DataManager;