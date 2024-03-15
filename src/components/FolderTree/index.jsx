import { useState } from "react";
import { GiCancel } from "react-icons/gi";

import { validateFileName } from "../../helpers";
import { FaSave } from "react-icons/fa";
import Button from "../Button";
import FolderItem from "./FolderItem";
import ColorInput from "../ColorInput";
import TextInput from "../TextInput";
import FileItem from "./FileItem";

const INITIAL_STATE = {
  visible: false,
  isFolder: false,
};

const Folder = ({
  folderData,
  handleInsert,
  handleRename,
  handleDelete,
  handleColorChange,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTextInput, setShowTextInput] = useState(INITIAL_STATE);
  const [showColorInput, setShowColorInput] = useState(INITIAL_STATE);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInputValue, setRenameInputValue] = useState("");
  const [colorInputValue, setColorInputValue] = useState(() =>
    getInitialColor(folderData)
  );

  function getInitialColor(folderData) {
    return folderData.color ? folderData : "#000000";
  }

  function handleInitiateInsert(event, isFolder) {
    event.stopPropagation();
    setIsExpand(true);
    setShowTextInput({
      visible: true,
      isFolder,
    });
  }

  function handleInitiateRename(event, folderData, isFolder) {
    event.stopPropagation();
    isFolder && setIsExpand(true);
    setIsRenaming(true);
    setRenameInputValue(folderData.name);
    setShowTextInput({
      visible: true,
      isFolder,
    });
  }

  function handleInitiateColorChange(event, folderData, isFolder) {
    event.stopPropagation();
    isFolder && setIsExpand(true);
    setShowColorInput({
      visible: true,
      isFolder,
    });
  }

  function onAdd({ keyCode, target }) {
    if (keyCode === 13 && target.value) {
      const isValidName = validateFileName(target.value);
      if (!isValidName && !showTextInput.isFolder) return;
      handleInsert(folderData.id, showTextInput.isFolder, target.value);
      setShowTextInput({ ...showTextInput, visible: false });
      setInputValue("");
    }
  }

  function onRename({ keyCode, target }) {
    if (keyCode === 13 && target.value) {
      const isValidName = validateFileName(target.value);
      if (!isValidName && !showTextInput.isFolder) return;
      handleRename(folderData.id, showTextInput.isFolder, target.value);
      setShowTextInput({ ...showTextInput, visible: false });
      setRenameInputValue("");
      setIsRenaming(false);
    }
  }

  function onChangeColor() {
    handleColorChange(folderData.id, showColorInput.isFolder, colorInputValue);
    clearValues();
  }

  function clearValues() {
    setColorInputValue("");
    setShowColorInput({ ...showColorInput, visible: false });
  }

  function handleBlur() {
    setShowTextInput({
      visible: false,
      isFolder: folderData.isFolder,
    });
  }

  function handleChange(event) {
    isRenaming
      ? setRenameInputValue(event.target.value)
      : setInputValue(event.target.value);
  }

  return (
    <div>
      {folderData.isFolder ? (
        <FolderItem
          isExpand={isExpand}
          setIsExpand={setIsExpand}
          handleDelete={handleDelete}
          handleInitiateColorChange={handleInitiateColorChange}
          handleInitiateInsert={handleInitiateInsert}
          handleInitiateRename={handleInitiateRename}
          folderData={folderData}
        />
      ) : (
        <FileItem
          folderData={folderData}
          handleDelete={handleDelete}
          handleInitiateColorChange={handleInitiateColorChange}
          handleInitiateRename={handleInitiateRename}
        />
      )}
      <div
        style={{
          display: isExpand ? "block" : "none",
          paddingLeft: "1.2rem",
        }}
      >
        {showColorInput.visible && (
          <div>
            <ColorInput
              colorInputValue={colorInputValue}
              setColorInputValue={setColorInputValue}
            />
            <Button
              icon={FaSave}
              label="APPLY"
              onClickHandler={onChangeColor}
            />
            <Button
              icon={GiCancel}
              label="CANCEL"
              onClickHandler={clearValues}
            />
          </div>
        )}
        {showTextInput.visible && (
          <TextInput
            handleBlur={handleBlur}
            onRename={onRename}
            onAdd={onAdd}
            handleChange={handleChange}
            isRenaming={isRenaming}
            inputValue={inputValue}
            renameInputValue={renameInputValue}
          />
        )}
        {folderData.children.map((folder) => (
          <Folder
            folderData={folder}
            key={folder.id}
            handleInsert={handleInsert}
            handleRename={handleRename}
            handleDelete={handleDelete}
            handleColorChange={handleColorChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Folder;
