import { useState } from "react";
import Folder from "./components/Folder";
import FOLDER_DATA from "./data/folder";
import useTraverseFolder from "./hooks/useTraverseFolder";

const App = () => {
  const [folderData, setFolderData] = useState(FOLDER_DATA);
  const { insertNode, renameNode, deleteNode } = useTraverseFolder();

  function handleInsert(folderId, isFolder, name) {
    const updatedFolderStructure = insertNode(
      folderData,
      folderId,
      name,
      isFolder
    );

    setFolderData(updatedFolderStructure);
  }

  function handleRename(folderId, isFolder, updatedName) {
    const updatedFolderStructure = renameNode(
      folderData,
      folderId,
      updatedName,
      isFolder
    );

    setFolderData(updatedFolderStructure);
  }

  function handleDelete(folderId) {
    const updatedFolderStructure = deleteNode(folderData, folderId);

    setFolderData(updatedFolderStructure);
  }

  return (
    <div>
      <h2>Folder Structure Management</h2>
      <Folder
        folderData={folderData}
        handleInsertDataToTree={handleInsert}
        handleRename={handleRename}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
