// Testing new 'FileObj' object
var files = [
   new FileObj('/folder1/kick01.wav'),
   new FileObj('clap02.wav', ['drums', 'claps']),
   new FileObj('/folder2/break_loop.ogg', [], 'Loops'),
   new FileObj('/free_edm_sample_pack/wide_chords_fm', ['chords', 'fm', 'wav'], 'Chords', 'Free EDM Sample Pack')
];

// Test 'FileObj' methods

// FileObj.file + FileObj.filename
console.log("files[0].name\n" + files[0].name);

console.log("files[0].filename\n" + files[0].filename);

// FileObj.setFilename()
console.log("files[0].setFilename()\n" + files[0].setFilename());
console.log("files[0].filename\n" + files[0].filename);
console.log("files[0].name\n" + files[0].name);

console.log("files[0].setFilename('')\n" + files[0].setFilename(''));
console.log("files[0].filename\n" + files[0].filename);
console.log("files[0].name\n" + files[0].name);

console.log("files[0].setFilename('thisfile')\n" + files[0].setFilename('thisfile'));
console.log("files[0].filename\n" + files[0].filename);
console.log("files[0].name\n" + files[0].name);

// FileObj.tags
console.log("files[0].tags\n" + files[0].tags);

// FileObj.addTag()
console.log("files[0].addTag()\n" + files[0].addTag());
console.log("files[0].tags\n" + files[0].tags);

console.log("files[0].addTag('')\n" + files[0].addTag(''));
console.log("files[0].tags\n" + files[0].tags);

console.log("files[0].addTag('Stuff')\n" + files[0].addTag('Stuff'));
console.log("files[0].tags\n" + files[0].tags);

// FileObj.removeTag()
console.log("files[0].removeTag()\n" + files[0].removeTag());
console.log("files[0].tags\n" + files[0].tags);

console.log("files[0].removeTag('')\n" + files[0].removeTag(''));
console.log("files[0].tags\n" + files[0].tags);

console.log("files[0].removeTag('Stuff')\n" + files[0].removeTag('Stuff'));
console.log("files[0].tags\n" + files[0].tags);

console.log("files[0].removeTag('Tag')\n" + files[0].removeTag('Tag'));
console.log("files[0].tags\n" + files[0].tags);

// FileObj.group
console.log("files[0].group\n" + files[0].group);

// FileObj.setGroup()
console.log("files[0].setGroup()\n" + files[0].setGroup());
console.log("files[0].group\n" + files[0].group);

console.log("files[0].setGroup('')\n" + files[0].setGroup(''));
console.log("files[0].group\n" + files[0].group);

console.log("files[0].setGroup('This Group')\n" + files[0].setGroup('This Group'));
console.log("files[0].group\n" + files[0].group);

// FileObj.unsetGroup()
console.log("files[0].unsetGroup()\n" + files[0].unsetGroup());
console.log("files[0].group\n" + files[0].group);

// FileObj.library
console.log("files[0].library\n" + files[0].library);

// FileObj.setLibrary()
console.log("files[0].setLibrary()\n" + files[0].setLibrary());
console.log("files[0].library\n" + files[0].library);

console.log("files[0].setLibrary('')\n" + files[0].setLibrary(''));
console.log("files[0].library\n" + files[0].library);

console.log("files[0].setLibrary('That Library')\n" + files[0].setLibrary('That Library'));
console.log("files[0].library\n" + files[0].library);

// FileObj.unsetLibrary()
console.log("files[0].unsetLibrary()\n" + files[0].unsetLibrary());
console.log("files[0].library\n" + files[0].library);