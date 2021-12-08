/*
   Singleton object that represents the manager that takes care of keeping track of the data this app uses, as well as interacting with it to keep it updated and fetch specific data from it
*/

// Dependencies
const fs          = require('fs');
const path        = require ('path');
const {FileObj}   = require("./file_obj");
const {FolderObj} = require("./folder_obj");

// Helper filename enum
const filenameEnum =
{
   meta:      "meta.json",
   files:     "filedata.json",
   folders:   "folderdata.json",
   tags:      "tagdata.json",
   groups:    "groupdata.json",
   libraries: "librarydata.json"
}

// Constructor
const DataManager = function (userDataPath)
{
   this.userDataPath = (userDataPath && userDataPath !== null) ? userDataPath : null;
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
}

// Set the user data path
DataManager.prototype.setUserDataPath = function (newPath)
{
   this.userDataPath = newPath;
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
   // Useful variables
   let duplicateID = false;
   let duplicatePath = false;
   let newID = -1;

   // Get a new ID and change it if it's already in use
   do
   {
      // Create ID for this file item
      newID = this.getNextID('file');

      // Check for already existing ID and/or path
      duplicateID = false;
      for (let i = 0; i < this.trackedFileData.length; i++)
      {
         // Test for duplicate ID
         if (newID === this.trackedFileData[i].id)
         {
            duplicateID = true;
         }

         // Test for duplicate path
         if (filename === this.trackedFileData[i].filename)
         {
            duplicatePath = true;
         }

         // If any duplicates found, break the loop
         if (duplicateID || duplicatePath)
         {
            break;
         }
      }

      // If duplicate path found, no need to worry about the ID anymore
      if (duplicatePath) return;
   }
   while (duplicateID);

   // Assuming at this point that the ID is good and the file is not already being tracked, add data to the list
   this.trackedFileData.push(new FileObj(newID, directoryID, filename, tags, group, library));
}

// Add a folder to the list
DataManager.prototype.addFolder = function(folder)
{
   this.trackedFolderData.push(folder);
}

// Add folder data to the list
DataManager.prototype.addFolderData = function(path, children, parentFolderID)
{
   // Useful variables
   let duplicateID = false;
   let duplicatePath = false;
   let newID = -1;

   // Get a new ID and change it if it's already in use
   do
   {
      // Create ID for this file item
      newID = this.getNextID('folder');
      let existingID = -1; // Store the ID of already existing entry if found

      // Check for already existing ID and/or path
      let duplicateID = false;
      for (let i = 0; i < this.trackedFolderData.length; i++)
      {
         // Test for duplicate ID
         if (newID === this.trackedFolderData[i].id)
         {
            duplicateID = true;
         }

         // Test for duplicate path
         if (path === this.trackedFolderData[i].path)
         {
            duplicatePath = true;
            existingID = this.trackedFolderData[i].id;
         }

         // If any duplicates found, break the loop
         if (duplicateID || duplicatePath)
         {
            break;
         }
      }

      // If duplicate path found, no need to worry about the ID anymore
      if (duplicatePath) return existingID;
   }
   while (duplicateID);

   // Assuming at this point that the ID is good and the folder is not already being tracked, add data to the list
   let newFolderObject = new FolderObj(newID, path, children);

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

// Check whether a folder path is being tracked
DataManager.prototype.isFolderPathBeingTracked = function(folderPath)
{
   // Loop through array searching for a matching folder path
   for (let i = 0; i < this.trackedFolderData.length; i++)
   {
      // If match found, stop the search and return true
      if (this.trackedFolderData[i].path === folderPath)
      {
         return true;
      }
   }

   // Loop ended, meaning no match was found, so return false
   return false;
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

   // Stop if something went wrong
   if (currentDirectoryID < 0) return;

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

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Save data
   this.saveData("file");
   this.saveData("folder");
}

// Read saved data to populate local data
DataManager.prototype.loadData = function()
{
   // Check that the user data path is good
   if (!this.userDataPath || this.userDataPath === null)
   {
      console.error("ERROR: User data path was not specified to Data Manager!");
      return;
   }

   // Read file for meta info
   fs.readFile(path.join(this.userDataPath, filenameEnum.meta), 'utf-8', (err, data) =>
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
         let metaInfo = JSON.parse(data);
         this.currentFileID = metaInfo.currentFileID;
         this.currentFolderID = metaInfo.currentFolderID;
         this.currentTagID = metaInfo.currentTagID;
         this.currentGroupID = metaInfo.currentGroupID;
         this.currentLibraryID = metaInfo.currentLibraryID;
      }
   }
   );

   // Read file for tracked audio files
   fs.readFile(path.join(this.userDataPath, filenameEnum.files), 'utf-8', (err, data) =>
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
         this.trackedFileData = JSON.parse(data);
      }
   }
   );

   // Read file for tracked folders
   fs.readFile(path.join(this.userDataPath, filenameEnum.folders), 'utf-8', (err, data) =>
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
         this.trackedFolderData = JSON.parse(data);
      }
   }
   );

   // Read file for tags data
   fs.readFile(path.join(this.userDataPath, filenameEnum.tags), 'utf-8', (err, data) =>
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
         this.trackedTagData = JSON.parse(data);
      }
   }
   );

   // Read file for group data
   fs.readFile(path.join(this.userDataPath, filenameEnum.groups), 'utf-8', (err, data) =>
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
         this.trackedGroupData = JSON.parse(data);
      }
   }
   );

   // Read file for library data
   fs.readFile(path.join(this.userDataPath, filenameEnum.libraries), 'utf-8', (err, data) =>
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
         this.trackedLibraryData = JSON.parse(data);
      }
   }
   );
}

// Update and save information about tracked folders and files
DataManager.prototype.saveData = function(type)
{
   // Check that the user data path is good
   if (!this.userDataPath || this.userDataPath === null)
   {
      console.error("ERROR: User data path was not specified to Data Manager!");
      return;
   }

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
         data = this.trackedFileData;
         break;
      
      case "folder":
         filename = filenameEnum.folders;
         data = this.trackedFolderData;
         break;
      
      case "tag":
         filename = filenameEnum.tags;
         data = this.trackedTagData;
         break;
      
      case "group":
         filename = filenameEnum.groups;
         data = this.trackedGroupData;
         break;
      
      case "library":
         filename = filenameEnum.libraries;
         data = this.trackedLibraryData;
         break;
   }

   // Continue if a valid type was successfully chosen
   if (!filename || !data) return;

   // Write file for the specified saved data
   fs.writeFile(path.join(this.userDataPath, filename), JSON.stringify(data), (err) =>
   {
      if (err)
      {
         console.error(err);
         return;
      }
   }
   );

   // Write some meta info as well
   let metaInfo = {
      "currentFileID": this.currentFileID,
      "currentFolderID": this.currentFolderID,
      "currentTagID": this.currentTagID,
      "currentGroupID": this.currentGroupID,
      "currentLibraryID": this.currentLibraryID
   };
   fs.writeFile(path.join(this.userDataPath, filenameEnum.meta), JSON.stringify(metaInfo), (err) =>
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