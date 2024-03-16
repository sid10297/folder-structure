import FolderTree from "./components/FolderTree";
import FolderContextProvider from "./contexts/FolderContextProvider";

const App = () => {
  return (
    <div className="container">
      <h2 className="header">Folder Management</h2>
      <div className="content-container">
        <FolderContextProvider>
          <FolderTree />
        </FolderContextProvider>
      </div>
    </div>
  );
};

export default App;
