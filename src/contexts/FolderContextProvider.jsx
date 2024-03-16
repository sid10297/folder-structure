import { useState } from "react";
import useTraverseFolder from "../hooks/useTraverseFolder";
import FOLDER_DATA from "../data/folder";
import { FolderContext } from "./FolderContext";

const FolderContextProvider = ({ children }) => {
  const [folderData, setFolderData] = useState(FOLDER_DATA);
  const [currentFolder, setCurrentFolder] = useState([]);

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

  const getCurrentFolder = (currentFolder) => {
    console.log(currentFolder);
    setCurrentFolder(currentFolder);
  };

  return (
    <FolderContext.Provider
      value={{
        folderData,
        handleInsert,
        handleColorChange,
        handleDelete,
        handleRename,
        getCurrentFolder,
        currentFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderContextProvider;
