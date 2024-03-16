import { useContext } from "react";
import { FolderContext } from "../contexts/FolderContext";

export const useFolderContext = () => {
  return useContext(FolderContext);
};
