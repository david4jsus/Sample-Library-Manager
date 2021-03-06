// Load React components on window load
window.onload = () =>
{
   // Enum to keep track fo what tab the user is in
   var Views =
   {
      FOLDERS: "folders",
      LIBRARIES: "libraries",
      TAGS: "tags",
      GROUPS: "groups",
      SEARCH: "search",
      ABOUT: "about",
      SETTINGS: "settings"
   };

   // Main React component
   class MainView extends React.Component
   {
      constructor(props)
      {
         super(props);
         this.state = {
            view: Views.ABOUT
         }
         this.changeTabView = this.changeTabView.bind(this);
      }

      // Change the tab view
      changeTabView(newView)
      {
         this.setState({view: newView});
      }

      render()
      {
         return[
            React.createElement(Sidebar, {changeTabView: this.changeTabView}),
            React.createElement(TabView, {view: this.state.view}),
            React.createElement(SelectedSample, null)
         ];
      }
   }

   // Sidebar
   class Sidebar extends React.Component
   {
      render()
      {
         return[
            React.createElement("div", {className: "sidebar"},
               React.createElement("div", {className: "category-links"},
                  React.createElement("a", {id: "folders_link", href: "#", onClick: () => this.props.changeTabView(Views.FOLDERS)}, "Folders"),
                  React.createElement("a", {id: "libraries_link", href: "#", onClick: () => this.props.changeTabView(Views.LIBRARIES)}, "Libraries"),
                  React.createElement("a", {id: "tags_link", href: "#", onClick: () => this.props.changeTabView(Views.TAGS)}, "Tags"),
                  React.createElement("a", {id: "groups_link", href: "#", onClick: () => this.props.changeTabView(Views.GROUPS)}, "Groups"),
                  React.createElement("a", {id: "search_link", href: "#", onClick: () => this.props.changeTabView(Views.SEARCH)}, "Search")
               ),
               React.createElement("div", {className: "app-links"},
                  React.createElement("a", {id: "about_link", href: "#", onClick: () => this.props.changeTabView(Views.ABOUT)}, "About"),
                  React.createElement("a", {id: "settings_link", href: "#", onClick: () => this.props.changeTabView(Views.SETTINGS)}, "Settings")
               )
            )
         ];
      }
   }

   // Main view
   class TabView extends React.Component
   {
      render()
      {
         // Get the corresponding view
         let view = null;
         switch (this.props.view)
         {
            default:
            case Views.FOLDERS:
               view = React.createElement(FoldersView, null);
               break;
            case Views.LIBRARIES:
               view = React.createElement(LibrariesView, null);
               break;
            case Views.TAGS:
               view = React.createElement(TagsView, null);
               break;
            case Views.GROUPS:
               view = React.createElement(GroupsView, null);
               break;
            case Views.SEARCH:
               view = React.createElement(SearchView, null);
               break;
            case Views.ABOUT:
               view = React.createElement(AboutView, null);
               break;
            case Views.SETTINGS:
               view = React.createElement(SettingsView, null);
               break;
         }

         // Render the corresponding view
         return[
            React.createElement("div", {id: "main_view", className: "main"},
               view
            )
         ];
      }
   }

   // "Folders" view
   class FoldersView extends React.Component
   {
      constructor(props)
      {
         super(props);
         this.state = {
            selectedFolder: -1
         };
         this.selectFolderID = this.selectFolderID.bind(this);
      }

      selectFolderID(folderID)
      {
         this.setState({selectedFolder: folderID});
      }

      render()
      {
         return[
            React.createElement(FolderStructureView, {selectFolder: this.selectFolderID}),
            React.createElement(FolderContentsView, {selectedFolder: this.state.selectedFolder})
         ];
      }
   }

   // Folder structure view for FoldersView
   class FolderStructureView extends React.Component
   {
      constructor(props)
      {
         super(props);
         this.state =
         {
            folderData: null
         }
      }

      componentDidMount()
      {
         // Get list of tracked folders
         api.getFolders().then(data =>
         {
            this.setState({folderData: data});
         }
         )

         // Get errors, if any
         .catch(err =>
         {
            console.error(err);
         }
         );
      }

      render()
      {
         // Create usable list for React component if the folders have been loaded
         let folders_list = [];
         if (this.state.folderData !== null)
         {
            folders_list = this.state.folderData.map((folder) => {
               return React.createElement(FolderComponent, {key: folder.id, folder: folder, selectFolder: this.props.selectFolder});
            }
            );
         }

         // Check whether there are any folders
         if (folders_list.length === 0)
         {
            folders_list = "No folders are currently being tracked";
         }

         // If component still hasn't fetched folders, notify user
         let result = this.state.folders === null ? "Loading..." : folders_list;
         
         return[
            React.createElement("div", {className: "folder-structure-view"}, result)
         ];
      }
   }

   // View for the list of items in a folder
   class FolderContentsView extends React.Component
   {
      constructor(props)
      {
         super(props);
         this.state = {
            fileData: null
         }
      }

      componentDidMount()
      {
         // Get list of tracked files in a folder, if folder specified
         if (this.props.selectedFolder >= 0)
         {
            api.getAudioFilesInFolder(this.props.selectedFolder).then(data =>
            {
               this.setState({fileData: data});
            }
            )

            // Get errors, if any
            .catch(err =>
            {
               console.error(err);
            }
            );
         }
      }

      componentDidUpdate(prevProps)
      {
         // Continue only if props haven't changed
         if (this.props.selectedFolder === prevProps.selectedFolder)
         {
            return;
         }

         // Get list of tracked files in a folder, if folder specified
         if (this.props.selectedFolder >= 0)
         {
            api.getAudioFilesInFolder(this.props.selectedFolder).then(data =>
            {
               this.setState({fileData: data});
            }
            )

            // Get errors, if any
            .catch(err =>
            {
               console.error(err);
            }
            );
         }
      }

      render()
      {
         // Create usable list for React component if the files have been loaded
         let files_list = [];
         if (this.state.fileData !== null)
         {
            files_list = this.state.fileData.map((item) =>
            {
               return React.createElement(FileComponent, {key: item.id, name: item.name, tags: item.tags, group: item.group, library: item.library});
            }
            );
         }

         return[
            React.createElement("div", {className: "folder-contents-view"}, files_list)
         ];
      }
   }

   // "Libraries" view
   class LibrariesView extends React.Component
   {
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement(LibraryListView, null),
            React.createElement(LibraryContentsView, null)
         ];
      }
   }

   // View for the list of libraries
   class LibraryListView extends React.Component
   {
      render()
      {
         // Will need a list of libraries to track here
         let testLibraries = ["Neuro Basses", "Heavenly Strings", "Magma Sample Pack"];
         let testLibraries_list = testLibraries.map((item, index) =>
         {
            return React.createElement("li", {key: index}, item);
         }
         );

         return[
            React.createElement("ul", {className: "library-list-view"}, testLibraries_list)
         ];
      }
   }

   // View for the list of items in a library
   class LibraryContentsView extends React.Component
   {
      render()
      {
         // Will need a list of contents of the library here
         let testItems = [
            {id: 637, name: "GrainyBass03.wav", tags: ["bass", "processed"], group: "Basses", library: "Basses Pack"},
            {id: 527, name: "SerumDistortedSquare.wav", tags: ["bass", "serum"], group: "Basses", library: "Free Serum Basses"},
            {id: 829, name: "NeuroFire13.ogg", tags: ["bass", "processed"], group: "Basses", library: "Awesome Dubstep Basses"}
         ];
         let testItems_list = testItems.map((item, index) =>
         {
            return React.createElement(FileComponent, {key: index, name: item.name, tags: item.tags, group: item.group, library: item.library});
         }
         );

         return[
            React.createElement("ul", {className: "library-contents-view"}, testItems_list)
         ];
      }
   }

   // "Tags" view
   class TagsView extends React.Component
   {
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement(TagListView, null),
            React.createElement(TagContentsView, null)
         ];
      }
   }

   // View for the list of tags
   class TagListView extends React.Component
   {
      render()
      {
         // Will need the list of tags here
         let testTags = ["Loop", "Pad", "Lead"];
         let testTags_list = testTags.map((tag, index) => {
            return React.createElement("li", {key: index}, tag);
         }
         );

         return[
            React.createElement("div", {className: "tag-list-view"},
               React.createElement("input", {type: "text", placeholder: "Search tag..."}),
               React.createElement("button", null, "Add tag"),
               React.createElement("ul", null, testTags_list)
            )
         ];
      }
   }

   // View for the list of items tagged with a specific tag
   class TagContentsView extends React.Component
   {
      render()
      {
         // Will need the items tagged with a specified tag here
         let testItems = [
            {id: 136, name: "DnBHats174.wav", tags: ["hats", "drums"], group: "Drums", library: "Loops Pack"},
            {id: 358, name: "BreakLoop130.wav", tags: ["loop", "drums"], group: "Drums", library: "Free DnB Breaks"},
            {id: 947, name: "GuitarEm.ogg", tags: ["loop", "melodic"], group: "Guitars", library: "Awesome EDM Loops"}
         ];
         let testItems_list = testItems.map((item, index) =>
         {
            return React.createElement(FileComponent, {key: index, name: item.name, tags: item.tags, group: item.group, library: item.library});
         }
         );

         return [
            React.createElement("ul", {className: "tag-contents-view"}, testItems_list)
         ];
      }
   }

   // "Groups" view
   class GroupsView extends React.Component
   {
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement(GroupListView, null),
            React.createElement(GroupContentsView, null)
         ];
      }
   }

   // View for the list of groups
   class GroupListView extends React.Component
   {
      render()
      {
         // Will need the list of groups here
         let testGroups = ["Collab Project", "Soundtrack", "SFX"];
         let testGroups_list = testGroups.map((group, index) => {
            return React.createElement("li", {key: index}, group);
         }
         );

         return[
            React.createElement("div", {className: "group-list-view"},
               React.createElement("input", {type: "text", placeholder: "Search group..."}),
               React.createElement("button", null, "Add group"),
               React.createElement("ul", null, testGroups_list)
            )
         ];
      }
   }

   // View for the list of items in a group
   class GroupContentsView extends React.Component
   {
      render()
      {
         // Will need the items in a specified group here
         let testItems = [
            {id: 432, name: "RenderStem03.wav", tags: ["renders", "stems"], group: "Collab Project"},
            {id: 462, name: "LongCrash05.wav", tags: ["crash", "drums"], group: "Collab Project"},
            {id: 820, name: "VoxVerse2.wav", tags: ["vocals", "stems"], group: "Collab Project"}
         ];
         let testItems_list = testItems.map((item, index) =>
         {
            return React.createElement(FileComponent, {key: index, name: item.name, tags: item.tags, group: item.group, group: item.library});
         }
         );

         return [
            React.createElement("ul", {className: "group-contents-view"}, testItems_list)
         ];
      }
   }

   // "Search" view
   class SearchView extends React.Component
   {
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement(SearchBarView, null),
            React.createElement(SearchContentsView, null)
         ];
      }
   }

   // View for the search bar on the search tab
   class SearchBarView extends React.Component
   {
      render()
      {
         return[
            React.createElement("div", {className: "search-bar-view"},
               React.createElement("input", {type: "text", placeholder: "Search..."}),
               React.createElement("div", null, "Search options here...")
            )
         ];
      }
   }

   class SearchContentsView extends React.Component
   {
      render()
      {
         // Need search results here
         let testResults = [
            {id: 223, name: "Lead03.wav", tags: ["leads", "melodic"], group: "Melodic Loops", library: "Free Melodic Loops"},
            {id: 182, name: "StemLeadDry.wav", tags: ["leads", "stems"], group: "Collab Project"},
            {id: 628, name: "GrittyLeadFm.wav", tags: ["leads", "fm"], group: "Melodic Loops", library: "Free Melodic Loops"}
         ];
         let testResults_list = testResults.map((item, index) =>
         {
            return React.createElement(FileComponent, {key: index, name: item.name, tags: item.tags, group: item.group, library: item.library});
         }
         );

         return[
            React.createElement("ul", {className: "search-contents-view"}, testResults_list)
         ];
      }
   }

   // "About" view
   class AboutView extends React.Component
   {
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement("h1", null, "Sample Library Manager"),
            React.createElement("p", null, "Click on a tab to get started!"),
            React.createElement("p", null, "With this app, you can organize your samples in different ways and then click and drag your selected sample right onto your DAW or sound editing program.")
         ];
      }
   }

   // "Settings" view
   class SettingsView extends React.Component
   {
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement("h1", null, "SLM: Settings"),
            React.createElement("p", null, "Settings will appear here... evetually...")
         ];
      }
   }

   // View for the selected sample
   class SelectedSample extends React.Component
   {
      render()
      {
         return[
            React.createElement("div", {id: "sample_view", className: "sample"},
               React.createElement("h1", null, "[Selected sample here]")
            )
         ];
      }
   }

   // A file to be listed
   class FileComponent extends React.Component
   {
      render()
      {
         // Make each area a bit more presentable

         let tagsText = this.props.tags === [] ? "[Add tags]" : "";
         if (tagsText === "")
         {
            for (let i = 0; i < this.props.tags.length; i++)
            {
               if (i == this.props.tags.length - 1)
               {
                  tagsText += this.props.tags[i];
               }
               else
               {
                  tagsText += this.props.tags[i] + ", ";
               }
            }
         }

         let groupText = this.props.group === null ? "[Add to a group]" : this.props.group;

         let libraryText = this.props.library === null ? "[Add to a library]" : this.props.library;

         return[
            React.createElement("div", {className: "file-component"},
               React.createElement("span", null, this.props.name),
               React.createElement("span", null, tagsText),
               React.createElement("span", null, groupText),
               React.createElement("span", null, libraryText)
            )
         ];
      }
   }

   // Folder component that shows a folder structure (needs to be passed a root folder object in its props)
   class FolderComponent extends React.Component
   {
      constructor(props)
      {
         super(props);
         this.state =
         {
            open: false
         };
         this.open = this.open.bind(this);
         this.close = this.close.bind(this);
         this.toggleOpen = this.toggleOpen.bind(this);
         this.handleClick = this.handleClick.bind(this);
      }

      // Open the folder to reveal any children folders
      open()
      {
         this.setState({open: true});
      }

      // Close the folder to hide any children folders
      close()
      {
         this.setState({open: false});
      }

      toggleOpen()
      {
         if (this.state.open)
         {
            this.close();
         }
         else
         {
            this.open();
         }
      }

      handleClick()
      {
         this.toggleOpen();
         this.props.selectFolder(this.props.folder.id);
      }

      render()
      {
         // Open/close icon (only if the folder has children folders)
         let ocIcon = "";
         
         // Whether the children folders show
         let cssClass = "";

         // List of child folder components
         let childrenList = [];

         // Check whether this folder has any child folders
         if (this.props.folder.children.length > 0)
         {
            // Update open/close icon
            ocIcon = this.state.open ? "v " : "> ";

            // Update children CSS
            cssClass = this.state.open ? "": "folder-component-hide";

            // Create child folder components
            this.props.folder.children.forEach((subfolder) =>
            {
               childrenList.push(React.createElement(FolderComponent, {folder: subfolder, selectFolder: this.props.selectFolder}));
            }
            )
         }

         return[
            React.createElement("div", {className: "folder-component"},
               React.createElement("span", {onClick: this.handleClick}, ocIcon + this.props.folder.name),
               React.createElement("div", {className: cssClass}, childrenList)
            )
         ];
      }
   }

   // Main rendering function
   ReactDOM.render(
      React.createElement(MainView, null),
      document.getElementById("react")
   );
}