import { useState } from "react";
import useTraverseFolder from "../hooks/useTraverseFolder";
import FOLDER_DATA from "../data/folder";
import { FolderContext } from "./FolderContext";

const FolderContextProvider = ({ children }) => {
  // * creating values for the folder context
  const [folderData, setFolderData] = useState(FOLDER_DATA);
  const [currentFolder, setCurrentFolder] = useState([]);

  // * getting these functions from custom hook
  const { insertNode, renameNode, deleteNode, changeColor } =
    useTraverseFolder();

  // * all the CRUD operations calling the functions from custom hook
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

  // TODO: this would help me creating the directory UI for Explorer Component
  const getCurrentFolder = (currentFolder) => {
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
