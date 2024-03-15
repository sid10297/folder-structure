import { useState } from "react";
import Folder from "./components/Folder";
import FOLDER_DATA from "./data/folder";
import useTraverseFolder from "./hooks/useTraverseFolder";

const App = () => {
  const [folderData, setFolderData] = useState(FOLDER_DATA);
  const { insertNode } = useTraverseFolder();

  console.log(folderData);

  function handleInsert(folderId, isFolder, name) {
    const updatedFolderStructure = insertNode(
      folderData,
      folderId,
      name,
      isFolder
    );

    setFolderData(updatedFolderStructure);
  }

  function handleRename(...args) {
    console.log(args);
  }

  return (
    <div>
      <h2>Folder Structure Management</h2>
      <Folder
        folderData={folderData}
        handleInsertDataToTree={handleInsert}
        handleRename={handleRename}
      />
    </div>
  );
};

export default App;
