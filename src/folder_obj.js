/*
   Object that represents a folder that will be listed as part of a folder structure
*/

// Constructor
const FolderObj = function(id, path, children)
{
   this.id = id;
   this.path = path;
   this.name = path;
   if (children && children !== null)
   {
      this.children = children;
   }
   else
   {
      this.children = [];
   }
}

// Set the ID of the folder (DISCOURAGED)
FolderObj.prototype.setID = function(newID)
{
   // Make sure the new ID is not empty
   if (newID && newID !== "")
   {
      this.id = newID;
   }
}

// Change the name of the folder
FolderObj.prototype.setName = function(newName)
{
   // Make sure name is not empty
   if (newName &&  newName !== "")
   {
      this.name = newName;
   }
}

// Add a child folder
FolderObj.prototype.addFolder = function(newChild)
{
   this.children.push(newChild);
}

// Remove a child folder
FolderObj.prototype.removeFolderByName = function(childName)
{
   // Look for the child folder to remove based on the given folder name
   let childIndex = this.children.findIndex((childFolder) =>
   {
      childFolder.name === childName;
   }
   );

   // Continue if the child folder was found
   if (childIndex >= 0)
   {
      this.children.splice(childIndex, 1);
   }
}

// Export the module
module.exports.FolderObj = FolderObj;