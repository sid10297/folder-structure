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
    <>
      <div>
        <FaFileAlt color={folderData.color} /> {folderData.name}
      </div>
      <div>
        <Button
          label="RENAME"
          icon={FaEdit}
          onClickHandler={(event) =>
            handleInitiateRename(event, folderData, true)
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
          onClickHandler={(event) =>
            handleInitiateColorChange(event, folderData, true)
          }
        />
      </div>
    </>
  );
};

export default FileItem;
