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

/*getAudioFiles().then((data) =>
{
   console.log(data);
}//, (handle not receiving data) => {}
);*/