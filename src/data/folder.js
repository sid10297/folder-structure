const FOLDER_DATA = {
  id: "1",
  name: "root",
  isFolder: true,
  color: "#000000",
  children: [
    {
      id: "2",
      name: "src",
      isFolder: true,
      color: "#000000",
      children: [
        {
          id: "5",
          name: "components",
          isFolder: true,
          color: "#000000",
          children: [
            {
              id: "7",
              name: "Folder.jsx",
              isFolder: false,
              color: "#000000",
            },
            {
              id: "8",
              name: "FolderData.jsx",
              isFolder: false,
              color: "#000000",
            },
          ],
        },
        {
          id: "6",
          name: "data",
          isFolder: true,
          color: "#000000",
          children: [
            {
              id: "9",
              name: "folder.js",
              isFolder: false,
              color: "#000000",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "public",
      isFolder: true,
      color: "#000000",
      children: [
        {
          id: "4",
          name: "vite.svg",
          isFolder: false,
          color: "#000000",
        },
      ],
    },
    {
      id: "10",
      name: "package.json",
      isFolder: false,
      color: "#000000",
    },
  ],
};

export default FOLDER_DATA;
