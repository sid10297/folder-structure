import { useCallback, useState } from "react";
import { GiCancel } from "react-icons/gi";
import { validateFileName } from "../../helpers";
import { FaSave } from "react-icons/fa";
import Button from "../Button";
import FolderItem from "./FolderItem";
import ColorInput from "../ColorInput";
import TextInput from "../TextInput";
import FileItem from "./FileItem";
import { useFolderContext } from "../../hooks/useFolderContext";

const INITIAL_STATE = {
  visible: false,
  isFolder: false,
};

const INVALID_INPUT = "Invalid Input! Eg: file-name.js";

const FolderTree = ({ folderData }) => {
  const {
    folderData: rootFolderData,
    handleInsert,
    handleRename,
    handleDelete,
    handleColorChange,
  } = useFolderContext();

  const currentFolderData = folderData || rootFolderData;

  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTextInput, setShowTextInput] = useState(INITIAL_STATE);
  const [showColorInput, setShowColorInput] = useState(INITIAL_STATE);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInputValue, setRenameInputValue] = useState("");
  const [colorInputValue, setColorInputValue] = useState(
    currentFolderData.color || "#000000"
  );

  function handleInitiateAction(
    event,
    folderName,
    isFolder,
    isRenaming = false
  ) {
    event.stopPropagation();
    setIsExpanded(true);
    setIsRenaming(isRenaming);
    setRenameInputValue(isRenaming ? folderName : "");
    setShowTextInput({
      visible: true,
      isFolder,
    });
  }

  function handleInitiateColorChange(event, isFolder) {
    event.stopPropagation();
    isFolder && setIsExpanded(true);
    setShowColorInput({
      visible: true,
      isFolder,
    });
  }

  const onAdd = useCallback(
    ({ keyCode, target }) => {
      if (keyCode === 13 && target.value) {
        const isValidName = validateFileName(target.value);
        if (!isValidName && !showTextInput.isFolder)
          return alert(INVALID_INPUT);
        handleInsert(
          currentFolderData.id,
          showTextInput.isFolder,
          target.value
        );
        setShowTextInput({ ...showTextInput, visible: false });
        setInputValue("");
      }
    },
    [currentFolderData.id, handleInsert, showTextInput]
  );

  const onRename = useCallback(
    ({ keyCode, target }) => {
      if (keyCode === 13 && target.value) {
        const isValidName = validateFileName(target.value);
        if (!isValidName && !showTextInput.isFolder)
          return alert(INVALID_INPUT);
        handleRename(
          currentFolderData.id,
          showTextInput.isFolder,
          target.value
        );
        setShowTextInput({ ...showTextInput, visible: false });
        setRenameInputValue("");
        setIsRenaming(false);
      }
    },
    [currentFolderData.id, handleRename, showTextInput]
  );

  const clearValues = () => {
    setColorInputValue("");
    setShowColorInput({ ...showColorInput, visible: false });
  };

  function onChangeColor() {
    handleColorChange(
      currentFolderData.id,
      showColorInput.isFolder,
      colorInputValue
    );
    clearValues();
  }

  const handleBlur = useCallback(() => {
    setShowTextInput({
      visible: false,
      isFolder: currentFolderData.isFolder,
    });
    setRenameInputValue("");
    setInputValue("");
    setIsRenaming(false);
  }, [currentFolderData.isFolder]);

  const handleChange = useCallback(
    (event) => {
      isRenaming
        ? setRenameInputValue(event.target.value)
        : setInputValue(event.target.value);
    },
    [isRenaming]
  );

  return (
    <div>
      {currentFolderData.isFolder ? (
        <FolderItem
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          handleDelete={handleDelete}
          handleInitiateColorChange={handleInitiateColorChange}
          handleInitiateAction={handleInitiateAction}
          folderData={currentFolderData}
        />
      ) : (
        <FileItem
          folderData={currentFolderData}
          handleDelete={handleDelete}
          handleInitiateColorChange={handleInitiateColorChange}
          handleInitiateAction={handleInitiateAction}
        />
      )}
      <div
        style={{
          display: isExpanded ? "block" : "none",
          paddingLeft: "1.5rem",
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
        {currentFolderData.children.map((folder) => (
          <FolderTree folderData={folder} key={folder.id} />
        ))}
      </div>
    </div>
  );
};

export default FolderTree;
