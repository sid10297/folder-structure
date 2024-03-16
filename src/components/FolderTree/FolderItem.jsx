import { FaFolder } from "react-icons/fa";
import { RiFileAddLine } from "react-icons/ri";
import { CgFolderAdd } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import Button from "../Button";
import usePopup from "../../hooks/usePopup";

const ROOT_ID = "1";

const FolderItem = ({
  folderData,
  handleDelete,
  handleInitiateColorChange,
  setIsExpanded,
  isExpanded,
  handleInitiateAction,
}) => {
  //* created this hook to get access to Popup for menu items when needed
  const { showPopup, popupRef, handleContextMenu, setShowPopup } = usePopup();

  //* prevent default event and then call the action
  const handleButtonClick = (event, action) => {
    event.stopPropagation();
    setShowPopup(false);
    action();
  };

  return (
    <div
      className="item-container"
      onClick={() => setIsExpanded(!isExpanded)}
      onContextMenu={handleContextMenu}
    >
      <div className="title-container">
        <div className="title-detail">
          <FaFolder size={20} color={folderData.color} />
          <span className="title">{folderData.name}</span>
        </div>
      </div>

      {showPopup && (
        <div className="popup-container" ref={popupRef}>
          <Button
            icon={CgFolderAdd}
            label="ADD FOLDER"
            onClickHandler={(event) =>
              handleButtonClick(event, () =>
                handleInitiateAction(event, folderData.name, true)
              )
            }
          />
          <Button
            icon={RiFileAddLine}
            label="ADD FILE"
            onClickHandler={(event) =>
              handleButtonClick(event, () =>
                handleInitiateAction(event, folderData.name, false)
              )
            }
          />
          <Button
            icon={FaEdit}
            label="RENAME"
            onClickHandler={(event) =>
              handleButtonClick(event, () =>
                handleInitiateAction(event, folderData.name, true, true)
              )
            }
          />
          {folderData.id !== ROOT_ID && (
            <Button
              icon={FaTrash}
              label="DELETE"
              onClickHandler={(event) =>
                handleButtonClick(event, () => handleDelete(folderData.id))
              }
            />
          )}
          <Button
            icon={MdOutlineColorLens}
            label="CHANGE COLOR"
            onClickHandler={(event) =>
              handleButtonClick(event, () =>
                handleInitiateColorChange(event, true)
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default FolderItem;
