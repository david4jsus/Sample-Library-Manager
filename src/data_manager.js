/*
   Singleton object that represents the manager that takes care of keeping track of the data this app uses, as well as interacting with it to keep it updated and fetch specific data from it
*/

// Constructor
const DataManager = function()
{
   this.trackedFileData = [];
   this.trackedFolderData = [];
   this.tagData = [];
   this.groupData = [];
   this.trackedLibraryData = [];

   // Load saved data from saved files
   // LoadSavedData();
}