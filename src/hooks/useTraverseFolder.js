const useTraverseFolder = () => {
  const insertNode = function (tree, folderId, name, isFolder) {
    if (tree.id === folderId && (tree.isFolder || !isFolder)) {
      tree.children.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        children: [],
        color: "#000000",
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.children.map((ob) => {
      return insertNode(ob, folderId, name, isFolder);
    });

    return { ...tree, children: latestNode };
  };

  const deleteNode = () => {};

  const renameNode = () => {};

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseFolder;
