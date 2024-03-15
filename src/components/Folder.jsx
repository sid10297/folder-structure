import { useState } from "react";
import { FaFolder, FaFileAlt } from "react-icons/fa";

function validateFileName(fileName) {
  var allowedCharacters = /^[a-zA-Z0-9_.-]*$/;
  var maxLength = 100;
  if (fileName.trim() === "") {
    return false;
  }
  if (fileName.length > maxLength) {
    return false;
  }
  if (!allowedCharacters.test(fileName)) {
    return false;
  }
  if (fileName.indexOf(".") === -1) {
    return false;
  }
  return true;
}

const INITIAL_STATE = {
  visible: false,
  isFolder: false,
};

const Folder = ({
  folderData,
  handleInsertDataToTree = () => {},
  handleRename,
  handleDelete,
  handleColorChange,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [colorInputValue, setColorInputValue] = useState(
    folderData.color ? folderData : "#000000"
  );
  const [showTextInput, setShowTextInput] = useState(INITIAL_STATE);
  const [showColorInput, setShowColorInput] = useState(INITIAL_STATE);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInputValue, setRenameInputValue] = useState("");

  function handleInitiateAction(event, folderData, isFolder) {
    event.stopPropagation();
    setIsExpand(true);
    setShowTextInput({
      visible: true,
      isFolder,
    });
    console.log({ folderData, isFolder });
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
      handleInsertDataToTree(
        folderData.id,
        showTextInput.isFolder,
        target.value
      );
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
    setColorInputValue("");
    setShowColorInput({ ...showColorInput, visible: false });
  }

  function onCancel() {
    setColorInputValue("");
    setShowColorInput({ ...showColorInput, visible: false });
  }

  if (folderData.isFolder) {
    return (
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setIsExpand(!isExpand)}
        >
          <div>
            <FaFolder color={folderData.color} /> {folderData.name}
          </div>

          <div>
            <button
              onClick={(event) => handleInitiateAction(event, folderData, true)}
            >
              ADD FOLDER
            </button>
            <button
              onClick={(event) =>
                handleInitiateAction(event, folderData, false)
              }
            >
              ADD FILE
            </button>
            <button
              onClick={(event) => handleInitiateRename(event, folderData, true)}
            >
              RENAME
            </button>
            {folderData.id !== "1" && (
              <button onClick={() => handleDelete(folderData.id)}>
                DELETE
              </button>
            )}
            <button
              onClick={(event) =>
                handleInitiateColorChange(event, folderData, true)
              }
            >
              CHANGE COLOR
            </button>
          </div>
        </div>
        <div
          style={{
            display: isExpand ? "block" : "none",
            paddingLeft: "0.6rem",
          }}
        >
          {showColorInput.visible && (
            <div>
              <input
                type="color"
                value={colorInputValue}
                onChange={(event) => setColorInputValue(event.target.value)}
              />
              <button onClick={onChangeColor}>APPLY</button>
              <button onClick={onCancel}>CANCEL</button>
            </div>
          )}
          {showTextInput.visible && (
            <input
              type="text"
              autoFocus
              value={isRenaming ? renameInputValue : inputValue}
              onBlur={() =>
                setShowTextInput({
                  visible: false,
                  isFolder: folderData.isFolder,
                })
              }
              onKeyDown={isRenaming ? onRename : onAdd}
              onChange={
                isRenaming
                  ? (event) => setRenameInputValue(event.target.value)
                  : (event) => setInputValue(event.target.value)
              }
            />
          )}
          {folderData.children.map((folder) => (
            <Folder
              folderData={folder}
              key={folder.id}
              handleInsertDataToTree={handleInsertDataToTree}
              handleRename={handleRename}
              handleDelete={handleDelete}
              handleColorChange={handleColorChange}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <FaFileAlt color={folderData.color} /> {folderData.name}
        </div>
        <div>
          <button
            onClick={(event) => handleInitiateRename(event, folderData, false)}
          >
            RENAME
          </button>
          <button onClick={() => handleDelete(folderData.id)}>DELETE</button>
          <button
            onClick={(event) =>
              handleInitiateColorChange(event, folderData, true)
            }
          >
            CHANGE COLOR
          </button>
        </div>
        {showColorInput.visible && (
          <div>
            <input
              type="color"
              value={colorInputValue}
              onChange={(event) => setColorInputValue(event.target.value)}
            />
            <button onClick={onChangeColor}>APPLY</button>
          </div>
        )}
        {showTextInput.visible && (
          <input
            type="text"
            autoFocus
            value={isRenaming ? renameInputValue : inputValue}
            onBlur={() => {
              setShowTextInput({
                visible: false,
                isFolder: folderData.isFolder,
              });
            }}
            onKeyDown={isRenaming ? onRename : onAdd}
            onChange={
              isRenaming
                ? (event) => setRenameInputValue(event.target.value)
                : (event) => setInputValue(event.target.value)
            }
          />
        )}
      </div>
    );
  }
};

export default Folder;
