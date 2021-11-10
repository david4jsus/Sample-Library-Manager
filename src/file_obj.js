/*
   Object that represents a file that will be listed in the app and interacted with in the "selected sample" view
*/

// Constructor
const FileObj = function(id, filename, tags, group, library)
{
   this.id = id;
   this.filename = filename;
   this.name = filename;
   this.tags = tags ? tags : [];
   this.group = group ? group : null;
   this.library = library ? library : null;
}

// Set the ID of the file (NOT RECOMMENDED TO USE, BETTER TO ASSIGN AN ID ON OBJECT CREATION)
FileObj.prototype.setID = function(newID)
{
   // Make sure the new ID is not empty
   if (newID && newID !== "")
   {
      this.id = newID;
   }
}

// Change the filename of the file
FileObj.prototype.setFilename = function(newFilename)
{
   // Make sure filename is not empty
   if (newFilename && newFilename !== "")
   {
      this.filename = newFilename;
   }
}

// Add a tag to the file
FileObj.prototype.addTag = function(newTag)
{
   // Make sure tag is not empty
   if (newTag && newTag !== "")
   {
      this.tags.push(newTag);
   }
}

// Remove a tag from the file
FileObj.prototype.removeTag = function(tag)
{
   // Make sure tag is not empty
   if (tag && tag !== "")
   {
      let tagIndex = this.tags.indexOf(tag);

      // Make sure tag was found
      if (tagIndex !== -1)
      {
         this.tags.splice(tagIndex, 1);
      }
   }
}

// Set the group of a file
FileObj.prototype.setGroup = function(newGroup)
{
   // Make sure group is not empty
   if (newGroup && newGroup !== "")
   {
      this.group = newGroup;
   }
}

// Unset the group of a file
FileObj.prototype.unsetGroup = function()
{
   this.group = null;
}

// Set the library that the file belongs to
FileObj.prototype.setLibrary = function(newLibrary)
{
   // Make sure library is not empty
   if (newLibrary && newLibrary !== "")
   {
      this.library = newLibrary;
   }
}

// Set the file to not belong to any libraries
FileObj.prototype.unsetLibrary = function()
{
   this.library = null;
}