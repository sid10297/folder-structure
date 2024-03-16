import { FaFolder } from "react-icons/fa";

const Explorer = ({ folderData }) => {
  console.log({ folderData });
  return (
    <div className="explorer">
      <h2>Explorer</h2>
      <div className="folder-grid">
        <div className="folder-icon">
          <FaFolder size={40} />
          <p>name</p>
        </div>
        <div className="folder-icon">
          <FaFolder size={40} />
          <p>name</p>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
