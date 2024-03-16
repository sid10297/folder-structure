import { FaFolder } from "react-icons/fa";
import { RiFileAddLine } from "react-icons/ri";
import { CgFolderAdd } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import Button from "../Button";

const ROOT_ID = "1";

const FolderItem = ({
  folderData,
  handleDelete,
  handleInitiateColorChange,
  setIsExpand,
  isExpand,
  handleInitiateAction,
}) => {
  return (
    <div className="item-container" onClick={() => setIsExpand(!isExpand)}>
      <div className="title-container">
        <FaFolder size={20} color={folderData.color} />
        <span className="title">{folderData.name}</span>
      </div>

      <div className="button-container">
        <Button
          icon={CgFolderAdd}
          label="ADD FOLDER"
          onClickHandler={(event) =>
            handleInitiateAction(event, folderData.name, true)
          }
        />
        <Button
          icon={RiFileAddLine}
          label="ADD FILE"
          onClickHandler={(event) =>
            handleInitiateAction(event, folderData.name, false)
          }
        />

        <Button
          icon={FaEdit}
          label="RENAME"
          onClickHandler={(event) =>
            handleInitiateAction(event, folderData.name, true, true)
          }
        />

        {folderData.id !== ROOT_ID && (
          <Button
            icon={FaTrash}
            label="DELETE"
            onClickHandler={() => handleDelete(folderData.id)}
          />
        )}
        <Button
          icon={MdOutlineColorLens}
          label="CHANGE COLOR"
          onClickHandler={(event) => handleInitiateColorChange(event, true)}
        />
      </div>
    </div>
  );
};

export default FolderItem;
