/*
   Singleton object that represents the manager that takes care of keeping track of the data this app uses, as well as interacting with it to keep it updated and fetch specific data from it
*/

// Dependencies
const { FileObj } = require("./file_obj");
const { FolderObj } = require("./folder_obj");

// Constructor
const DataManager = function()
{
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
DataManager.prototype.getNextID(type)
{
   switch (type)
   {
      default:
         console.error("ERROR: Type of object to assign ID to is invalid!");
         break;
      
      case "file":
         return currentFileID++;
         break;
      
      case "folder":
         return currentFileID++;
         break;
      
      case "tag":
         return currentTagID++;
         break;
      
      case "group":
         return currentGroupID++;
         break;
      
      case "library":
         return currentLibraryID++;
         break;
   }
}

// Add a file to the list
DataManager.prototype.addFile = function(file)
{
   this.trackedFileData.push(file);
}

// Add file data to the list
DataManager.protytype.addFileData = function(filename, tags, group, library)
{
   this.trackedFileData.push(new FileObj(getNextID("file"), filename, tags, group, library));
}

// Add a folder to the list
DataManager.prototype.addFolder = function(folder)
{
   this.trackedFolderData.push(folder);
}

// Add folder data to the list
DataManager.protytype.addFolderData = function(path, children)
{
   this.trackedfolderData.push(new FolderObj(getNextID("folder"), path, children));
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