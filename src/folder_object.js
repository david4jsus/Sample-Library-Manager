/*
   Object that represents a folder that will be listed as part of a folder structure
*/

// Constructor
const FolderObj = function(name, children)
{
   this.name = name;
   if (children && children !== null)
   {
      this.children = children;
   }
   else
   {
      this.children = [];
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