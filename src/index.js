const {ipcRenderer} = require('electron');

async function getFolders()
{
   let folders = await ipcRenderer.invoke('getFolders');
   // console.log(folders);
   return folders;
}

async function getAudioFiles()
{
   let audioFiles = await ipcRenderer.invoke('getAudioFiles');
   // console.log(audioFiles);
   return audioFiles;
}

async function folderDialogBox()
{
   //let folderPaths = [];
   return await ipcRenderer.invoke('folderDialogBox');
   //return folderPaths;
}

/*getAudioFiles().then(data =>
{
   console.log(data);
}//, (handle not receiving data) => {}
);*/

/*folderDialogBox().then(folderPaths =>
{
   console.log(folderPaths);
}//, (handle not receiving data) => {}
);*/