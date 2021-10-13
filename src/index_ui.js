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
                  React.createElement("a", {id: "groups_link", href: "#", onClick: () => this.props.changeTabView(Views.GROUPS)}, "Groups")
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
         let testItems = ["Kick02.wav", "KickDry.wav", "BDrumBoom.ogg"];
         let testItems_list = testItems.map((item, index) =>
         {
            return React.createElement("li", {key: index}, item);
         }
         );

         return[
            React.createElement("ul", {className: "folder-contents-view"}, testItems_list)
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
            React.createElement("h1", null, "SLM: Libraries")
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
            React.createElement("h1", null, "SLM: Tags")
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
            React.createElement("h1", null, "SLM: Groups")
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
            React.createElement("h1", null, "SLM: Settings")
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

   // Main rendering function
   ReactDOM.render(
      React.createElement(MainView, null),
      document.getElementById("react")
   );
}