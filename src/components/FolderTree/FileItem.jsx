import { FaFileAlt, FaEdit, FaTrash } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineColorLens } from "react-icons/md";
import Button from "../Button";

const FileItem = ({
  folderData,
  handleDelete,
  handleInitiateColorChange,
  handleInitiateAction,
}) => {
  return (
    <div className="item-container">
      <div className="title-container">
        <div className="title-detail">
          <FaFileAlt size={20} color={folderData.color} />
          <span className="title">{folderData.name}</span>
        </div>
        <div className="title-menu">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="button-container">
        <Button
          label="RENAME"
          icon={FaEdit}
          onClickHandler={(event) =>
            handleInitiateAction(event, folderData.name, false, true)
          }
        />
        <Button
          icon={FaTrash}
          label="DELETE"
          onClickHandler={() => handleDelete(folderData.id)}
        />
        <Button
          icon={MdOutlineColorLens}
          label="CHANGE COLOR"
          onClickHandler={(event) => handleInitiateColorChange(event, true)}
        />
      </div>
    </div>
  );
};

export default FileItem;
