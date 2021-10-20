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
      /*constructor(props)
      {
         super(props);
         this.state = {};
      }*/

      render()
      {
         return[
            React.createElement(FolderStructureView, null),
            React.createElement(FolderContentsView, null)
         ];
      }
   }

   // Folder structure view for FoldersView
   class FolderStructureView extends React.Component
   {
      render()
      {
         // Will need a list of folders to track here
         let testFolders = ["Kicks", "Hats", "Snares"];
         let testFolders_list = testFolders.map((folder, index) => {
            return React.createElement("li", {key: index}, folder);
         }
         );
         
         return[
            React.createElement("ul", {className: "folder-structure-view"}, testFolders_list)
         ];
      }
   }

   // View for the list of items in a folder
   class FolderContentsView extends React.Component
   {
      render()
      {
         // Will need a list of the contents of the folder here
         let testItems = [
            new FileObj("Kick02.wav", ["kicks", "drums"], "Drums", "Free Kicks Sample Pack"),
            new FileObj("KickDry.wav", ["kicks", "drums"], "Drums", "Free Kicks Sample Pack"),
            new FileObj("BDrumBoom.ogg", ["kicks", "drums"], "Drums", "Awesome EDM Kicks")
         ];
         let testItems_list = testItems.map((item, index) =>
         {
            return React.createElement(FileComponent, {key: index, name: item.name, tags: item.tags, group: item.group, library: item.library});
         }
         );

         return[
            React.createElement("div", {className: "folder-contents-view"}, testItems_list)
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
            new FileObj("GrainyBass03.wav", ["bass", "processed"], "Basses", "Basses Pack"),
            new FileObj("SerumDistortedSquare.wav", ["bass", "serum"], "Basses", "Free Serum Basses"),
            new FileObj("NeuroFire13.ogg", ["bass", "processed"], "Basses", "Awesome Dubstep Basses")
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
            new FileObj("DnBHats174.wav", ["hats", "drums"], "Drums", "Loops Pack"),
            new FileObj("BreakLoop130.wav", ["loop", "drums"], "Drums", "Free DnB Breaks"),
            new FileObj("GuitarEm.ogg", ["loop", "melodic"], "Guitars", "Awesome EDM Loops")
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
            new FileObj("RenderStem03.wav", ["renders", "stems"], "Collab Project"),
            new FileObj("LongCrash05.wav", ["crash", "drums"], "Collab Project"),
            new FileObj("VoxVerse2.wav", ["vocals", "stems"], "Collab Project")
         ];
         let testItems_list = testItems.map((item, index) =>
         {
            return React.createElement(FileComponent, {key: index, name: item.name, tags: item.tags, group: item.group, library: item.library});
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
            new FileObj("Lead03.wav", ["leads", "melodic"], "Melodic Loops", "Free Melodic Loops"),
            new FileObj("StemLeadDry.wav", ["leads", "stems"], "Collab Project"),
            new FileObj("GrittyLeadFm.wav", ["leads", "fm"], "Melodic Loops", "Free Melodic Loops")
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

   // Main rendering function
   ReactDOM.render(
      React.createElement(MainView, null),
      document.getElementById("react")
   );
}