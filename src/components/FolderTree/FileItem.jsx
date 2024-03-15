import { FaFileAlt, FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import Button from "../Button";

const FileItem = ({
  folderData,
  handleInitiateRename,
  handleDelete,
  handleInitiateColorChange,
}) => {
  return (
    <div className="item-container">
      <div className="title-container">
        <FaFileAlt size={20} color={folderData.color} />
        <span className="title">{folderData.name}</span>
      </div>
      <div className="button-container">
        <Button
          label="RENAME"
          icon={FaEdit}
          onClickHandler={(event) =>
            handleInitiateRename(event, folderData, false)
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
