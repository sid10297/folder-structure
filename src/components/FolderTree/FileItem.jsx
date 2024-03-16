import { FaFileAlt, FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import Button from "../Button";
import usePopup from "../../hooks/usePopup";

const FileItem = ({
  folderData,
  handleDelete,
  handleInitiateColorChange,
  handleInitiateAction,
}) => {
  const { showPopup, popupRef, handleContextMenu, setShowPopup } = usePopup();

  const handleButtonClick = (event, action) => {
    event.stopPropagation();
    setShowPopup(false);
    action();
  };

  return (
    <div className="item-container" onContextMenu={handleContextMenu}>
      <div className="title-container">
        <div className="title-detail">
          <FaFileAlt size={20} color={folderData.color} />
          <span className="title">{folderData.name}</span>
        </div>
      </div>
      {showPopup && (
        <div className="popup-container" ref={popupRef}>
          <Button
            label="RENAME"
            icon={FaEdit}
            onClickHandler={(event) =>
              handleButtonClick(event, () =>
                handleInitiateAction(event, folderData.name, false, true)
              )
            }
          />
          <Button
            icon={FaTrash}
            label="DELETE"
            onClickHandler={(event) =>
              handleButtonClick(event, () => handleDelete(folderData.id))
            }
          />
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

export default FileItem;
