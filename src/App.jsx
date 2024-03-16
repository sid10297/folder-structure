import Folder from "./components/FolderTree";
import Explorer from "./components/Explorer";
import FolderContextProvider from "./contexts/FolderContextProvider";

const App = () => {
  return (
    <div className="container">
      <h2 className="header">Folder Management</h2>
      <div className="content-container">
        <FolderContextProvider>
          <Folder />
          <Explorer />
        </FolderContextProvider>
      </div>
    </div>
  );
};

export default App;
