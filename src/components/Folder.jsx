import { useState } from "react";
import { FaFolder, FaFileAlt } from "react-icons/fa";
import { validateFileName } from "../helpers";
import Button from "./Button";

const INITIAL_STATE = {
  visible: false,
  isFolder: false,
};

function getInitialColor(folderData) {
  return folderData.color ? folderData : "#000000";
}

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

  function clearValues() {
    setColorInputValue("");
    setShowColorInput({ ...showColorInput, visible: false });
  }

  function onChangeColor() {
    handleColorChange(folderData.id, showColorInput.isFolder, colorInputValue);
    clearValues();
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
            <Button
              label="AddFolder"
              onClickHandler={(event) => handleInitiateInsert(event, true)}
            />
            <Button
              label="AddFile"
              onClickHandler={(event) => handleInitiateInsert(event, false)}
            />

            <Button
              label="RENAME"
              onClickHandler={(event) =>
                handleInitiateRename(event, folderData, true)
              }
            />

            {folderData.id !== "1" && (
              <Button
                label="DELETE"
                onClickHandler={() => handleDelete(folderData.id)}
              />
            )}
            <Button
              label="CHANGE COLOR"
              onClickHandler={(event) =>
                handleInitiateColorChange(event, folderData, true)
              }
            />
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
              <Button label="APPLY" onClickHandler={onChangeColor} />
              <Button label="CANCEL" onClickHandler={clearValues} />
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
              handleInsert={handleInsert}
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
          <Button
            label="RENAME"
            onClickHandler={(event) =>
              handleInitiateRename(event, folderData, true)
            }
          />
          <Button
            label="DELETE"
            onClickHandler={() => handleDelete(folderData.id)}
          />
          <Button
            label="CHANGE COLOR"
            onClickHandler={(event) =>
              handleInitiateColorChange(event, folderData, true)
            }
          />
        </div>
        {showColorInput.visible && (
          <div>
            <input
              type="color"
              value={colorInputValue}
              onChange={(event) => setColorInputValue(event.target.value)}
            />
            <Button label="APPLY" onClickHandler={onChangeColor} />
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
