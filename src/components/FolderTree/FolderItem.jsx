import { FaFolder } from "react-icons/fa";
import { RiFileAddLine } from "react-icons/ri";
import { CgFolderAdd } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";

import Button from "../Button";

const ROOT_ID = "1";

const FolderItem = ({
  folderData,
  handleInitiateInsert,
  handleInitiateRename,
  handleDelete,
  handleInitiateColorChange,
  setIsExpand,
  isExpand,
}) => {
  return (
    <div style={{ cursor: "pointer" }} onClick={() => setIsExpand(!isExpand)}>
      <div>
        <FaFolder color={folderData.color} /> {folderData.name}
      </div>

      <div>
        <Button
          icon={CgFolderAdd}
          label="ADD FOLDER"
          onClickHandler={(event) => handleInitiateInsert(event, true)}
        />
        <Button
          icon={RiFileAddLine}
          label="ADD FILE"
          onClickHandler={(event) => handleInitiateInsert(event, false)}
        />

        <Button
          icon={FaEdit}
          label="RENAME"
          onClickHandler={(event) =>
            handleInitiateRename(event, folderData, true)
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
          onClickHandler={(event) =>
            handleInitiateColorChange(event, folderData, true)
          }
        />
      </div>
    </div>
  );
};

export default FolderItem;
