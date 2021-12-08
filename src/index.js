const {contextBridge, ipcRenderer} = require('electron');

// Expose methods to renderer's window
contextBridge.exposeInMainWorld(
   "api",
   {
      // Get tracked folders data
      getFolders: async function()
      {
         let folders = await ipcRenderer.invoke('getFolders');
         // console.log(folders);
         return folders;
      },
      // Get tracked audio files data
      getAudioFiles: async function()
      {
         let audioFiles = await ipcRenderer.invoke('getAudioFiles');
         // console.log(audioFiles);
         return audioFiles;
      },
      getAudioFilesInFolder: async function(folderID)
      {
         let audioFiles = await ipcRenderer.invoke('getAudioFilesInFolder', folderID);
         // console.log(audioFiles);
         return audioFiles;
      },
      // Open fialog box to get folder paths and return whether the operation was successsful
      folderDialogBox: async function()
      {
         let success = await ipcRenderer.invoke('folderDialogBox');
         // console.log(success);
         return success;
      }
   }
);