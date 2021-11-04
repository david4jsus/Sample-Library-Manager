const {ipcRenderer} = require('electron');

async function test()
{
   let data = await ipcRenderer.invoke('test');
   console.log(data);
}

test();