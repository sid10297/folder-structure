import { useState } from "react";
import Folder from "./components/FolderTree";
import FOLDER_DATA from "./data/folder";
import useTraverseFolder from "./hooks/useTraverseFolder";

const App = () => {
  const [folderData, setFolderData] = useState(FOLDER_DATA);

  const { insertNode, renameNode, deleteNode, changeColor } =
    useTraverseFolder();

  const handleInsert = (folderId, isFolder, name) => {
    setFolderData((prevData) => insertNode(prevData, folderId, name, isFolder));
  };

  const handleRename = (folderId, isFolder, updatedName) => {
    setFolderData((prevData) =>
      renameNode(prevData, folderId, updatedName, isFolder)
    );
  };

  const handleDelete = (folderId) => {
    setFolderData((prevData) => deleteNode(prevData, folderId));
  };

  const handleColorChange = (folderId, isFolder, updatedColor) => {
    setFolderData((prevData) =>
      changeColor(prevData, folderId, updatedColor, isFolder)
    );
  };

  return (
    <div className="container">
      <h2 className="header">Folder Management</h2>
      <Folder
        folderData={folderData}
        handleInsert={handleInsert}
        handleRename={handleRename}
        handleDelete={handleDelete}
        handleColorChange={handleColorChange}
      />
    </div>
  );
};

export default App;
