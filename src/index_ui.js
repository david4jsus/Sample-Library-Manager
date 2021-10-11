// Load React components on window load
window.onload = () =>
{
   // Main React component
   class MainView extends React.Component
   {
      constructor(props)
      {
         super(props);
         this.state = {
            view: Views.ABOUT
         }
      }

      render()
      {
         // Get the corresponding view
         let view = null;
         switch (this.state.view)
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
            view
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
            React.createElement("h1", null, "SLM: Folders")
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
            React.createElement("h1", null, "SLM: About")
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

   // Main rendering function
   ReactDOM.render(
      React.createElement(MainView, null),
      document.getElementById("main_view")
   );
}