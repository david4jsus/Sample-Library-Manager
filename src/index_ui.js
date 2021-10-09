// Load React components on window load
window.onload = () =>
{
   // Main React component
   class MainView extends React.Component
   {
      render()
      {
         return[
            React.createElement("h1", null, "Sample Library Manager")
         ];
      }
   }

   // Main rendering function
   ReactDOM.render(
      React.createElement(MainView, null),
      document.getElementById("main_view")
   );
}