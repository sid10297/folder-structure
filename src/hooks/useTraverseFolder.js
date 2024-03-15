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
    latestNode = tree.children.map((child) => {
      return insertNode(child, folderId, name, isFolder);
    });

    return { ...tree, children: latestNode };
  };

  const deleteNode = (tree, nodeId) => {
    if (!tree) {
      return null;
    }

    if (tree.id === nodeId) {
      return null;
    }

    const updatedChildren = tree.children
      .map((child) => deleteNode(child, nodeId))
      .filter((child) => child !== null);

    return { ...tree, children: updatedChildren };
  };

  const renameNode = (tree, nodeId, updatedName) => {
    if (tree.id === nodeId) {
      return { ...tree, name: updatedName };
    }

    const updatedChildren = tree.children.map((child) =>
      renameNode(child, nodeId, updatedName)
    );

    return { ...tree, children: updatedChildren };
  };

  const changeColor = (tree, nodeId, updatedColor) => {
    if (tree.id === nodeId) {
      return { ...tree, color: updatedColor };
    }

    const updatedChildren = tree.children.map((child) =>
      changeColor(child, nodeId, updatedColor)
    );

    return { ...tree, children: updatedChildren };
  };

  return { insertNode, deleteNode, renameNode, changeColor };
};

export default useTraverseFolder;
