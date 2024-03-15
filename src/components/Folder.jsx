import { useState } from "react";

const INITIAL_STATE = {
  visible: false,
  isFolder: false,
};

const Folder = ({
  folderData,
  handleInsertDataToTree = () => {},
  handleRename,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTextInput, setShowTextInput] = useState(INITIAL_STATE);
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

  function onAdd({ keyCode, target }) {
    if (keyCode === 13 && target.value) {
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
      handleRename(folderData.id, showTextInput.isFolder, target.value);
      setShowTextInput({ ...showTextInput, visible: false });
      setInputValue("");
    }
  }

  if (folderData.isFolder) {
    return (
      <div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setIsExpand(!isExpand)}
        >
          <p>
            {folderData.name}, {folderData.color}
          </p>
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
              Rename
            </button>
          </div>
        </div>
        <div
          style={{
            display: isExpand ? "block" : "none",
            paddingLeft: "0.6rem",
          }}
        >
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
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {folderData.name}, {folderData.color}
        </p>
        <div>
          <button
            onClick={(event) => handleInitiateRename(event, folderData, false)}
          >
            Rename
          </button>
        </div>
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
